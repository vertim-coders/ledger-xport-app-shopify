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
import { useTranslation } from 'react-i18next';
// Ajout de l'import Crisp
// Import i18n
import './i18n';

// Suppression de toute logique de détection/injection automatique de langue

export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    // Définit la langue du chat Crisp à celle de l'app
    window.CRISP_RUNTIME_CONFIG = {
      locale: i18n.language?.substring(0, 2) || "en"
    };

    // Charge le widget Crisp si non présent
    if (!window.$crisp) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "647cf06a-82d0-4149-ac61-63e52278a07e";
      const s = document.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      document.getElementsByTagName("head")[0].appendChild(s);
    }
  }, [i18n.language]);

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
      </body>
    </html>
  );
}
