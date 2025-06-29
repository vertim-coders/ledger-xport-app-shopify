import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  LegacyStack,
  Button,
  Badge,
  DataTable,
  Icon,
  Thumbnail,
  EmptyState,
  Toast,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { ReportStatus } from "@prisma/client";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
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
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
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

  return json({
    successfulExports,
    failedExports,
    recentReports: shop?.reports || [],
    upcomingExports: shop?.scheduledTasks || [],
    monthlyData
  });
};

export default function Dashboard() {
  const { successfulExports, failedExports, recentReports, upcomingExports, monthlyData } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  const handleNewReport = () => {
    navigate("/app/reports/manual-export");
  };

  const handleDownload = async (reportId: string, fileName: string) => {
    if (isDownloading === reportId) return; // Prevent multiple clicks
    
    setIsDownloading(reportId);
    try {
      const downloadUrl = `/api/reports/${reportId}`;
      await downloadFileFromUrl(downloadUrl, fileName);
      setToastMessage("Fichier téléchargé avec succès");
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage("Erreur lors du téléchargement");
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
        setToastMessage("Rapport en cours de régénération");
        setToastError(false);
        setToastActive(true);
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        throw new Error("Failed to retry report");
      }
    } catch (error) {
      console.error('Retry error:', error);
      setToastMessage("Erreur lors de la régénération");
      setToastError(true);
      setToastActive(true);
    }
  };

  const rows = recentReports.map(report => [
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
      Télécharger
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
      case 'daily': return 'Quotidien';
      case 'monthly': return 'Mensuel';
      case 'yearly': return 'Annuel';
      default: return frequency;
    }
  };

  return (
    <Page title="Tableau de bord">
      <Layout>
        {/* Export Statistics */}
        <Layout.Section>
          <Card>
            <LegacyStack distribution="fill">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Text variant="headingLg" as="h1">Exports réussis</Text>
                <div style={{ color: '#007ace' }}>
                  <Text variant="heading2xl" as="p">{successfulExports}</Text>
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Text variant="headingLg" as="h1">Exports échoués</Text>
                <div style={{ color: '#007ace' }}>
                  <Text variant="heading2xl" as="p">{failedExports}</Text>
                </div>
              </div>
            </LegacyStack>
          </Card>
        </Layout.Section>

        {/* New Report Button */}
        <Layout.Section>
          <div style={{ marginBottom: '0px' }}>
            <LegacyStack distribution="fill" spacing="loose">
              <BiSimpleBtn title="Générer un nouveau rapport" onClick={handleNewReport} />
              <BiSimpleBtn title="Rapport personnalisé" onClick={() => navigate("/app/reports/custom")} />
              <BiSimpleBtn title="Planifier un rapport" onClick={() => navigate("/app/reports/schedule")} />
            </LegacyStack>
          </div>
        </Layout.Section>

        {/* Export Statistics Chart */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '20px' }}>
              <Text variant="headingMd" as="h1">Statistiques des exports</Text>
              
              <div style={{ height: '400px', marginTop: '20px' }}>
                {monthlyData && monthlyData.length > 0 ? (
                  <Bar
                    data={{
                      labels: monthlyData.map(item => item.month),
                      datasets: [
                        {
                          label: 'Nombre d\'exports',
                          data: monthlyData.map(item => item.exports),
                          backgroundColor: '#007ace',
                          borderColor: '#007ace',
                          borderWidth: 1,
                          borderRadius: 4,
                          borderSkipped: false,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: '#fff',
                          titleColor: '#637381',
                          bodyColor: '#637381',
                          borderColor: '#c9cccf',
                          borderWidth: 1,
                          cornerRadius: 8,
                          displayColors: false,
                          callbacks: {
                            title: function(context) {
                              return `Mois: ${context[0].label}`;
                            },
                            label: function(context) {
                              return `Exports: ${context.parsed.y}`;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: '#e1e3e5',
                          },
                          ticks: {
                            color: '#637381',
                            font: {
                              size: 12,
                            },
                          },
                          border: {
                            color: '#c9cccf',
                          },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color: '#637381',
                            font: {
                              size: 12,
                            },
                          },
                          border: {
                            color: '#c9cccf',
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    color: '#637381'
                  }}>
                    <Text variant="bodyMd" as="p">Aucune donnée d'export disponible</Text>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Layout.Section>

        {/* Recent Exports */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '20px' }}>
              <Text variant="headingMd" as="h1">Exports récemment générés</Text>
              <DataTable
                columnContentTypes={[
                  'text',
                  'text',
                  'text',
                  'text',
                  'text',
                  'text',
                ]}
                headings={[
                  'Nom du rapport',
                  'Type de rapport',
                  'Créé le',
                  'Mis à jour le',
                  'Type de planification',
                  'Actions',
                ]}
                rows={rows}
              />
            </div>
          </Card>
        </Layout.Section>

        {/* Bottom Section - Recent Failures and Upcoming Exports side by side */}
        <Layout.Section>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Recent Failures */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Card>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text variant="headingMd" as="h1">Échecs récents</Text>
                  </div>
                  {recentReports && recentReports.filter(report => report.status === ReportStatus.ERROR).length > 0 ? (
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
                          ]}
                          headings={[
                            'Nom du rapport',
                            'Type de rapport',
                            'Date d\'échec',
                            'Actions',
                          ]}
                          rows={recentReports
                            .filter(report => report.status === ReportStatus.ERROR)
                            .map(report => [
                              report.fileName,
                              report.type,
                              new Date(report.updatedAt).toLocaleDateString(),
                              <Button onClick={() => handleRetry(report.id)}>
                                Corriger
                              </Button>
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
                        heading="Aucun échec récent"
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjRjU1NTU1Ii8+Cjwvc3ZnPgo="
                      >
                        <p>Tous vos exports ont réussi.</p>
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
                    <Text variant="headingMd" as="h1">Les prochains exports</Text>
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
                          rows={upcomingExports.map(task => {
                            const { date, time } = formatDateTime(task.nextRun);
                            return [
                              task.report.fileName,
                              date,
                              time,
                              getFrequencyLabel(task.frequency),
                              <Button onClick={() => navigate(`/app/reports/schedule?id=${task.id}`)}>
                                Modifier
                              </Button>
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
                        heading="Aucun export planifié"
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjMDA3YWNlIi8+Cjwvc3ZnPgo="
                      >
                        <p>Les exports planifiés apparaîtront ici.</p>
                        <Button onClick={() => navigate("/app/reports/schedule")}>
                          Planifier un export
                        </Button>
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
          <Card>
            <div style={{ padding: '20px' }}>
              <Text variant="headingMd" as="h1">Rapports populaires</Text>
              <LegacyStack distribution="fill">
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDVIMzBWMzVIMFY1Wk0xMiA3VjMzSDI4VjdIMTJaIiBmaWxsPSIjMDA3YWNlIi8+CjxwYXRoIGQ9Ik0xNSAxMEgyNVYxMkgxNVYxMFpNMTUgMTVIMjVWMTdIMTVWMTVaTTE1IDIwSDI1VjIySDE1VjIwWk0xNSAyNUgyNVYyN0gxNVYyNVoiIGZpbGw9IiMwMDdhY2UiLz4KPC9zdmc+Cg==" alt="Ventes" />
                      <div>
                        <Text variant="headingMd" as="h3">Ventes</Text>
                        <Text variant="bodyMd" as="p">Exports des transactions</Text>
                      </div>
                    </LegacyStack>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjRjU1NTU1Ii8+Cjwvc3ZnPgo=" alt="Taxes" />
                      <div>
                        <Text variant="headingMd" as="h3">Taxes</Text>
                        <Text variant="bodyMd" as="p">Déclarations fiscales</Text>
                      </div>
                    </LegacyStack>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjMDA3YWNlIi8+Cjwvc3ZnPgo=" alt="Clients" />
                      <div>
                        <Text variant="headingMd" as="h3">Clients</Text>
                        <Text variant="bodyMd" as="p">Base clients</Text>
                      </div>
                    </LegacyStack>
                  </div>
                </Card>
              </LegacyStack>
            </div>
          </Card>
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