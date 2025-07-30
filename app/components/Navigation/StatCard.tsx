import { Card, Icon } from "@shopify/polaris";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  iconBg?: string; // couleur de fond de l'icône
  color?: string; // couleur principale (texte)
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg = "#E6F0FF", color = "#0066FF" }) => {
  // Responsive: détecte si mobile ou narrow
  const [isMobile, setIsMobile] = React.useState(false);
  const [isNarrow, setIsNarrow] = React.useState(false);
  React.useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 900);
      setIsNarrow(window.innerWidth <= 1366);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{
      borderRadius: 16,
      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
      background: "#fff",
      minWidth: 0,
      minHeight: 0,
      width: isMobile ? "100%" : undefined,
      marginBottom: isMobile ? 16 : 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      height: isMobile ? 'auto' : isNarrow ? 140 : 160,
      overflow: 'hidden'
    }}>
      <Card>
        <div style={{
          display: "flex",
          flexDirection: "column",
          height: '100%',
          justifyContent: "space-between",
          padding: isMobile ? 12 : isNarrow ? 16 : 24,
          minHeight: 0,
          overflow: 'hidden'
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: 'nowrap', gap: 8, minWidth: 0 }}>
            <span style={{
              wordBreak: 'break-word',
              flex: 1,
              minWidth: 0,
              fontSize: isMobile ? 15 : isNarrow ? 18 : 22,
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 700
            }}>
              {title}
            </span>
            <span style={{ background: iconBg, borderRadius: 8, padding: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon source={icon} />
            </span>
          </div>
          <div style={{ margin: "12px 0 0 0", color, wordBreak: 'break-word', minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontSize: isMobile ? 22 : isNarrow ? 28 : 36,
              fontWeight: 800,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.1
            }}>
              {value}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};