import type { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate, useLoaderData } from "@remix-run/react";
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
import { requireFiscalConfigOrRedirect } from "../utils/requireFiscalConfig.server";
import { prisma } from "../db.server";
import { redirect } from "@remix-run/node";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  let shop = await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } });
  if (!shop) {
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // +15 jours
    shop = await prisma.shop.create({
      data: {
        id: session.shop,
        shopifyDomain: session.shop,
        accessToken: session.accessToken || '',
        trialStartDate: now,
        trialEndDate: trialEnd,
        subscriptionStatus: 'TRIAL',
      }
    });
  }
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
  const fiscalConfig = await prisma.fiscalConfiguration.findUnique({ where: { shopId: shop.id } });
  return { hasFiscalConfig: !!fiscalConfig };
};

export default function Index() {
  const { hasFiscalConfig } = useLoaderData() as { hasFiscalConfig: boolean };
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!hasFiscalConfig) {
      navigate("/app/settings/company-fiscal-regime", { replace: true });
    }
  }, [hasFiscalConfig, navigate]);

  if (!hasFiscalConfig) {
    return null;
  }

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
                      {t('home.quickSetup', 'Essai gratuit de 15 jours - Sans engagement')}
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
