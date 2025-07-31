import type { ExportFormat as ExportFormatType, Protocol as ProtocolType } from "@prisma/client";
import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import {
    Banner,
    BlockStack,
    Card,
    Checkbox,
    FormLayout,
    Frame,
    Layout,
    LegacyStack,
    Page,
    Select,
    Text,
    TextField,
    Toast,
    InlineStack,
    Thumbnail
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiBtn } from "../components/Buttons/BiBtn";
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";
import { LanguageSelector } from "../components/LanguageSelector";
import FileUpload from "../components/FileUpload";
import currenciesData from "../data/currencies.json";
import fiscalRegimesData from "../data/fiscal-regimes.json";
import { prisma } from "../db.server";
import ftpService from "../services/ftp.service";
import { authenticate } from "../shopify.server";
import { decrypt, encrypt } from "../utils/crypto.server";
import { requireFiscalConfigOrRedirect } from "../utils/requireFiscalConfig.server";

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } });
  // Vérification de la période d'essai et du statut d'abonnement
  const now = new Date();
  if (
    shop &&
    ((shop.subscriptionStatus === 'TRIAL' && shop.trialEndDate && now > shop.trialEndDate) ||
      shop.subscriptionStatus === 'EXPIRED' ||
      shop.subscriptionStatus === 'CANCELLED')
  ) {
    return redirect('/app/subscribe');
  }
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
    // Invoice customization fields
    invoiceLogoUrl: formData.get("invoice_logoUrl") as string || null,
    invoiceLogoWidth: parseInt(formData.get("invoice_logoWidth") as string) || 150,
    invoiceLogoHeight: parseInt(formData.get("invoice_logoHeight") as string) || 100,
    invoiceCompanyName: formData.get("invoice_companyName") as string || null,
    invoiceAddress: formData.get("invoice_address") as string || null,
    invoicePhone: formData.get("invoice_phone") as string || null,
    invoiceEmail: formData.get("invoice_email") as string || null,
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
  
  // Invoice customization states
  const [invoiceCustomization, setInvoiceCustomization] = useState({
    logoUrl: generalSettings?.invoiceLogoUrl || "",
    companyName: generalSettings?.invoiceCompanyName || shopDetails?.name || "",
    address: generalSettings?.invoiceAddress || "",
    phone: generalSettings?.invoicePhone || "",
    email: generalSettings?.invoiceEmail || "",
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
  const [isLogoUploading, setIsLogoUploading] = useState(false);

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

  const handleInvoiceCustomizationChange = (field: string, value: string | number) => {
    setInvoiceCustomization(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (file: File) => {
    setIsLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setInvoiceCustomization(prev => ({ 
          ...prev, 
          logoUrl: result.url 
        }));
        setToastMessage(t('toast.logoUploadSuccess', 'Logo téléchargé avec succès'));
        setToastError(false);
        setToastActive(true);
      } else {
        console.error('Upload failed:', result.error);
        setToastMessage(t('toast.logoUploadError', 'Erreur lors du téléchargement du logo'));
        setToastError(true);
        setToastActive(true);
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      setToastMessage(t('toast.logoUploadError', 'Erreur lors du téléchargement du logo'));
      setToastError(true);
      setToastActive(true);
    } finally {
      setIsLogoUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("fiscalRegime", selectedRegime);
    
    // Add invoice customization data
    Object.entries(invoiceCustomization).forEach(([key, value]) => {
      data.append(`invoice_${key}`, String(value));
    });
    
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
    <>
      <style>{`
        .Polaris-Page--fullWidth,
        .Polaris-Page__Content,
        .Polaris-Layout,
        .Polaris-Layout__Section,
        .Polaris-Card {
          max-width: 100% !important;
          width: 100% !important;
        }
        .Polaris-Layout,
        .Polaris-Layout__Section {
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <Frame>
        <Page
          fullWidth
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

            {/* Invoice Customization Section */}
            <Layout.Section>
              <Card>
                <div style={{ padding: 20 }}>
                  <BlockStack gap="400">
                                         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                       <Text variant="headingMd" as="h2">
                         {t('invoice.customization.title')}
                       </Text>
                     </div>
                    
                    <form onSubmit={handleSubmit}>
                      <FormLayout>
                        {/* Logo Section */}
                        <Card>
                          <div style={{ padding: 16 }}>
                            <BlockStack gap="400">
                                                             <Text variant="headingMd" as="h3">
                                 {t('invoice.customization.companyLogo')}
                               </Text>
                              
                              <div style={{ position: 'relative' }}>
                                                                 <FileUpload
                                   onFileSelect={handleLogoUpload}
                                   acceptedTypes={['image/*']}
                                   maxSize={5}
                                   label={t('invoice.customization.uploadLogo')}
                                   helpText={t('invoice.customization.uploadLogoHelp')}
                                   disabled={isLogoUploading}
                                 />
                                {isLogoUploading && (
                                  <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    zIndex: 10
                                  }}>
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      gap: '8px'
                                    }}>
                                      <div style={{
                                        width: '24px',
                                        height: '24px',
                                        border: '2px solid #e5e7eb',
                                        borderTop: '2px solid #007ace',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                      }} />
                                                                             <Text variant="bodySm" as="span" tone="subdued">
                                         {t('invoice.customization.uploading')}
                                       </Text>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Logo Preview */}
                              {invoiceCustomization.logoUrl && (
                                <div style={{ 
                                  padding: 16, 
                                  border: '1px solid #e1e3e5', 
                                  borderRadius: 8,
                                  backgroundColor: '#f6f6f7'
                                }}>
                                                                     <div style={{ marginBottom: 8 }}>
                                     <Text variant="bodyMd" as="p" fontWeight="semibold">
                                       {t('invoice.customization.logoPreview')}
                                     </Text>
                                   </div>
                                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img
                                      src={invoiceCustomization.logoUrl}
                                      alt="Logo preview"
                                      style={{
                                        width: '150px',
                                        height: '100px',
                                        objectFit: 'contain',
                                        border: '1px solid #d1d5db',
                                        borderRadius: 4,
                                        backgroundColor: 'white'
                                      }}
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const errorDiv = e.currentTarget.nextElementSibling as HTMLElement;
                                        if (errorDiv) errorDiv.style.display = 'flex';
                                      }}
                                      onLoad={(e) => {
                                        const errorDiv = e.currentTarget.nextElementSibling as HTMLElement;
                                        if (errorDiv) errorDiv.style.display = 'none';
                                      }}
                                    />
                                    <div style={{ 
                                      width: '150px',
                                      height: '100px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: 4,
                                      backgroundColor: '#f3f4f6',
                                      display: 'none',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#6b7280',
                                      fontSize: '12px'
                                    }}>
                                                                             {t('invoice.customization.loadingError')}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </BlockStack>
                          </div>
                        </Card>

                        {/* Company Information Section */}
                        <Card>
                          <div style={{ padding: 16 }}>
                            <BlockStack gap="400">
                                                             <Text variant="headingMd" as="h3">
                                 {t('invoice.customization.companyInfo')}
                               </Text>
                              
                                                             <TextField
                                 label={t('invoice.customization.companyName')}
                                 value={invoiceCustomization.companyName}
                                 onChange={value => handleInvoiceCustomizationChange("companyName", value)}
                                 placeholder={t('invoice.customization.companyNamePlaceholder')}
                                 helpText={t('invoice.customization.companyNameHelp')}
                                 autoComplete="off"
                               />

                                                             <TextField
                                 label={t('invoice.customization.address')}
                                 value={invoiceCustomization.address}
                                 onChange={value => handleInvoiceCustomizationChange("address", value)}
                                 placeholder={t('invoice.customization.addressPlaceholder')}
                                 multiline={3}
                                 helpText={t('invoice.customization.addressHelp')}
                                 autoComplete="off"
                               />

                              <InlineStack gap="400">
                                                                 <div style={{ flex: 1 }}>
                                   <TextField
                                     label={t('invoice.customization.phone')}
                                     value={invoiceCustomization.phone}
                                     onChange={value => handleInvoiceCustomizationChange("phone", value)}
                                     placeholder={t('invoice.customization.phonePlaceholder')}
                                     helpText={t('invoice.customization.phoneHelp')}
                                     autoComplete="off"
                                   />
                                 </div>
                                 <div style={{ flex: 1 }}>
                                   <TextField
                                     label={t('invoice.customization.email')}
                                     value={invoiceCustomization.email}
                                     onChange={value => handleInvoiceCustomizationChange("email", value)}
                                     placeholder={t('invoice.customization.emailPlaceholder')}
                                     helpText={t('invoice.customization.emailHelp')}
                                     autoComplete="off"
                                   />
                                 </div>
                              </InlineStack>
                            </BlockStack>
                          </div>
                        </Card>

                                                 <div style={{ marginTop: '16px', textAlign: 'center' }}>
                           <BiSaveBtn title={t('invoice.customization.saveCustomization')} isLoading={isSaving} />
                         </div>
                      </FormLayout>
                    </form>
                  </BlockStack>
                </div>
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
    </>
  );
}