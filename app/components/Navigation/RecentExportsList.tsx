import React from "react";
import { Card, Text, Button, Icon, Divider, Box, Badge, Tooltip } from "@shopify/polaris";
import { ArrowDownIcon } from "@shopify/polaris-icons";

export interface RecentExport {
  id: string;
  filename: string;
  createdAt: string;
  downloadUrl: string;
  type?: string;
  status?: string;
  typeLabel?: string;
  downloadDisabled?: boolean;
}

interface RecentExportsListProps {
  exports: RecentExport[];
  onDownload?: (id: string, url: string) => void;
  onSeeAll?: () => void;
  onView?: (id: string) => void;
  isDownloading?: string | null;
}

export const RecentExportsList: React.FC<RecentExportsListProps> = ({ exports, onDownload, onSeeAll, onView, isDownloading }) => {
  return (
    <div style={{ borderRadius: 16, boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)", background: "#fff" }}>
      <Card padding="0">
        <Box paddingBlock="400" paddingInline="400">
          <Text variant="headingMd" as="h2" fontWeight="bold">
            Exports récemment générés
          </Text>
        </Box>
        <Divider />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {exports.length === 0 && (
            <Box paddingBlock="400" paddingInline="400">
              <Text as="span" variant="bodyMd" tone="subdued">Aucun export récent</Text>
            </Box>
          )}
          {exports.map((exp, idx) => (
            <React.Fragment key={exp.id}>
              <Box paddingBlock="300" paddingInline="400">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    borderRadius: 8,
                    transition: "background 0.15s",
                    cursor: onView ? "pointer" : undefined,
                  }}
                  onClick={onView ? () => onView(exp.id) : undefined}
                  onMouseOver={e => {
                    if (onView) e.currentTarget.style.background = "#F6F7F9";
                  }}
                  onMouseOut={e => {
                    if (onView) e.currentTarget.style.background = "";
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text as="span" variant="bodyMd" fontWeight="medium">
                          {exp.filename}
                        </Text>
                      </span>
                      {exp.typeLabel && (
                        <span style={{ marginLeft: 10 }}>
                          <Badge tone={exp.type === "scheduled" ? "info" : "success"}>
                            {exp.typeLabel}
                          </Badge>
                        </span>
                      )}
                    </span>
                    <span style={{ display: "block", marginTop: 2 }}>
                      <Text as="span" variant="bodySm" tone="subdued">
                        {new Date(exp.createdAt).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                      </Text>
                    </span>
                  </div>
                  <div onClick={e => e.stopPropagation()}>
                    {exp.downloadDisabled ? (
                      <Tooltip content="Ce rapport planifié n'a pas encore été exécuté.">
                        <Button
                          icon={<Icon source={ArrowDownIcon} />}
                          disabled
                          accessibilityLabel={`Téléchargement désactivé`}
                        >
                          Télécharger
                        </Button>
                      </Tooltip>
                    ) : (
                      <Button
                        icon={<Icon source={ArrowDownIcon} />}
                        variant="primary"
                        accessibilityLabel={`Télécharger ${exp.filename}`}
                        onClick={() => onDownload?.(exp.id, exp.downloadUrl)}
                        loading={isDownloading === exp.id}
                        disabled={isDownloading === exp.id}
                      >
                        Télécharger
                      </Button>
                    )}
                  </div>
                </div>
              </Box>
              {idx < exports.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
        <Divider />
        <Box paddingBlock="300" paddingInline="400">
          <div style={{ textAlign: "center" }}>
            <Button variant="tertiary" onClick={onSeeAll}>Voir tout</Button>
          </div>
        </Box>
      </Card>
    </div>
  );
}; 