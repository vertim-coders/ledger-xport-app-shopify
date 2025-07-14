import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";
import { useTranslation } from 'react-i18next';

import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{t('landing.heading', 'A short heading about [your app]')}</h1>
        <p className={styles.text}>
          {t('landing.tagline', 'A tagline about [your app] that describes your value proposition.')}
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>{t('landing.shopDomain', 'Shop domain')}</span>
              <input className={styles.input} type="text" name="shop" />
              <span>{t('landing.shopDomainExample', 'e.g: my-shop-domain.myshopify.com')}</span>
            </label>
            <button className={styles.button} type="submit">
              {t('action.login', 'Log in')}
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>{t('landing.featureTitle', 'Product feature')}</strong>. {t('landing.featureDetail', 'Some detail about your feature and its benefit to your customer.')}
          </li>
          <li>
            <strong>{t('landing.featureTitle', 'Product feature')}</strong>. {t('landing.featureDetail', 'Some detail about your feature and its benefit to your customer.')}
          </li>
          <li>
            <strong>{t('landing.featureTitle', 'Product feature')}</strong>. {t('landing.featureDetail', 'Some detail about your feature and its benefit to your customer.')}
          </li>
        </ul>
      </div>
    </div>
  );
}
