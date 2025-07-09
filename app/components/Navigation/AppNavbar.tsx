import React from "react";
import { Box, BlockStack, Text, Icon, Divider } from "@shopify/polaris";
import {
  HomeIcon,
  SettingsIcon,
  CalendarIcon,
  OrderIcon,
  ProfileIcon,
  StoreIcon,
} from "@shopify/polaris-icons";
import { useNavigate, useLocation } from "@remix-run/react";

// Personnalisation facile : couleurs, textes, icônes
const SIDEBAR_BG = "#D3D3D3"; // Couleur principale
const SIDEBAR_WIDTH = 260;
const LOGO_SRC = "/assets/LedgerXportLogo.png";
const LOGO_ALT = "LedgerXport Logo";
const SUBTEXT = "Sales Management Dashboard";

const navigationItems = [
  {
    label: "Accueil",
    icon: HomeIcon,
    url: "/app",
  },
  {
    label: "Configuration",
    icon: SettingsIcon,
    url: "/app/settings/company-fiscal-regime",
  },
  {
    label: "Tableau de bord",
    icon: ProfileIcon,
    url: "/app/dashboard",
  },
  {
    label: "Exports manuels",
    icon: OrderIcon,
    url: "/app/reports/manual-export",
  },
  {
    label: "Exports planifiés",
    icon: CalendarIcon,
    url: "/app/reports/schedule",
  },
  {
    label: "Toutes les planifications",
    icon: CalendarIcon,
    url: "/app/reports/scheduled-list",
  },
  {
    label: "Historiques des exports",
    icon: StoreIcon,
    url: "/app/reports/history",
  },
];

const settingsItem = {
  label: "Paramètres généraux",
  icon: SettingsIcon,
  url: "/app/settings/general",
};

export function AppNavbar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (url: string) => location.pathname === url;

  // Responsive: détecte si mobile
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Gestion de l’overlay mobile
  const showSidebar = !isMobile || open;

  return (
    <>
      {/* Overlay mobile */}
      {isMobile && open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.25)",
            zIndex: 99,
            transition: "opacity 0.2s",
          }}
        />
      )}
      <div
        style={{
          width: SIDEBAR_WIDTH,
          background: SIDEBAR_BG,
          color: "#000000",
          position: isMobile ? "fixed" : "fixed",
          left: showSidebar ? 0 : -SIDEBAR_WIDTH - 40,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 100,
          minHeight: "100vh",
          borderRadius: isMobile ? 0 : "10px 10px 10px 10px",
          boxShadow: isMobile && showSidebar ? "2px 0 16px rgba(0,0,0,0.10)" : undefined,
          transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Haut : Logo + sous-texte */}
        <div style={{ padding: "32px 0 16px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={LOGO_SRC}
            alt={LOGO_ALT}
            style={{ maxHeight: 48, width: "auto", objectFit: "contain", marginBottom: 8 }}
          />
          <span style={{ color: "#e0e7ef" }}>
            <Text as="span" variant="bodySm" tone="subdued" alignment="center">
              {SUBTEXT}
            </Text>
          </span>
        </div>
        <Divider borderColor="border" />
        {/* Menu vertical */}
        <ul style={{ flex: 1, margin: 0, padding: "32px 0 0 0", listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {navigationItems.map((item) => (
            <li key={item.label} style={{ width: "100%" }}>
              <button
                style={{
                  width: "100%",
                  background: isActive(item.url) ? "#fff" : "none",
                  border: "none",
                  color: isActive(item.url) ? "#0066FF" : "#000000",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 32px",
                  borderRadius: "10px 0px 0px 10px",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 500,
                  transition: "background 0.2s, color 0.2s",
                }}
                onClick={() => {
                  navigate(item.url);
                  if (isMobile && onClose) onClose();
                }}
                onMouseOver={e => {
                  if (!isActive(item.url)) e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                }}
                onMouseOut={e => {
                  if (!isActive(item.url)) e.currentTarget.style.background = "none";
                }}
              >
                <Icon source={item.icon} tone={isActive(item.url) ? "base" : "subdued"} />
                <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        {/* Bas : Paramètres généraux */}
        <div style={{ width: "100%", padding: "0 24px 12px 24px" }}>
          <Divider borderColor="border" />
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              style={{
                marginBottom: 60,
                width: "100%",
                background: isActive(settingsItem.url) ? "#fff" : "none",
                border: "none",
                color: isActive(settingsItem.url) ? "#0066FF" : "#000000",
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 32px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                transition: "background 0.2s, color 0.2s",
              }}
              onClick={() => {
                navigate(settingsItem.url);
                if (isMobile && onClose) onClose();
              }}
              onMouseOver={e => {
                if (!isActive(settingsItem.url)) e.currentTarget.style.background = "rgba(0,0,0,0.06)";
              }}
              onMouseOut={e => {
                if (!isActive(settingsItem.url)) e.currentTarget.style.background = "none";
              }}
            >
              <Icon source={settingsItem.icon} tone={isActive(settingsItem.url) ? "base" : "subdued"} />
              <span style={{ flex: 1, textAlign: "left" }}>{settingsItem.label}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 