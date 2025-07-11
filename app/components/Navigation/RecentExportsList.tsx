import React from "react";
import { Card, Text, Button, Icon, Divider, Box, Badge, Tooltip, Toast } from "@shopify/polaris";
import { ArrowDownIcon } from "@shopify/polaris-icons";
import { downloadFileFromUrl } from "../../utils/download";

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
  onSeeAll?: () => void;
  onView?: (id: string) => void;
  isDownloading?: string | null;
}

export const RecentExportsList: React.FC<RecentExportsListProps> = ({ exports, onSeeAll, onView, isDownloading }) => {
  // Responsive: détecte si mobile
  const [isMobile, setIsMobile] = React.useState(false);
  const [localDownloading, setLocalDownloading] = React.useState<string | null>(null);
  const [toastActive, setToastActive] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastError, setToastError] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownload = async (exportItem: RecentExport) => {
    const downloadingId = exportItem.id;
    if (localDownloading === downloadingId || isDownloading === downloadingId) return; // Prevent multiple clicks
    
    setLocalDownloading(downloadingId);
    try {
      await downloadFileFromUrl(exportItem.downloadUrl, exportItem.filename);
      setToastMessage("Fichier téléchargé avec succès");
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage("Erreur lors du téléchargement");
      setToastError(true);
      setToastActive(true);
    } finally {
      setLocalDownloading(null);
    }
  };

  return (
    <>
      <div style={{ borderRadius: 16, boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)", background: "#fff", width: "100%", overflowX: isMobile ? "auto" : undefined }}>
        <Card padding="0">
          {/* Supprimer le titre ici, il sera géré par le parent */}
          {/* <Box paddingBlock={isMobile ? "200" : "400"} paddingInline={isMobile ? "200" : "400"}>
            <Text variant="headingMd" as="h2" fontWeight="bold">
              Exports récemment générés
            </Text>
          </Box> */}
          <Divider />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {exports.length === 0 && (
              <Box paddingBlock={isMobile ? "200" : "400"} paddingInline={isMobile ? "200" : "400"}>
                <Text as="span" variant="bodyMd" tone="subdued">Aucun export récent</Text>
              </Box>
            )}
            {exports.map((exp, idx) => (
              <React.Fragment key={exp.id}>
                <Box paddingBlock={isMobile ? "200" : "300"} paddingInline={isMobile ? "200" : "400"}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "flex-start" : "center",
                      justifyContent: "space-between",
                      gap: 16,
                      borderRadius: 8,
                      transition: "background 0.15s",
                      cursor: onView ? "pointer" : undefined,
                      width: "100%"
                    }}
                    onClick={onView ? () => onView(exp.id) : undefined}
                    onMouseOver={e => {
                      if (onView) e.currentTarget.style.background = "#F6F7F9";
                    }}
                    onMouseOut={e => {
                      if (onView) e.currentTarget.style.background = "";
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", width: isMobile ? "100%" : undefined }}>
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
                    <div onClick={e => e.stopPropagation()} style={{ width: isMobile ? "100%" : undefined, marginTop: isMobile ? 8 : 0 }}>
                      {exp.downloadDisabled ? (
                        <Tooltip content="Ce rapport planifié n'a pas encore été exécuté.">
                          <Button
                            icon={<Icon source={ArrowDownIcon} />}
                            disabled
                            accessibilityLabel={`Téléchargement désactivé`}
                            fullWidth={isMobile}
                          >
                            Télécharger
                          </Button>
                        </Tooltip>
                      ) : (
                        <Button
                          icon={<Icon source={ArrowDownIcon} />}
                          variant="primary"
                          accessibilityLabel={`Télécharger ${exp.filename}`}
                          fullWidth={isMobile}
                          loading={localDownloading === exp.id || isDownloading === exp.id}
                          disabled={localDownloading === exp.id || isDownloading === exp.id}
                          onClick={() => handleDownload(exp)}
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
          <Box paddingBlock={isMobile ? "200" : "300"} paddingInline={isMobile ? "200" : "400"}>
            <div style={{ textAlign: "center" }}>
              <Button variant="tertiary" onClick={onSeeAll} fullWidth={isMobile}>Voir tout</Button>
            </div>
          </Box>
        </Card>
      </div>
      
      {toastActive && (
        <Toast
          content={toastMessage}
          error={toastError}
          onDismiss={() => setToastActive(false)}
        />
      )}
    </>
  );
}; 