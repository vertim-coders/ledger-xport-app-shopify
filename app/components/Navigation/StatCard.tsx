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
  // Responsive: détecte si mobile
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      borderRadius: 16,
      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
      background: "#fff",
      minWidth: 0,
      minHeight: 0,
      width: isMobile ? "100%" : undefined,
      marginBottom: isMobile ? 16 : 0
    }}>
      <Card padding="0">
        <div style={{ display: "flex", flexDirection: "column", height: isMobile ? 120 : 160, justifyContent: "space-between", padding: isMobile ? 16 : 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Text as="span" variant="bodyMd" fontWeight="medium" tone="subdued">
              {title}
            </Text>
            <span style={{ background: iconBg, borderRadius: 8, padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon source={icon} />
            </span>
          </div>
          <div style={{ margin: "16px 0 0 0", color }}>
            <Text as="span" variant="heading2xl" fontWeight="bold">
              {value}
            </Text>
          </div>
          <div style={{ marginTop: 8 }}>
            <Text as="span" variant="bodySm" tone="subdued">
              {variation}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}; 