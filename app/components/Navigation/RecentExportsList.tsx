import React from "react";
import { Card, Text, Button, Icon, Divider, Box, Badge, Tooltip, Toast } from "@shopify/polaris";
import { ArrowDownIcon } from "@shopify/polaris-icons";
import { downloadFileFromUrl } from "../../utils/download";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      setToastMessage(t('toast.downloadSuccess'));
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage(t('toast.downloadError'));
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
                <Text as="span" variant="bodyMd" tone="subdued">{t('recentExportsList.noRecentExport')}</Text>
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
                              {exp.type === "scheduled"
                                ? t('status.scheduled')
                                : t('status.success')}
                            </Badge>
                          </span>
                        )}
                      </span>
                      <span style={{ display: "block", marginTop: 2 }}>
                        <Text as="span" variant="bodySm" tone="subdued">
                          {/* TODO: internationaliser la date si besoin */}
                          {new Date(exp.createdAt).toLocaleString()}
                        </Text>
                      </span>
                    </div>
                    <div onClick={e => e.stopPropagation()} style={{ width: isMobile ? "100%" : undefined, marginTop: isMobile ? 8 : 0 }}>
                      {exp.downloadDisabled ? (
                        <Tooltip content={t('recentExportsList.scheduledNotRun')}>
                          <Button
                            icon={<Icon source={ArrowDownIcon} />}
                            disabled
                            accessibilityLabel={t('recentExportsList.downloadDisabled')}
                            fullWidth={isMobile}
                          >
                            {t('actions.download')}
                          </Button>
                        </Tooltip>
                      ) : (
                        <Button
                          icon={<Icon source={ArrowDownIcon} />}
                          variant="primary"
                          accessibilityLabel={t('recentExportsList.downloadLabel', { filename: exp.filename })}
                          fullWidth={isMobile}
                          loading={localDownloading === exp.id || isDownloading === exp.id}
                          disabled={localDownloading === exp.id || isDownloading === exp.id}
                          onClick={() => handleDownload(exp)}
                        >
                          {t('actions.download')}
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
              <Button variant="tertiary" onClick={onSeeAll} fullWidth={isMobile}>{t('actions.seeAll')}</Button>
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