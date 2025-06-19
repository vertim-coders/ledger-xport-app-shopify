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
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { ExportFormat } from "@prisma/client";
import { useState, useEffect } from "react";
import fiscalRegimesData from "../data/fiscal-regimes.json";
import currenciesData from "../data/currencies.json";
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";
import shopify from "../shopify.server";
import type { Settings } from "../types/SettingsType";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
  });
  let fiscalConfig = null;
  let generalSettings = null;
  if (shop) {
    fiscalConfig = await prisma.fiscalConfiguration.findUnique({ where: { shopId: shop.id } });
    generalSettings = await prisma.generalSettings.findUnique({ where: { shopId: shop.id } });
  }

  // Fetch shop details from Shopify Admin API
  const response = await fetch(`https://${session.shop}/admin/api/2024-01/shop.json`, {
    headers: {
      'X-Shopify-Access-Token': session.accessToken || '',
    },
  });
  const shopDetails = await response.json();

  return json({
    settings: fiscalConfig || null,
    generalSettings: generalSettings || null,
    regimes: fiscalRegimesData.regimes,
    shopDetails: shopDetails.shop,
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
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

  // Fetch shop details from Shopify Admin API
  const response = await fetch(`https://${session.shop}/admin/api/2024-01/shop.json`, {
    headers: {
      'X-Shopify-Access-Token': session.accessToken || '',
    },
  });
  const shopDetails = await response.json();

  // Handle fiscal configuration
  const fiscalSettings = {
    companyName: formData.get("companyName") as string,
    country: formData.get("country") as string,
    currency: formData.get("currency") as string,
    vatRate: parseFloat(formData.get("vatRate") as string),
    defaultFormat: formData.get("defaultExportFormat") as ExportFormat,
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
      ...fiscalSettings,
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
      ...fiscalSettings,
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

  // Handle general settings
  const generalSettings = {
    salesAccount: formData.get("salesAccount") as string,
  };

  // Update general settings
  await prisma.generalSettings.upsert({
    where: { shopId: shop.id },
    create: {
      shopId: shop.id,
      ...generalSettings,
      timezone: shopDetails.shop.timezone || "UTC",
      language: shopDetails.shop.locale || "fr",
    },
    update: {
      ...generalSettings,
      timezone: shopDetails.shop.timezone || "UTC",
      language: shopDetails.shop.locale || "fr",
    },
  });

  return json({ success: true });
};

export default function GeneralSettings() {
  const { settings, generalSettings, regimes, shopDetails } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: settings?.companyName || "",
    country: settings?.country || "",
    currency: settings?.currency || "EUR",
    vatRate: settings?.vatRate?.toString() || "",
    defaultExportFormat: settings?.defaultFormat || "CSV",
    salesAccount: generalSettings?.salesAccount || "701",
  });
  const [selectedRegime, setSelectedRegime] = useState(settings?.code || "OHADA");
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("fiscalRegime", selectedRegime);
    submit(data, { method: "post" });
    setToastMessage("Paramètres enregistrés avec succès");
    setToastActive(true);
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      onDismiss={() => setToastActive(false)}
    />
  ) : null;

  const selectedRegimeDetails = regimes.find(r => r.code === selectedRegime);

  // Update the useEffect to set initial currency based on selected regime
  useEffect(() => {
    if (selectedRegime) {
      const regime = regimes.find(r => r.code === selectedRegime);
      if (regime) {
        setFormData(prev => ({
          ...prev,
          currency: regime.currency
        }));
      }
    }
  }, [selectedRegime]);

  return (
    <Frame>
      <Page
        title="Paramètres généraux"
        subtitle="Configurez les paramètres généraux de votre application"
      >
        <Layout>
          <Layout.Section>
            <Card>
              <form onSubmit={handleSubmit}>
                <LegacyStack vertical spacing="loose">
                  <FormLayout>
                    <TextField
                      label="Nom de l'entreprise"
                      name="companyName"
                      value={formData.companyName}
                      onChange={value => handleChange("companyName", value)}
                      autoComplete="off"
                    />

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
                      <Select
                        label="Devise"
                        name="currency"
                        options={currenciesData.currencies.map(currency => ({
                          label: `${currency.name} (${currency.code})`,
                          value: currency.code
                        }))}
                        value={formData.currency}
                        onChange={value => handleChange("currency", value)}
                        disabled={!selectedRegime}
                        helpText={selectedRegime ? `Devise recommandée pour ${regimes.find(r => r.code === selectedRegime)?.name}: ${regimes.find(r => r.code === selectedRegime)?.currency}` : ''}
                      />
                      <TextField
                        label="Taux de TVA (%)"
                        name="vatRate"
                        type="number"
                        value={formData.vatRate}
                        onChange={value => handleChange("vatRate", value)}
                        autoComplete="off"
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    </LegacyStack>

                    <LegacyStack vertical spacing="loose">
                      <div>
                        <Text variant="headingMd" as="h2">Compte de vente</Text>
                        <LegacyStack vertical spacing="tight">
                          <TextField
                            label="Compte de vente"
                            value={formData.salesAccount}
                            onChange={(value) => handleChange("salesAccount", value)}
                            autoComplete="off"
                            helpText="Le compte de vente par défaut pour les exportations"
                          />
                        </LegacyStack>
                      </div>

                      <div>
                        <Text variant="headingMd" as="h2">Fuseau horaire</Text>
                        <LegacyStack vertical spacing="tight">
                          <Text variant="bodyMd" as="p">
                            Fuseau horaire du magasin: {shopDetails?.timezone || 'UTC'}
                          </Text>
                          <Banner
                            title="Configuration du fuseau horaire"
                            tone="info"
                          >
                            <p>Nous ne proposons pas d'option pour modifier le fuseau horaire. Pour modifier le fuseau horaire, veuillez le faire directement dans les paramètres de votre boutique Shopify.</p>
                          </Banner>
                        </LegacyStack>
                      </div>

                      <div>
                        <Text variant="headingMd" as="h2">Langue</Text>
                        <LegacyStack vertical spacing="tight">
                          <Text variant="bodyMd" as="p">
                            Langue du magasin: {shopDetails?.locale || 'fr'}
                          </Text>
                          <Banner
                            title="Configuration de la langue"
                            tone="info"
                          >
                            <p>Nous ne proposons pas d'option pour modifier la langue. Pour modifier la langue, veuillez le faire directement dans les paramètres de votre boutique Shopify.</p>
                          </Banner>
                        </LegacyStack>
                      </div>
                    </LegacyStack>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                      <BiSaveBtn title="Enregistrer les paramètres" />
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