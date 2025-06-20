import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  Text,
  Toast,
  Frame,
  Banner,
  List,
  LegacyStack,
  Tabs,
  Collapsible,
  ButtonGroup,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { ExportFormat } from "@prisma/client";
import { useState, useEffect } from "react";
import fiscalRegimesData from "../data/fiscal-regimes.json";
import currenciesData from "../data/currencies.json";
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
  });
  let fiscalConfig = null;
  if (shop) {
    fiscalConfig = await prisma.fiscalConfiguration.findUnique({ where: { shopId: shop.id } });
    if (fiscalConfig) {
      // Helper function to safely parse arrays
      const safeParseArray = (value: any): string[] => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch {
            return value.split(',').map(item => item.trim());
          }
        }
        return [];
      };

      // Parse JSON strings back into arrays
      fiscalConfig.requiredColumns = safeParseArray(fiscalConfig.requiredColumns);
      fiscalConfig.taxRates = JSON.parse(fiscalConfig.taxRates as string);
      fiscalConfig.exportFormats = safeParseArray(fiscalConfig.exportFormats);
    }
  }
  return json({
    settings: fiscalConfig || null,
    regimes: fiscalRegimesData.regimes,
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType") as string;
  
  // First find the shop
  let shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
  });
  
  if (!shop) {
    // First create or find a default user
    let user = await prisma.user.findFirst({
      where: { email: 'default@example.com' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'default@example.com',
          firstName: 'Default',
          lastName: 'User',
          role: 'USER'
        }
      });
    }

    // Now create the shop with the user
    shop = await prisma.shop.create({
      data: {
        id: session.shop,
        shopifyDomain: session.shop,
        name: session.shop,
        domain: session.shop,
        accessToken: session.accessToken || '',
        userId: user.id
      }
    });
  }

  if (actionType === "company") {
    const settings = {
      companyName: formData.get("companyName") as string,
      country: formData.get("country") as string,
      currency: formData.get("currency") as string,
      vatRate: parseFloat(formData.get("vatRate") as string),
      defaultFormat: formData.get("defaultExportFormat") as ExportFormat,
      salesAccount: formData.get("salesAccount") as string,
    };
    const regimeCode = formData.get("fiscalRegime") as string;
    const selectedRegime =
      regimeCode && regimeCode !== ""
        ? fiscalRegimesData.regimes.find((r) => r.code === regimeCode)
        : null;
    // Fallback to previous settings if no regime selected
    const regime = selectedRegime || (await prisma.fiscalConfiguration.findUnique({ where: { shopId: shop.id } }));
    if (!regime) throw new Error("A regime must be selected at least once.");
    
    // Update fiscal configuration
    await prisma.fiscalConfiguration.upsert({
      where: { shopId: shop.id },
      create: {
        shopId: shop.id,
        ...settings,
        code: regime.code,
        name: regime.name,
        description: regime.description,
        countries: regime.countries,
        fileFormat: regime.fileFormat,
        encoding: regime.encoding,
        separator: regime.separator,
        requiredColumns: regime.requiredColumns,
        taxRates: JSON.stringify(regime.taxRates),
        compatibleSoftware: regime.compatibleSoftware,
        exportFormats: regime.exportFormats,
        notes: regime.notes,
      },
      update: {
        ...settings,
        code: regime.code,
        name: regime.name,
        description: regime.description,
        countries: regime.countries,
        fileFormat: regime.fileFormat,
        encoding: regime.encoding,
        separator: regime.separator,
        requiredColumns: regime.requiredColumns,
        taxRates: JSON.stringify(regime.taxRates),
        compatibleSoftware: regime.compatibleSoftware,
        exportFormats: regime.exportFormats,
        notes: regime.notes,
      },
    });
  } else if (actionType === "fiscal") {
    const regimeCode = formData.get("fiscalRegime") as string;
    const selectedRegime = fiscalRegimesData.regimes.find(r => r.code === regimeCode);
    
    if (!selectedRegime) {
      throw new Error("Invalid fiscal regime selected");
    }

    // Get current fiscal configuration to preserve user settings
    const currentConfig = await prisma.fiscalConfiguration.findUnique({
      where: { shopId: shop.id }
    });

    // Update the fiscal configuration with the selected regime while preserving user settings
    await prisma.fiscalConfiguration.update({
      where: { shopId: shop.id },
      data: {
        code: selectedRegime.code,
        name: selectedRegime.name,
        description: selectedRegime.description,
        countries: selectedRegime.countries,
        fileFormat: selectedRegime.fileFormat,
        encoding: selectedRegime.encoding,
        separator: selectedRegime.separator,
        requiredColumns: selectedRegime.requiredColumns,
        taxRates: JSON.stringify(selectedRegime.taxRates),
        compatibleSoftware: selectedRegime.compatibleSoftware,
        exportFormats: selectedRegime.exportFormats,
        notes: selectedRegime.notes,
        // Preserve user settings
        companyName: currentConfig?.companyName,
        country: currentConfig?.country,
        currency: formData.get("currency") as string || currentConfig?.currency,
        vatRate: currentConfig?.vatRate,
        defaultFormat: currentConfig?.defaultFormat,
      },
    });
  }

  return json({ success: true });
};

export default function CompanyAndFiscalRegimeSettings() {
  const { settings, regimes } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [companyFormData, setCompanyFormData] = useState({
    companyName: settings?.companyName || "",
    country: settings?.country || "",
    currency: settings?.currency || "EUR",
    vatRate: settings?.vatRate?.toString() || "",
    defaultExportFormat: settings?.defaultFormat || "CSV",
    salesAccount: settings?.salesAccount || "701",
  });
  const [selectedRegime, setSelectedRegime] = useState(settings?.code || "OHADA");
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  const handleCompanyChange = (field: string, value: string) => {
    setCompanyFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(companyFormData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("actionType", "company");
    data.append("fiscalRegime", selectedRegime);
    submit(data, { method: "post" });
    setToastMessage("Paramètres de l'entreprise enregistrés avec succès");
    setToastActive(true);
    setTimeout(() => {
      navigate("/app/dashboard");
    }, 1000);
  };

  const handleFiscalSubmit = () => {
    const data = new FormData();
    data.append("fiscalRegime", selectedRegime);
    data.append("actionType", "fiscal");
    data.append("currency", companyFormData.currency);
    submit(data, { method: "post" });
    setToastMessage("Régime fiscal enregistré avec succès");
    setToastActive(true);
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      onDismiss={() => setToastActive(false)}
    />
  ) : null;

  const selectedRegimeDetails = regimes.find(r => r.code === selectedRegime);

  const tabs = [
    {
      id: 'company',
      content: 'Paramètres de l\'entreprise',
      accessibilityLabel: 'Paramètres de l\'entreprise',
      panelID: 'company-settings',
    },
    {
      id: 'fiscal',
      content: 'Régime Fiscal',
      accessibilityLabel: 'Régime Fiscal',
      panelID: 'fiscal-settings',
    },
  ];

  // Add useEffect to update currency when regime changes
  useEffect(() => {
    if (selectedRegime) {
      const regime = regimes.find(r => r.code === selectedRegime);
      if (regime) {
        setCompanyFormData(prev => ({
          ...prev,
          currency: regime.currency
        }));
      }
    }
  }, [selectedRegime]);

  return (
    <Frame>
      <Page
        title="Configuration fiscale"
        subtitle="Configurez les informations de votre entreprise et votre régime fiscal"
      >
        <Layout>
          <Layout.Section>
            <Card>
              <form onSubmit={handleCompanySubmit}>
                <LegacyStack vertical spacing="loose">
                  <FormLayout>
                    <Select
                      label="Régime Fiscal"
                      options={regimes.map(regime => ({
                        label: regime.name,
                        value: regime.code,
                      }))}
                      value={selectedRegime}
                      onChange={setSelectedRegime}
                    />
                    {selectedRegime && (
                      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
                        <Text variant="bodyMd" as="p">
                          {regimes.find(r => r.code === selectedRegime)?.description}
                        </Text>
                        <p style={{ color: '#637381', margin: '4px 0' }}>
                          Pays: {regimes.find(r => r.code === selectedRegime)?.countries.join(', ')}
                        </p>
                        <p style={{ color: '#637381', margin: '4px 0' }}>
                          Format de fichier: {regimes.find(r => r.code === selectedRegime)?.fileFormat}
                        </p>
                        <p style={{ color: '#637381', margin: '4px 0' }}>
                          Logiciels compatibles: {regimes.find(r => r.code === selectedRegime)?.compatibleSoftware.join(', ')}
                        </p>
                      </div>
                    )}

                    <LegacyStack distribution="fill">
                      <TextField
                        label="Nom de l'entreprise"
                        name="companyName"
                        value={companyFormData.companyName}
                        onChange={value => handleCompanyChange("companyName", value)}
                        autoComplete="off"
                      />
                      <TextField
                        label="Taux de TVA (%)"
                        name="vatRate"
                        type="number"
                        value={companyFormData.vatRate}
                        onChange={value => handleCompanyChange("vatRate", value)}
                        autoComplete="off"
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    </LegacyStack>

                    <LegacyStack distribution="fill">
                      <Select
                        label="Devise"
                        name="currency"
                        options={currenciesData.currencies.map(currency => ({
                          label: `${currency.name} (${currency.code})`,
                          value: currency.code
                        }))}
                        value={companyFormData.currency}
                        onChange={value => handleCompanyChange("currency", value)}
                        disabled={!selectedRegime}
                        helpText={selectedRegime ? `Devise recommandée pour ${regimes.find(r => r.code === selectedRegime)?.name}: ${regimes.find(r => r.code === selectedRegime)?.currency}` : ''}
                      />
                      <TextField
                        label="Compte de vente"
                        name="salesAccount"
                        value={companyFormData.salesAccount}
                        onChange={value => handleCompanyChange("salesAccount", value)}
                        autoComplete="off"
                        helpText="Code du compte de vente dans votre plan comptable (ex: 701)"
                      />
                    </LegacyStack>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                      <BiSaveBtn title="Sauvegarder cette configuration fiscale" />
                    </div>
                  </FormLayout>
                </LegacyStack>
              </form>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      {toastMarkup}
    </Frame>
  );
} 