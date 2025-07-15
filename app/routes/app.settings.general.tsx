import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate, useNavigation, useActionData } from "@remix-run/react";
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
  Checkbox,
  BlockStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import type { ExportFormat as ExportFormatType, Protocol as ProtocolType } from "@prisma/client";

// Import sécurisé d'ExportFormat et Protocol
const ExportFormat = {
  CSV: "CSV",
  XLSX: "XLSX",
  JSON: "JSON",
  XML: "XML"
};

const Protocol = {
  FTP: "FTP",
  FTPS: "FTPS",
  SFTP: "SFTP"
};
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import fiscalRegimesData from "../data/fiscal-regimes.json";
import currenciesData from "../data/currencies.json";
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import { BiBtn } from "../components/Buttons/BiBtn";
import shopify from "../shopify.server";
import type { Settings } from "../types/SettingsType";
import ftpService from "../services/ftp.service";
import { encrypt, decrypt } from "../utils/crypto.server";
import { LanguageSelector } from "../components/LanguageSelector";
import { requireFiscalConfigOrRedirect } from "../utils/requireFiscalConfig.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } });
  if (!shop?.id) {
    return requireFiscalConfigOrRedirect("");
  }
  const redirectIfNoConfig = await requireFiscalConfigOrRedirect(shop.id);
  if (redirectIfNoConfig) return redirectIfNoConfig;

  let fiscalConfig = null;
  let generalSettings = null;
  let ftpConfig = null;

  if (shop) {
    [fiscalConfig, generalSettings, ftpConfig] = await Promise.all([
      prisma.fiscalConfiguration.findUnique({ where: { shopId: shop.id } }),
      prisma.generalSettings.findUnique({ where: { shopId: shop.id } }),
      prisma.ftpConfig.findUnique({ where: { shopId: shop.id } }),
    ]);
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
    ftpConfig: ftpConfig ? { ...ftpConfig, password: "" } : null,
    regimes: fiscalRegimesData.regimes,
    shopDetails: shopDetails.shop,
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const actionType = formData.get("action");
  
  // First find the shop
  let shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
  });
  
  if (!shop) {
    shop = await prisma.shop.create({
      data: {
        id: session.shop,
        shopifyDomain: session.shop,
        accessToken: session.accessToken || '',
      }
    });
  }

  if (actionType === "save-ftp") {
    const data = {
      host: formData.get("host") as string,
      port: parseInt(formData.get("port") as string),
      protocol: formData.get("protocol") as ProtocolType,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      directory: formData.get("directory") as string,
      passiveMode: formData.get("passiveMode") === "on",
      retryDelay: formData.get("retryDelay") ? parseInt(formData.get("retryDelay") as string) : null
    };

    const validation = await ftpService.validateConfig(data);
    if (!validation.isValid) {
      return json({ ftpErrors: validation.errors }, { status: 400 });
    }

    const existingConfig = await prisma.ftpConfig.findUnique({ where: { shopId: shop.id } });
    
    await prisma.ftpConfig.upsert({
      where: { shopId: shop.id },
      update: {
        ...data,
        password: data.password ? encrypt(data.password) : (existingConfig?.password || "")
      },
      create: {
        ...data,
        shopId: shop.id,
        password: encrypt(data.password)
      }
    });
    return json({ ftpSuccess: true });

  } else if(actionType === 'test-ftp') {
    const data = {
        host: formData.get("host") as string,
        port: parseInt(formData.get("port") as string),
        protocol: formData.get("protocol") as ProtocolType,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        directory: formData.get("directory") as string,
        passiveMode: formData.get("passiveMode") === "on",
        retryDelay: formData.get("retryDelay") ? parseInt(formData.get("retryDelay") as string) : null
    };

    const configToTest = {
      ...data,
      id: "",
      shopId: shop.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Si l'utilisateur n'a pas tapé de nouveau mot de passe, on utilise l'ancien (déchiffré)
    if(!configToTest.password) {
      const existingConfig = await prisma.ftpConfig.findUnique({ where: { shopId: shop.id } });
      if(existingConfig && existingConfig.password) {
        try {
          configToTest.password = decrypt(existingConfig.password);
        } catch (e) {
            console.error("Decryption failed:", e);
            return json({ ftpTestResult: { success: false, error: 'Failed to decrypt password.' } });
        }
      } else {
        // Pas de mot de passe existant et pas de mot de passe fourni
        return json({ ftpTestResult: { success: false, error: 'Password is required for testing.' } });
      }
    }
    // Si l'utilisateur a tapé un mot de passe, on l'utilise tel quel (en clair) pour le test.
    // La fonction testConnection ne doit pas tenter de le déchiffrer.

    try {
        const isConnected = await ftpService.testConnection(configToTest);
        return json({ ftpTestResult: { success: isConnected } });
    } catch (e: any) {
        return json({ ftpTestResult: { success: false, error: e.message } });
    }
  }

  // Default action: save general/fiscal settings
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
    defaultFormat: formData.get("defaultExportFormat") as ExportFormatType,
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
  const generalSettingsData = {
    salesAccount: formData.get("salesAccount") as string,
  };

  // Update general settings
  await prisma.generalSettings.upsert({
    where: { shopId: shop.id },
    create: {
      shopId: shop.id,
      ...generalSettingsData,
      timezone: shopDetails.shop.timezone || "UTC",
      language: shopDetails.shop.locale || "fr",
    },
    update: {
      ...generalSettingsData,
      timezone: shopDetails.shop.timezone || "UTC",
      language: shopDetails.shop.locale || "fr",
    },
  });

  return json({ success: true });
};

// Type pour les données du loader
type LoaderData = {
  settings: any;
  generalSettings: any;
  ftpConfig: any;
  regimes: any[];
  shopDetails: any;
};

export default function GeneralSettings() {
  const { t } = useTranslation();
  const { settings, generalSettings, ftpConfig, regimes, shopDetails } = useLoaderData<LoaderData>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSaving = navigation.state === "submitting";
  const [formData, setFormData] = useState({
    companyName: settings?.companyName || "",
    country: settings?.country || "",
    currency: settings?.currency || "EUR",
    vatRate: settings?.vatRate?.toString() || "",
    defaultExportFormat: settings?.defaultFormat || "CSV",
    salesAccount: generalSettings?.salesAccount || "701",
  });
  const [ftpFormData, setFtpFormData] = useState({
    host: ftpConfig?.host || "",
    port: ftpConfig?.port || 21,
    protocol: ftpConfig?.protocol || "SFTP",
    username: ftpConfig?.username || "",
    password: "",
    directory: ftpConfig?.directory || "/",
    passiveMode: ftpConfig?.passiveMode || false,
    retryDelay: ftpConfig?.retryDelay || "",
  });
  const [selectedRegime, setSelectedRegime] = useState(settings?.code || "OHADA");
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData && 'ftpTestResult' in actionData && actionData.ftpTestResult) {
      const { success, error } = actionData.ftpTestResult as { success: boolean; error?: string };
      if (success) {
        setTestStatus("success");
        setToastMessage(t('toast.ftpTestSuccess'));
        setToastError(false);
        setToastActive(true);
      } else {
        setTestStatus("error");
        setToastMessage(t('toast.ftpTestError', { error: error || t('ftp.errorBannerText') }));
        setToastError(true);
        setToastActive(true);
      }
    }
     if (actionData && 'ftpSuccess' in actionData && actionData.ftpSuccess) {
        setToastMessage(t('toast.ftpSaveSuccess'));
        setToastError(false);
        setToastActive(true);
    }
  }, [actionData]);

  const handleFtpChange = (field: string, value: string | boolean) => {
    setFtpFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFtpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("action", "save-ftp");
    submit(data, { method: "post" });
  };

  const handleFtpTest = () => {
    setTestStatus("testing");
    const data = new FormData();
    Object.entries(ftpFormData).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    data.append("action", "test-ftp");
    submit(data, { 
        method: "post",
        encType: "application/x-www-form-urlencoded",
        replace: true
     });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("fiscalRegime", selectedRegime);
    try {
      await submit(data, { method: "post" });
      setToastMessage(t('toast.saveSuccess'));
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      setToastMessage(t('toast.saveError'));
      setToastError(true);
      setToastActive(true);
    }
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      onDismiss={() => setToastActive(false)}
      error={toastError}
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
        title={t('settings.general.title')}
        subtitle={t('settings.general.subtitle')}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <div style={{ padding: 10 }}>
                <Text variant="bodyMd" as="span" fontWeight="bold">{t('form.language')}</Text>
                <div style={{ marginTop: 8 }}>
                  <LanguageSelector label="" helpText={t('settings.general.languageHelp', 'La langue de l\'interface sera appliquée immédiatement.')} />
                </div>
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <form onSubmit={handleSubmit}>
                <LegacyStack vertical spacing="loose">
                  <FormLayout>
                    <div>
                      <div style={{ marginBottom: 4, display: 'block' }}>
                        <Text variant="bodyMd" as="span" fontWeight="bold">{t('settings.general.companyName')}</Text>
                      </div>
                      <TextField
                        label=""
                        name="companyName"
                        value={formData.companyName}
                        onChange={value => handleChange("companyName", value)}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <div style={{ marginBottom: 4, display: 'block' }}>
                        <Text variant="bodyMd" as="span" fontWeight="bold">{t('settings.general.fiscalRegime')}</Text>
                      </div>
                      <Select
                        label=""
                        options={regimes.map(regime => ({
                          label: regime.name,
                          value: regime.code,
                        }))}
                        value={selectedRegime}
                        onChange={setSelectedRegime}
                      />
                    </div>
                    {selectedRegime && (
                      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
                        <Text variant="bodyMd" as="p">
                          {regimes.find(r => r.code === selectedRegime)?.description}
                        </Text>
                        <p style={{ color: '#637381', margin: '4px 0' }}>
                          {t('form.country')}: {regimes.find(r => r.code === selectedRegime)?.countries.join(', ')}
                        </p>
                        <p style={{ color: '#637381', margin: '4px 0' }}>
                          {t('settings.general.fileFormat', 'Format de fichier')}: {regimes.find(r => r.code === selectedRegime)?.fileFormat}
                        </p>
                        <p style={{ color: '#637381', margin: '4px 0' }}>
                          {t('settings.general.compatibleSoftware', 'Logiciels compatibles')}: {regimes.find(r => r.code === selectedRegime)?.compatibleSoftware.join(', ')}
                        </p>
                      </div>
                    )}

                    <LegacyStack distribution="fill">
                      <div>
                        <div style={{ marginBottom: 4, display: 'block' }}>
                          <Text variant="bodyMd" as="span" fontWeight="bold">{t('form.currency')}</Text>
                        </div>
                        <Select
                          label=""
                          name="currency"
                          options={currenciesData.currencies.map(currency => ({
                            label: `${currency.name} (${currency.code})`,
                            value: currency.code
                          }))}
                          value={formData.currency}
                          onChange={value => handleChange("currency", value)}
                          disabled={!selectedRegime}
                          helpText={selectedRegime ? t('settings.general.currencyHelp', { regime: regimes.find(r => r.code === selectedRegime)?.name, currency: regimes.find(r => r.code === selectedRegime)?.currency }) : ''}
                        />
                      </div>
                      <div>
                        <div style={{ marginBottom: 4, display: 'block' }}>
                          <Text variant="bodyMd" as="span" fontWeight="bold">{t('settings.general.vatRate')}</Text>
                        </div>
                        <TextField
                          label=""
                          name="vatRate"
                          type="number"
                          value={formData.vatRate}
                          onChange={value => handleChange("vatRate", value)}
                          autoComplete="off"
                          min={0}
                          max={100}
                          step={0.1}
                        />
                      </div>
                    </LegacyStack>

                    <LegacyStack vertical spacing="loose">
                      <div>
                        <div style={{ marginBottom: 4, display: 'block' }}>
                          <Text variant="bodyMd" as="span" fontWeight="bold">{t('settings.general.salesAccount')}</Text>
                        </div>
                        <LegacyStack vertical spacing="tight">
                          <TextField
                            label=""
                            value={formData.salesAccount}
                            onChange={(value) => handleChange("salesAccount", value)}
                            autoComplete="off"
                            helpText={t('settings.general.salesAccountHelp')}
                          />
                        </LegacyStack>
                      </div>

                      <div>
                        <div style={{ marginBottom: 4, display: 'block' }}>
                          <Text variant="bodyMd" as="span" fontWeight="bold">{t('settings.general.timezone')}</Text>
                        </div>
                        <LegacyStack vertical spacing="tight">
                          <Text variant="bodyMd" as="p">
                            {t('settings.general.shopTimezone')}: {shopDetails?.timezone || 'UTC'}
                          </Text>
                          <Banner
                            title={t('settings.general.timezoneBannerTitle')}
                            tone="info"
                          >
                            <p>{t('settings.general.timezoneBannerText')}</p>
                          </Banner>
                        </LegacyStack>
                      </div>
                    </LegacyStack>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                      <BiSaveBtn title={t('action.save')} isLoading={isSaving} />
                    </div>
                  </FormLayout>
                </LegacyStack>
              </form>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Configuration FTP</Text>
                <form onSubmit={handleFtpSubmit} id="ftp-settings-form">
                  <FormLayout>
                    <TextField
                      label={t('ftp.host')}
                      name="host"
                      value={ftpFormData.host}
                      onChange={(value) => handleFtpChange("host", value)}
                      autoComplete="off"
                    />
                    <TextField
                      label={t('ftp.port')}
                      name="port"
                      type="number"
                      value={String(ftpFormData.port)}
                      onChange={(value) => handleFtpChange("port", value)}
                      autoComplete="off"
                    />
                    <Select
                      label={t('ftp.protocol')}
                      name="protocol"
                      options={[
                        { label: "SFTP", value: "SFTP" },
                        { label: "FTP", value: "FTP" },
                      ]}
                      value={ftpFormData.protocol}
                      onChange={(value) => handleFtpChange("protocol", value)}
                    />
                    <TextField
                      label={t('ftp.username')}
                      name="username"
                      value={ftpFormData.username}
                      onChange={(value) => handleFtpChange("username", value)}
                      autoComplete="off"
                    />
                    <TextField
                      label={t('ftp.password')}
                      name="password"
                      type="password"
                      value={ftpFormData.password}
                      onChange={(value) => handleFtpChange("password", value)}
                      helpText={t('ftp.passwordHelp')}
                      autoComplete="new-password"
                    />
                    <TextField
                      label={t('ftp.directory')}
                      name="directory"
                      value={ftpFormData.directory}
                      onChange={(value) => handleFtpChange("directory", value)}
                      autoComplete="off"
                    />
                    <Checkbox
                      label={t('ftp.passiveMode')}
                      name="passiveMode"
                      checked={ftpFormData.passiveMode}
                      onChange={(checked) => handleFtpChange("passiveMode", checked)}
                    />
                    <TextField
                      label={t('ftp.retryDelay')}
                      name="retryDelay"
                      type="number"
                      value={String(ftpFormData.retryDelay)}
                      onChange={(value) => handleFtpChange("retryDelay", value)}
                      autoComplete="off"
                    />
                    <div style={{ display: 'flex', width: '100%' }}>
                      <BiBtn
                        title={t('ftp.testConnection')}
                        onClick={handleFtpTest}
                        style={{ minWidth: 'unset', maxWidth: 'unset', margin: 0 }}
                      />
                      <BiSaveBtn
                        title={t('ftp.saveConfig')}
                        isLoading={isSaving}
                        style={{ minWidth: 'unset', maxWidth: 'unset', margin: 0, marginLeft: 'auto' }}
                      />
                    </div>
                    {testStatus === "success" && (
                        <Banner title={t('ftp.successBannerTitle')} tone="success" onDismiss={() => setTestStatus('idle')} />
                    )}
                    {testStatus === "error" && (
                        <Banner title={t('ftp.errorBannerTitle')} tone="critical" onDismiss={() => setTestStatus('idle')}>
                            <Text as="span">{t('ftp.errorBannerText')}</Text>
                        </Banner>
                    )}
                  </FormLayout>
                </form>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      {toastMarkup}
    </Frame>
  );
} 