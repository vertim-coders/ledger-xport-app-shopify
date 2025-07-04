import { useLocation, useNavigate } from "@remix-run/react";
import { useCallback } from "react";

export function AppNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: "Acueil",
      icon: "home",
      url: "/app",
    },
    {
      label: "Configuration",
      icon: "settings",
      url: "/app/settings/company-fiscal-regime",
    },
    {
      label: "Tableau de bord",
      icon: "dashboard",
      url: "/app/dashboard",
    },
    {
      label: "Exports manuels",
      icon: "reports",
      url: "/app/reports/manual-export",
    },
    {
      label: "Exports planifiés",
      icon: "calendar",
      url: "/app/reports/schedule",
    },
    {
      label: "Toutes les planifications",
      icon: "calendar",
      url: "/app/reports/scheduled-list",
    },
    {
      label: "Historiques des exports",
      icon: "history",
      url: "/app/reports/history",
    },
    {
      label: "Parametres générals",
      icon: "settings",
      url: "/app/settings/general",
    },
  ];

  const handleNavigationClick = useCallback((url: string) => {
    navigate(url);
  }, [navigate]);

  return (
    <div style={{ width: '100%' }}>
      {/* Bandeau blanc avec logo centré */}
      <div style={{
        background: '#fff',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #e5e5e5',
        width: '100%'
      }}>
        <img
          src="/assets/LedgerXportLogo.png"
          alt="LedgerXport Logo"
          style={{
            maxHeight: '40px',
            height: '40px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
      {/* Navbar bleu */}
      <div style={{ 
        backgroundColor: '#0066FF',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ 
          padding: '0 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            height: '48px',
            justifyContent: 'center'
          }}>
            {navigationItems.map((item) => (
              <div
                key={item.url}
                onClick={() => handleNavigationClick(item.url)}
                style={{
                  color: location.pathname === item.url ? '#0066FF' : '#ffffff',
                  backgroundColor: location.pathname === item.url ? '#ffffff' : 'transparent',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (location.pathname !== item.url) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== item.url) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 