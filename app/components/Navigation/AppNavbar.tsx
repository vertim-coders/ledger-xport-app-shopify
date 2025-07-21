import React from "react";
import { Box, BlockStack, Text, Icon, Divider } from "@shopify/polaris";
import {
  HomeIcon,
  SettingsIcon,
  CalendarIcon,
  OrderIcon,
  ProfileIcon,
  StoreIcon,
  EditIcon,
} from "@shopify/polaris-icons";
import { useNavigate, useLocation } from "@remix-run/react";
import { useTranslation } from 'react-i18next';

// Personnalisation facile : couleurs, textes, icônes
const SIDEBAR_BG = "#D3D3D3"; // Couleur principale
const SIDEBAR_WIDTH = 260;
const LOGO_SRC = "/assets/LedgerXport_logo.png";
const LOGO_ALT = "LedgerXport Logo";
export function AppNavbar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (url: string) => location.pathname === url;

  const SUBTEXT = t('nav.sidebarSubtext', 'Sales Management Dashboard');

const navigationItems = [
  {
      label: t('nav.home', 'Accueil'),
    icon: HomeIcon,
    url: "/app",
  },
  {
      label: t('nav.dashboard', 'Tableau de bord'),
    icon: ProfileIcon,
    url: "/app/dashboard",
  },
  {
      label: t('nav.manualExports', 'Exports manuels'),
    icon: OrderIcon,
    url: "/app/reports/manual-export",
  },
  {
      label: t('nav.scheduledExports', 'Exports planifiés'),
    icon: CalendarIcon,
    url: "/app/reports/schedule",
  },
  {
    label: t('nav.customAIReport', 'Rapport personnalisé (IA)'),
    icon: EditIcon,
    url: "/app/reports/custom-ai",
  },
  {
      label: t('nav.allSchedules', 'Toutes les planifications'),
    icon: CalendarIcon,
    url: "/app/reports/scheduled-list",
  },
  {
      label: t('nav.exportHistory', 'Historiques des exports'),
    icon: StoreIcon,
    url: "/app/reports/history",
  },
];

const settingsItem = {
  label: t('nav.generalSettings', 'Paramètres généraux'),
  icon: SettingsIcon,
  url: "/app/settings/general",
};


  // Responsive: détecte si mobile et si la hauteur est faible
  const [isMobile, setIsMobile] = React.useState(false);
  const [isShort, setIsShort] = React.useState(false);
  const [isVeryShort, setIsVeryShort] = React.useState(false);
  React.useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 900);
      setIsShort(window.innerHeight <= 700);
      setIsVeryShort(window.innerHeight <= 500);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
          zIndex: 100,
          minHeight: 0,
          height: '100vh',
          borderRadius: isMobile ? 0 : "10px 10px 10px 10px",
          boxShadow: isMobile && showSidebar ? "2px 0 16px rgba(0,0,0,0.10)" : undefined,
          transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
          overflow: 'hidden',
        }}
      >
        {/* Haut : Logo + sous-texte */}
        <div style={{
          padding: isVeryShort ? "8px 0 4px 0" : isShort ? "16px 0 8px 0" : "32px 0 16px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0
        }}>
          <img
            src={LOGO_SRC}
            alt={LOGO_ALT}
            style={{ maxHeight: isVeryShort ? 40 : isShort ? 52 : 64, width: "auto", objectFit: "contain", marginBottom: isVeryShort ? 2 : isShort ? 4 : 8 }}
          />
          <span style={{ color: "#e0e7ef", fontSize: isVeryShort ? 10 : isShort ? 12 : undefined }}>
            <Text as="span" variant="bodySm" tone="subdued" alignment="center">
              {SUBTEXT}
            </Text>
          </span>
        </div>
        <Divider borderColor="border" />
        <div style={{ padding: isVeryShort ? '4px 16px 0 16px' : isShort ? '8px 20px 0 20px' : '12px 32px 0 32px', textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: 0.5 }}>
            <Text as="span" variant="bodySm" tone="subdued">{t('sidebar.mainMenu', 'Menu principal')}</Text>
          </span>
        </div>
        {/* Menu vertical */}
        <ul style={{
          flex: 1,
          minHeight: 0,
          margin: 0,
          marginTop: 25,
          padding: isVeryShort ? "12px 0 0 0" : isShort ? "18px 0 0 0" : "32px 0 0 0",
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: isVeryShort ? 4 : isShort ? 8 : 12,
          overflow: 'hidden',
        }}>
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
                  marginBottom: 5,
                  gap: isVeryShort ? 6 : isShort ? 10 : 16,
                  padding: isVeryShort ? "8px 16px" : isShort ? "12px 20px" : "18px 32px",
                  borderRadius: "10px 0px 0px 10px",
                  cursor: "pointer",
                  fontSize: isVeryShort ? 12 : isShort ? 14 : 15,
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
                <span style={{
                  flex: 1,
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                  maxWidth: "100%"
                }}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        {/* Séparateur et bouton Paramètres généraux */}
        <Divider borderColor="border" />
        <div style={{ padding: isVeryShort ? '4px 16px 0 16px' : isShort ? '8px 20px 0 20px' : '12px 32px 0 32px', textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: 0.5 }}>
            <Text as="span" variant="bodySm" tone="subdued">{t('sidebar.support', 'Aide et support')}</Text>
          </span>
        </div>
        <div style={{ marginTop: 30 }}>
          <button
            style={{
              width: "100%",
              marginBottom: 100,
              background: isActive(settingsItem.url) ? "#fff" : "none",
              border: "none",
              color: isActive(settingsItem.url) ? "#0066FF" : "#000000",
              display: "flex",
              alignItems: "center",
              gap: isVeryShort ? 6 : isShort ? 10 : 16,
              padding: isVeryShort ? "8px 16px" : isShort ? "12px 20px" : "18px 32px",
              borderRadius: "10px 0px 0px 10px",
              cursor: "pointer",
              fontSize: isVeryShort ? 12 : isShort ? 14 : 15,
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
            <span style={{
              flex: 1,
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              maxWidth: "100%"
            }}>{settingsItem.label}</span>
          </button>
        </div>
        {/* Bas supprimé : Paramètres généraux intégré au menu principal */}
      </div>
    </>
  );
} 