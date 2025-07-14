import type { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  ActionList,
  Frame,
  Box,
} from '@shopify/polaris';
import {
  SettingsIcon,
  OrderIcon,
  CalendarIcon,
  StoreIcon
} from '@shopify/polaris-icons';
import { authenticate } from "../shopify.server";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Frame>
      <Page narrowWidth>
        <Layout>
          {/* Section principale de l'application */}
          <Layout.Section>
            <Card>
              <Box padding="400">
                {/* Message "Nouveau" comme sur l'image */}
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    background: 'var(--p-color-bg-surface-brand, #F0F6FF)',
                    borderRadius: 34,
                    padding: '18px 36px',
                    minWidth: 220,
                    maxWidth: '100%',
                    margin: '0 auto',
                    boxShadow: '0 2px 8px 0 rgba(0,102,255,0.06)',
                    whiteSpace: 'nowrap',
                    overflowX: 'auto',
                    textAlign: 'center',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: '#0066FF', fontSize: '14px', fontWeight: '500' }}>
                        <span style={{ marginRight: '8px' }}>✨</span>
                        {t('home.newVersion', 'Nouveau : La version 1.0 de LedgerXport est disponible !')}
                      </span>
                    </div>
                  </div>
                </div>

                <Text as="h1" variant="heading2xl" alignment="center">
                  {t('home.simplifyExport', "Simplifiez l'export de vos données Shopify")}
                </Text>

                <Box paddingBlockStart="600" paddingBlockEnd="800">
                  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Text as="p" variant="bodyLg" alignment="center" tone="subdued">
                      {t('home.welcome', "Bienvenue sur LedgerXport 🎉 Cette application vous permet d'exporter vos données Shopify vers votre logiciel de comptabilité. Utilisez la navigation en haut pour accéder aux différentes fonctionnalités.")}
                    </Text>
                  </div>
                </Box>

                {/* Bouton d'appel à l'action */}
                <Box paddingBlockStart="400">
                  <div style={{ textAlign: 'center' }}>
                    <BiSimpleBtn
                      title={t('home.cta', 'Commencer un export')}
                      onClick={() => navigate("/app/dashboard")}
                    />
                  </div>
                </Box>

                <Box paddingBlockStart="400">
                  <div style={{ textAlign: 'center' }}>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {t('home.quickSetup', 'Essai gratuit de 14 jours - Sans engagement')}
                    </Text>
                  </div>
                </Box>
              </Box>
            </Card>
          </Layout.Section>

          {/* Section des fonctionnalités */}
          <Layout.Section>
            <Card>
              <Box padding="400">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box paddingBlockEnd="800">
                    <Text as="h2" variant="headingLg" alignment="center">
                      {t('home.featuresTitle', 'Fonctionnalités disponibles')}
                    </Text>
                  </Box>
                  <div style={{ width: '100%', maxWidth: 480 }}>
                    <BlockStack gap="400">
                      <ActionList
                        items={[
                          {
                            content: t('home.feature.fiscalConfig', 'Configuration fiscale de votre entreprise'),
                            icon: OrderIcon,
                            onAction: () => navigate("/app/settings/general"),
                          },
                          {
                            content: t('home.feature.manualExports', 'Exports manuels de données'),
                            icon: OrderIcon,
                            onAction: () => navigate("/app/reports/manual-export"),
                          },
                          {
                            content: t('home.feature.scheduledExports', "Planification d'exports automatiques"),
                            icon: CalendarIcon,
                            onAction: () => navigate("/app/reports/schedule"),
                          },
                          {
                            content: t('home.feature.exportHistory', 'Historique des exports'),
                            icon: StoreIcon,
                            onAction: () => navigate("/app/reports/history"),
                          },
                          {
                            content: t('home.feature.generalSettings', 'Paramètres généraux'),
                            icon: SettingsIcon,
                            onAction: () => navigate("/app/settings/general"),
                          },
                        ]}
                      />
                    </BlockStack>
                  </div>
                </div>
              </Box>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Footer />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
