import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./styles/polaris-overrides.css";
//import Footer from './components/Footer';
import { useEffect } from "react";
// Ajout de l'import Crisp
import { Crisp } from "crisp-sdk-web";
// Import i18n
import './i18n';

// Déclaration des types pour window.__SHOP_LANGUAGE__
declare global {
  interface Window {
    __SHOP_LANGUAGE__?: string;
  }
}

//ID 3530e87e-a011-4974-9a88-2613cf0f336c
//Key c78d390fc74b303455f0b62f58c1497d560cf3fdbef6ca21117048d8a354f466
export default function App() {
  // On récupère la langue détectée depuis le window ou un context (à adapter selon ton système)
  useEffect(() => {
    // Remplacez par votre vrai Website ID Crisp
    const CRISP_WEBSITE_ID = "647cf06a-82d0-4149-ac61-63e52278a07e";
    Crisp.configure(CRISP_WEBSITE_ID);

    // Appliquer la langue détectée automatiquement
    if (typeof window !== 'undefined' && window.__SHOP_LANGUAGE__) {
      // Import dynamique d'i18next pour éviter les erreurs côté serveur
      import('i18next').then(({ default: i18n }) => {
        console.log('Changing language to:', window.__SHOP_LANGUAGE__);
        i18n.changeLanguage(window.__SHOP_LANGUAGE__);
      }).catch(console.error);
    }
  }, []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {/* <Footer /> */}
        {/* Injection de la langue détectée dans le window pour le client */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SHOP_LANGUAGE__ = "fr"; // Remplacer par la langue détectée dynamiquement côté serveur`
          }}
        />
      </body>
    </html>
  );
}
