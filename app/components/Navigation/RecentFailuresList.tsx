import React from "react";
import { Card, Text, Icon, Divider, Box } from "@shopify/polaris";
import { AlertCircleIcon, CheckIcon } from "@shopify/polaris-icons";

export interface RecentFailure {
  id: string;
  filename: string;
  failedAt: string;
}

interface RecentFailuresListProps {
  failures: RecentFailure[];
}

export const RecentFailuresList: React.FC<RecentFailuresListProps> = ({ failures }) => {
  return (
    <div style={{ borderRadius: 16, boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)", background: "#fff", minHeight: 240 }}>
      <Card padding="0">
        <Box paddingBlock="400" paddingInline="400">
          <Text variant="headingMd" as="h2" fontWeight="bold">
            Échecs récents
          </Text>
        </Box>
        <Divider />
        {failures.length === 0 ? (
          <Box paddingBlock="600" paddingInline="400">
            <div style={{ textAlign: "center" }}>
              <Icon source={CheckIcon} tone="success" />
              <span style={{ display: "block", marginTop: 12 }}>
                <Text as="span" variant="bodyMd" fontWeight="medium">
                  Aucun échec récent
                </Text>
              </span>
              <span style={{ display: "block" }}>
                <Text as="span" variant="bodySm" tone="subdued">
                  Tous vos exports ont réussi.
                </Text>
              </span>
            </div>
          </Box>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {failures.slice(0, 5).map((fail, idx) => (
              <React.Fragment key={fail.id}>
                <Box paddingBlock="300" paddingInline="400">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, borderLeft: "4px solid #FF8A65", paddingLeft: 12 }}>
                    <Icon source={AlertCircleIcon} tone="critical" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                        <Text as="span" variant="bodyMd" fontWeight="medium">
                          {fail.filename}
                        </Text>
                      </span>
                      <span style={{ display: "block", marginTop: 2 }}>
                        <Text as="span" variant="bodySm" tone="subdued">
                          {new Date(fail.failedAt).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                        </Text>
                      </span>
                    </div>
                  </div>
                </Box>
                {idx < failures.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}; 