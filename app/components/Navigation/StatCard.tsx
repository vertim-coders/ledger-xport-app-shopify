import { Card, Text, Icon } from "@shopify/polaris";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  variation: string;
  icon: any;
  iconBg?: string; // couleur de fond de l’icône
  color?: string; // couleur principale (texte)
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, variation, icon, iconBg = "#E6F0FF", color = "#0066FF" }) => {
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
      height: isMobile ? 'auto' : isNarrow ? 140 : 160
    }}>
      <Card padding="0">
        <div style={{
          display: "flex",
          flexDirection: "column",
          height: '100%',
          justifyContent: "space-between",
          padding: isMobile ? 12 : isNarrow ? 16 : 24,
          minHeight: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: 'wrap', gap: 8 }}>
            <span style={{ wordBreak: 'break-word', flex: 1 }}>
              <Text as="span" variant="bodyMd" fontWeight="medium" tone="subdued">
                {title}
              </Text>
            </span>
            <span style={{ background: iconBg, borderRadius: 8, padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon source={icon} />
            </span>
          </div>
          <div style={{ margin: "12px 0 0 0", color, wordBreak: 'break-word' }}>
            <Text as="span" variant="heading2xl" fontWeight="bold">
              {value}
            </Text>
          </div>
          <div style={{ marginTop: 8, minHeight: 0 }}>
            <span style={{ wordBreak: 'break-word', whiteSpace: 'normal', display: 'block' }}>
              <Text as="span" variant="bodySm" tone="subdued">
                {variation}
              </Text>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}; 