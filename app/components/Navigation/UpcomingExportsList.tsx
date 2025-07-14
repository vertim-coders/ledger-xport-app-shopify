import React from "react";
import { Card, Text, Icon, Divider, Box, Button } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import { useTranslation } from "react-i18next";

export interface UpcomingExport {
  id: string;
  name: string;
  scheduledAt: string;
}

interface UpcomingExportsListProps {
  exports: UpcomingExport[];
  onPlan?: () => void;
}

export const UpcomingExportsList: React.FC<UpcomingExportsListProps> = ({ exports, onPlan }) => {
  const { t } = useTranslation();
  return (
    <div style={{ borderRadius: 16, boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)", background: "#fff", minHeight: 240 }}>
      <Card padding="0">
        <Box paddingBlock="400" paddingInline="400">
          <Text variant="headingMd" as="h2" fontWeight="bold">
            {t('upcomingExportsList.title')}
          </Text>
        </Box>
        <Divider />
        {exports.length === 0 ? (
          <Box paddingBlock="600" paddingInline="400">
            <div style={{ textAlign: "center" }}>
              <Icon source={CalendarIcon} tone="subdued" />
              <span style={{ display: "block", marginTop: 12 }}>
                <Text as="span" variant="bodyMd" fontWeight="medium">
                  {t('upcomingExportsList.noScheduledExport')}
                </Text>
              </span>
              <span style={{ display: "block" }}>
                <Text as="span" variant="bodySm" tone="subdued">
                  {t('upcomingExportsList.scheduledWillAppear')}
                </Text>
              </span>
              <div style={{ marginTop: 20 }}>
                <span style={{ background: "#111", borderRadius: 8, display: "inline-block" }}>
                  <Button variant="primary" onClick={onPlan}>
                    {t('upcomingExportsList.planExport')}
                  </Button>
                </span>
              </div>
            </div>
          </Box>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {exports.slice(0, 5).map((exp, idx) => (
              <React.Fragment key={exp.id}>
                <Box paddingBlock="300" paddingInline="400">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon source={CalendarIcon} tone="info" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                        <Text as="span" variant="bodyMd" fontWeight="medium">
                          {exp.name}
                        </Text>
                      </span>
                      <span style={{ display: "block", marginTop: 2 }}>
                        <Text as="span" variant="bodySm" tone="subdued">
                          {/* TODO: internationaliser la date si besoin */}
                          {new Date(exp.scheduledAt).toLocaleString()}
                        </Text>
                      </span>
                    </div>
                    <span style={{ background: "#000000", borderRadius: 8, display: "inline-block" }}>
                      <Button variant="primary">
                        {t('actions.edit')}
                      </Button>
                    </span>
                  </div>
                </Box>
                {idx < exports.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}; 