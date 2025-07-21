import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button as PolarisButton,
  Button,
  DataTable,
  Icon,
  EmptyState,
  Toast,
  Modal,
  BlockStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import type { ReportStatus as ReportStatusType } from "@prisma/client";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import Footer from '../components/Footer';
import { requireFiscalConfigOrRedirect } from "../utils/requireFiscalConfig.server";

// Import sécurisé de ReportStatus
const ReportStatus = {
  PENDING: "PENDING" as const,
  PROCESSING: "PROCESSING" as const,
  COMPLETED: "COMPLETED" as const,
  COMPLETED_WITH_EMPTY_DATA: "COMPLETED_WITH_EMPTY_DATA" as const,
  ERROR: "ERROR" as const
};
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import { PlusIcon, OrderIcon, CalendarIcon, EditIcon } from "@shopify/polaris-icons";
import { downloadFileFromUrl } from "../utils/download";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import { StatCard } from "../components/Navigation/StatCard";
import {
  CheckIcon,
  XCircleIcon,
  ProfileIcon,
  CashDollarIcon,
} from "@shopify/polaris-icons";
import { MonthlyReportsChart } from "../components/Navigation/MonthlyReportsChart";
import { RecentExportsList } from "../components/Navigation/RecentExportsList";
import FeedbackSection from "../components/FeedbackSection";
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: {
      reports: {
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      scheduledTasks: {
        where: {
          status: "ACTIVE",
          nextRun: {
            gt: new Date()
          }
        },
        include: {
          report: true
        },
        orderBy: {
          nextRun: 'asc'
        },
        take: 5
      }
    }
  });

  // Vérification de la config fiscale obligatoire
  if (!shop?.id) {
    return requireFiscalConfigOrRedirect("");
  }
  const redirectIfNoConfig = await requireFiscalConfigOrRedirect(shop.id);
  if (redirectIfNoConfig) return redirectIfNoConfig;

  // Get successful and failed exports count
  const successfulExports = await prisma.report.count({
    where: {
      shopId: shop?.id,
      status: ReportStatus.COMPLETED
    }
  });

  const failedExports = await prisma.report.count({
    where: {
      shopId: shop?.id,
      status: ReportStatus.ERROR
    }
  });

  // Get exports statistics for the last 6 months
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1); // 6 months ago

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Initialize monthly data array for the last 6 months
  const monthlyData = [];
  
  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const monthEnd = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0); // Last day of the month

    const monthExports = await prisma.report.count({
      where: {
        shopId: shop?.id,
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        }
      }
    });

    monthlyData.push({
      month: monthNames[targetDate.getMonth()],
      exports: Number(monthExports) || 0
    });
  }

  // --- Récupération dynamique Shopify ---
  // Plage : 1er janvier de l’année en cours à aujourd’hui
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const startDate = yearStart.toISOString();
  const endDate = currentDate.toISOString();

  // Nombre de clients
  let customersCount = 0;
  try {
    const customers = await ShopifyCustomerService.getCustomers(admin, startDate, endDate);
    customersCount = Array.isArray(customers) ? customers.length : 0;
  } catch (e) {
    customersCount = 0;
  }

  // Revenu total
  let totalRevenue = 0;
  try {
    const orders = await ShopifyOrderService.getOrders(admin, startDate, endDate);
    if (Array.isArray(orders)) {
      totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total_price) || 0), 0);
    }
  } catch (e) {
    totalRevenue = 0;
  }

  return json({
    successfulExports,
    failedExports,
    customersCount,
    totalRevenue,
    recentReports: shop?.reports || [],
    upcomingExports: shop?.scheduledTasks || [],
    monthlyData
  });
};

// Type pour les données du loader
interface DashboardLoaderData {
  successfulExports: number;
  failedExports: number;
  customersCount: number;
  totalRevenue: number;
  recentReports: any[];
  upcomingExports: any[];
  monthlyData: { month: string; exports: number }[];
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { successfulExports, failedExports, customersCount, totalRevenue, recentReports, upcomingExports, monthlyData } = useLoaderData<DashboardLoaderData>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [isVeryNarrow, setIsVeryNarrow] = useState(false);
  const [isTwoCol, setIsTwoCol] = useState(false);
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 900);
      setIsNarrow(window.innerWidth <= 1366);
      setIsVeryNarrow(window.innerWidth <= 600);
      setIsTwoCol(window.innerWidth <= 1140 && window.innerWidth > 600);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNewReport = () => {
    navigate("/app/reports/manual-export");
  };

  const handleDownload = async (reportId: string, fileName: string) => {
    if (isDownloading === reportId) return; // Prevent multiple clicks
    
    setIsDownloading(reportId);
    try {
      const downloadUrl = `/api/reports/${reportId}`;
      await downloadFileFromUrl(downloadUrl, fileName);
      setToastMessage(t('toast.downloadSuccess', 'Fichier téléchargé avec succès'));
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage(t('toast.downloadError', 'Erreur lors du téléchargement'));
      setToastError(true);
      setToastActive(true);
    } finally {
      setIsDownloading(null);
    }
  };

  const handleRetry = async (reportId: string) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "action=retry",
      });

      if (response.ok) {
        setToastMessage(t('toast.retrying', 'Rapport en cours de régénération'));
        setToastError(false);
        setToastActive(true);
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        throw new Error("Failed to retry report");
      }
    } catch (error) {
      console.error('Retry error:', error);
      setToastMessage(t('toast.retryError', 'Erreur lors de la régénération'));
      setToastError(true);
      setToastActive(true);
    }
  };

  const handleCustomReport = () => {
    navigate("/app/reports/custom-ai");
  };

  const rows = recentReports.map((report: any) => [
    <div 
      style={{ cursor: 'pointer' }} 
      onClick={() => navigate(`/app/reports/view/${report.id}`)}
    >
      {report.fileName}
    </div>,
    report.type,
    new Date(report.createdAt).toLocaleDateString(),
    new Date(report.updatedAt).toLocaleDateString(),
    report.status === ReportStatus.ERROR ? 'Échec' : 'Manuel',
    <Button
      onClick={() => handleDownload(report.id, report.fileName)}
      disabled={report.status !== ReportStatus.COMPLETED || isDownloading === report.id}
      icon="download"
      loading={isDownloading === report.id}
    >
      {t('action.download', 'Télécharger')}
    </Button>
  ]);

  // Format date and time for display
  const formatDateTime = (date: string | Date) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString('fr-FR'),
      time: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  // Get frequency label in French
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'hourly': return 'Toutes les heures';
      case 'daily': return 'Quotidien';
      case 'monthly': return 'Mensuel';
      case 'yearly': return 'Annuel';
      default: return frequency;
    }
  };

  return (
    <Page title={t('page.dashboard.title', 'Tableau de bord')}>
      <Layout>
        {/* Export Statistics */}
        <Layout.Section>
          <div style={{
            display: "grid",
            gridTemplateColumns: isVeryNarrow
              ? "1fr"
              : isTwoCol
              ? "1fr 1fr"
              : isNarrow
              ? "1fr 1fr"
              : "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 20,
            width: "100%"
          }}>
            <StatCard
              title={t('stats.totalExports', 'Total des exports')}
              value={successfulExports}
              icon={CheckIcon}
              iconBg="#E6F7F1"
              color="#009A6B"
            />
            <StatCard
              title={t('stats.failedExports', 'Exports échoués')}
              value={failedExports}
              icon={XCircleIcon}
              iconBg="#FFF4E6"
              color="#FF8A65"
            />
            <StatCard
              title={t('stats.customers', 'Clients')}
              value={customersCount}
              icon={ProfileIcon}
              iconBg="#E6F0FF"
              color="#0066FF"
            />
            <StatCard
              title={t('stats.revenue', 'Revenus')}
              value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              icon={CashDollarIcon}
              iconBg="#E6F0FF"
              color="#0066FF"
            />
          </div>
        </Layout.Section>

        {/* New Report Button */}
        <Layout.Section>
          <div
            style={{
              marginBottom: '0px',
              display: 'flex',
              flexDirection: isVeryNarrow ? 'column' : 'row',
              gap: isVeryNarrow ? 12 : 32,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              overflowX: isVeryNarrow ? undefined : 'auto',
              flexWrap: isVeryNarrow ? 'nowrap' : 'wrap',
              minWidth: 0
            }}
          >
            <BiSimpleBtn 
              title={t('action.newReport', 'Générer un nouveau rapport')}
              icon={<Icon source={OrderIcon} tone="inherit" />}
              onClick={handleNewReport} 
            />
            <BiSimpleBtn
              title={t('action.scheduleReport', 'Planifier un rapport')}
              icon={<Icon source={CalendarIcon} tone="inherit" />}
              onClick={() => navigate("/app/reports/schedule")}
            />
            <BiSimpleBtn
              title={t('action.customReport', 'Rapport personnalisé')}
              icon={<Icon source={EditIcon} tone="inherit" />}
              onClick={handleCustomReport}
            />
          </div>
        </Layout.Section>

        {/* Export Statistics Chart + Recent Exports side by side */}
        <Layout.Section>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexDirection: isMobile ? 'column' : 'row',
              width: '100%',
              alignItems: 'stretch',
              minHeight: 0,
            }}
          >
            {/* Statistiques des exports */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
              <Card>
                <div style={{ marginBottom: 16, padding: 20 }}>
                  <Text variant="headingMd" as="h1">{t('dashboard.exportStats', 'Statistiques des exports')}</Text>
          </div>
                <div style={{ padding: 20, paddingTop: 0 }}>
          <MonthlyReportsChart data={monthlyData.map((item: { month: string; exports: number }) => ({ month: item.month, reports: item.exports }))} />
                </div>
              </Card>
            </div>
            {/* Exports récemment générés */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
              <Card>
                <div style={{ marginBottom: 16, padding: 20 }}>
                  <Text variant="headingMd" as="h1">{t('dashboard.recentReports', 'Rapports récemment générés')}</Text>
                </div>
                <div style={{ padding: 20, paddingTop: 0 }}>
          <RecentExportsList
            exports={recentReports.slice(0, 5).map((r: any) => ({
              id: r.id,
              filename: r.fileName || r.type || "Export",
              createdAt: r.createdAt,
              downloadUrl: `/api/reports/${r.id}`,
              type: r.type,
              status: r.status,
              typeLabel: r.type === "scheduled" ? "Planifié" : "Généré",
              downloadDisabled: r.type === "scheduled" && r.status !== "COMPLETED"
            }))}
                    onSeeAll={() => navigate("/app/reports/history")}
            onView={(id: string) => navigate(`/app/reports/view/${id}`)}
          />
                </div>
              </Card>
            </div>
          </div>
        </Layout.Section>

        {/* Bottom Section - Recent Failures and Upcoming Exports side by side */}
        <Layout.Section>
          <div style={{ display: 'flex', gap: '16px', flexDirection: isMobile ? 'column' : 'row', width: '100%' }}>
            {/* Recent Failures */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Card>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text variant="headingMd" as="h1">{t('dashboard.recentFailures', 'Échecs récents')}</Text>
                  </div>
                  {recentReports && recentReports.filter((report: any) => report.status === ReportStatus.ERROR).length > 0 ? (
                    <div style={{ 
                      height: '300px',
                      overflowY: 'auto',
                      overflowX: 'auto',
                      width: '100%'
                    }}>
                      <div style={{ minWidth: isMobile ? '400px' : '600px' }}>
                        <DataTable
                          columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'text',
                          ]}
                          headings={[
                            'Nom du rapport',
                            'Type de rapport',
                            'Date d\'échec',
                            'Actions',
                          ]}
                          rows={recentReports
                            .filter((report: any) => report.status === ReportStatus.ERROR)
                            .map((report: any) => [
                              <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/app/reports/view/${report.id}`)}>{report.fileName}</div>,
                              report.type,
                              new Date(report.updatedAt).toLocaleDateString(),
                              <Button onClick={() => handleRetry(report.id)} icon="refresh">{t('action.retry', 'Réessayer')}</Button>
                            ])}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '300px'
                    }}>
                      <EmptyState
                        heading={t('dashboard.noFailures', 'Aucun échec récent')}
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjRjU1NTU1Ii8+Cjwvc3ZnPgo="
                      >
                        <p>{t('dashboard.noFailuresDesc', 'Tous vos exports ont réussi.')}</p>
                      </EmptyState>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Upcoming Exports */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Card>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text variant="headingMd" as="h1">{t('dashboard.upcomingExports', 'Les prochains exports')}</Text>
                  </div>
                  {upcomingExports && upcomingExports.length > 0 ? (
                    <div style={{ 
                      height: '300px',
                      overflowY: 'auto',
                      overflowX: 'auto'
                    }}>
                      <div style={{ minWidth: '600px' }}>
                        <DataTable
                          columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'text',
                            'text',
                          ]}
                          headings={[
                            'Nom du rapport',
                            'Date',
                            'Heure',
                            'Fréquence',
                            'Actions',
                          ]}
                          rows={upcomingExports.map((task: any) => {
                            const { date, time } = formatDateTime(task.nextRun);
                            return [
                              task.report.fileName,
                              date,
                              time,
                              getFrequencyLabel(task.frequency),
                              <PolarisButton onClick={() => navigate(`/app/reports/schedule?id=${task.id}`)}>
                                {t('action.modify', 'Modifier')}
                              </PolarisButton>
                            ];
                          })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '300px'
                    }}>
                      <EmptyState
                        heading={t('dashboard.noScheduled', 'Aucun export planifié')}
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjMDA3YWNlIi8+Cjwvc3ZnPgo="
                      >
                        <p>{t('dashboard.noScheduledDesc', 'Les exports planifiés apparaîtront ici.')}</p>
                        <PolarisButton onClick={() => navigate("/app/reports/schedule")}>
                          {t('dashboard.scheduleExport', 'Planifier un export')}
                        </PolarisButton>
                      </EmptyState>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Layout.Section>

        {/* Popular Reports */}
        <Layout.Section>
          <FeedbackSection />
        </Layout.Section>
        <Layout.Section>
          <Footer />
        </Layout.Section>
      </Layout>
      {toastActive && (
        <Toast
          content={toastMessage}
          onDismiss={() => setToastActive(false)}
          error={toastError}
        />
      )}
    </Page>
  );
} 