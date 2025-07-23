import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./styles/polaris-overrides.css";
import "./styles/sticky-title.css";
//import Footer from './components/Footer';
import { useEffect } from "react";
// Ajout de l'import Crisp
import { Crisp } from "crisp-sdk-web";
// Import i18n
import './i18n';

// Suppression de toute logique de détection/injection automatique de langue

export default function App() {
  // On récupère la langue détectée depuis le window ou un context (à adapter selon ton système)
  useEffect(() => {
    // Remplacez par votre vrai Website ID Crisp
    const CRISP_WEBSITE_ID = "647cf06a-82d0-4149-ac61-63e52278a07e";
    Crisp.configure(CRISP_WEBSITE_ID);

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
      </body>
    </html>
  );
}
