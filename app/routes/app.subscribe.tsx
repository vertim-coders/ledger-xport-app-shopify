import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useAppBridge } from '@shopify/app-bridge-react';
import { Banner, Page } from "@shopify/polaris";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSimpleBtn } from '../components/Buttons/BiSimpleBtn';
import Footer from '../components/Footer';
import { prisma } from "../db.server";
import { authenticate } from "../shopify.server";

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
    if (fetcher.data) {
      console.log('fetcher.data:', fetcher.data);
    }
    if (fetcher.data?.confirmationUrl) {
      if (typeof window !== "undefined") {
        window.open(fetcher.data.confirmationUrl, "_top");
      }
    }
  }, [fetcher.data]);

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
      `}</style>
      <Page fullWidth title={t('subscription.page.title')}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '22px 0' }}>
          {/* Remplacement du header par la bannière d'essai/abonnement */}
          {subscriptionStatus === 'TRIAL' && daysLeft > 0 ? (
            <Banner tone="info" title={t('subscription.trial.title')}>
              <p dangerouslySetInnerHTML={{ __html: t('subscription.trial.remaining', { daysLeft }) }} />
            </Banner>
          ) : (
            <Banner tone="critical" title={t('subscription.page.required')}>
              <p dangerouslySetInnerHTML={{ __html: t('subscription.page.trialEnded') }} />
            </Banner>
          )}
          <div style={{ position: 'relative', maxWidth: 420, margin: '40px auto 0 auto' }}>
            <div style={{ position: 'absolute', inset: -4, background: 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)', borderRadius: 32, filter: 'blur(16px)', opacity: 0.18, zIndex: 0 }} />
            <div style={{ position: 'relative', background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px 0 rgba(60,60,120,0.08)', border: '1px solid #f3f3f3', overflow: 'hidden', zIndex: 1 }}>
              {/* Header with badge */}
              <div style={{ background: 'linear-gradient(90deg, #eff6ff 0%, #f5f3ff 100%)', padding: '32px 32px 24px 32px', borderBottom: '1px solid #f3f3f3' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  <div style={{ background: '#dbeafe', color: '#2563eb', padding: '4px 16px', borderRadius: 999, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16 }}>✨</span>
                    {t('subscription.mostPopular', 'Most Popular')}
                  </div>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: '#222', marginBottom: 8 }}>
                  {t('subscription.plan.name', 'LedgerXport Subscription')}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                  <span style={{ fontSize: 40, fontWeight: 700, color: '#222' }}>$19</span>
                  <span style={{ color: '#666', fontSize: 18 }}>/month</span>
                </div>
              </div>
              {/* Features */}
              <div style={{ padding: 32 }}>
                <p style={{ color: '#666', marginBottom: 24, textAlign: 'center' }}>
                  {t('subscription.plan.details', 'No commitment. 15-day free trial upon installation.')}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 32 }}>
                  {[
                    t('subscription.feature.unlimitedExports', 'Unlimited exports'),
                    t('subscription.feature.allFormats', 'All file formats (CSV, Excel, PDF)'),
                    t('subscription.feature.advancedFiltering', 'Advanced filtering & sorting'),
                    t('subscription.feature.automatedScheduling', 'Automated scheduling'),
                    t('subscription.feature.prioritySupport', 'Priority email support'),
                    t('subscription.feature.security', 'Data encryption & security'),
                  ].map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <span style={{ background: '#dbeafe', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M5 9l3 3 5-5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span style={{ color: '#333', fontSize: 16 }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <fetcher.Form method="post">
                  <BiSimpleBtn title={t('subscription.plan.subscribe', 'Start Free Trial')} style={{ width: '100%', fontSize: 18, padding: '18px 0', borderRadius: 16 }} type="submit" />
                </fetcher.Form>
                <p style={{ fontSize: 13, color: '#888', marginTop: 18, textAlign: 'center' }}>
                  {t('subscription.cancelAnytime', 'Cancel anytime. No questions asked.')}
                </p>
              </div>
            </div>
          </div>
          {/* Trust indicators */}
          <div style={{ marginTop: 56 }}>
            <Footer />
          </div>
        </div>
      </Page>
    </>
  );
}