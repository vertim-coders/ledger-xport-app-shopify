import { useState, useEffect } from "react";
import { json, type HeadersFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { Frame } from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { AppNavbar } from "../components/Navigation/AppNavbar";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sur desktop, la sidebar est toujours ouverte
  useEffect(() => {
    if (!isMobile) setSidebarOpen(true);
    else setSidebarOpen(false);
  }, [isMobile]);

  // Position du bouton :
  // - Sidebar ouverte : à droite du sidebar (top: 18px, left: sidebarWidth + 18px)
  // - Sidebar fermée : en haut à gauche (top: 18px, left: 18px)
  const SIDEBAR_WIDTH = 260;
  const buttonLeft = isMobile && sidebarOpen ? SIDEBAR_WIDTH + 18 : 18;

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Frame>
        {/* Bouton hamburger/croix mobile/tablette */}
        {isMobile && (
          <button
            aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            style={{
              position: "fixed",
              top: 18,
              left: buttonLeft,
              zIndex: 120,
              background: "#fff",
              border: "none",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "left 0.25s cubic-bezier(.4,0,.2,1), background 0.2s"
            }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span style={{ display: "block", width: 24, height: 24 }}>
              {sidebarOpen ? (
                // Croix (X) bien visible
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="18" y1="6" x2="6" y2="18" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              ) : (
                // Hamburger
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="4" width="24" height="2.5" rx="1.25" fill="#0066FF" />
                  <rect y="10.75" width="24" height="2.5" rx="1.25" fill="#0066FF" />
                  <rect y="17.5" width="24" height="2.5" rx="1.25" fill="#0066FF" />
                </svg>
              )}
            </span>
          </button>
        )}
        <AppNavbar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div
          style={{
            padding: isMobile ? "24px 8px 24px 8px" : `24px 24px 24px ${260 + 32}px`,
            transition: "padding 0.2s cubic-bezier(.4,0,.2,1)",
            minHeight: "100vh",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "100vw",
            overflowX: "auto"
          }}
        >
          <Outlet />
        </div>
      </Frame>
    </AppProvider>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return new Headers(headersArgs.loaderHeaders);
};
