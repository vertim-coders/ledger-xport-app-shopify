import { json, type LoaderFunctionArgs, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { Page, Card, Text, Button, Banner, BlockStack } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { useTranslation } from 'react-i18next';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { useEffect } from 'react';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } });
  let daysLeft = 0;
  if (shop?.trialEndDate) {
    const now = new Date();
    const diff = shop.trialEndDate.getTime() - now.getTime();
    daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
  return json({ daysLeft, subscriptionStatus: shop?.subscriptionStatus });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  // Shopify Billing API: création du recurring application charge
  const response = await fetch(`https://${session.shop}/admin/api/2023-10/recurring_application_charges.json`, {
    method: "POST",
    headers: [
      ["X-Shopify-Access-Token", session.accessToken || ""],
      ["Content-Type", "application/json"],
      ["Accept", "application/json"]
    ],
    body: JSON.stringify({
      recurring_application_charge: {
        name: "LedgerXport Pro",
        price: 19.0,
        return_url: `${process.env.SHOPIFY_APP_URL}/app/subscribe/callback`,
        trial_days: 15,
        test: process.env.NODE_ENV !== "production"
      }
    })
  });
  const data = await response.json();
  const confirmationUrl = data.recurring_application_charge?.confirmation_url;
  if (confirmationUrl) {
    return json({ confirmationUrl });
  }
  return json({ error: "Impossible de démarrer le checkout d'abonnement Shopify." }, { status: 500 });
};

export default function SubscribePage() {
  const { daysLeft, subscriptionStatus } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const fetcher = useFetcher<{ confirmationUrl?: string }>();
  const app = useAppBridge();

  useEffect(() => {
    if (fetcher.data?.confirmationUrl) {
      if (typeof window !== "undefined") {
        window.open(fetcher.data.confirmationUrl, "_top");
      }
    }
  }, [fetcher.data]);

  return (
    <Page title={t('subscription.page.title')}>
      <BlockStack gap="400">
        {subscriptionStatus === 'TRIAL' && daysLeft > 0 ? (
          <Banner tone="info" title={t('subscription.trial.title')}>
            <p dangerouslySetInnerHTML={{ __html: t('subscription.trial.remaining', { daysLeft }) }} />
          </Banner>
        ) : (
          <Banner tone="critical" title={t('subscription.page.required')}>
            <p dangerouslySetInnerHTML={{ __html: t('subscription.page.trialEnded') }} />
          </Banner>
        )}
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">{t('subscription.plan.name')}</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              {t('subscription.plan.details')}
            </Text>
            <fetcher.Form method="post">
              <Button variant="primary" size="large" submit>
                {t('subscription.plan.subscribe')}
              </Button>
            </fetcher.Form>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
} 