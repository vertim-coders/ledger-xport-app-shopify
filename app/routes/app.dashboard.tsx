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
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { ReportStatus } from "@prisma/client";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";

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

  return json({
    successfulExports,
    failedExports,
    recentReports: shop?.reports || [],
    upcomingExports: shop?.scheduledTasks || []
  });
};

export default function Dashboard() {
  const { successfulExports, failedExports, recentReports, upcomingExports } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleNewReport = () => {
    navigate("/app/reports/manual-export");
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
      onClick={() => {/* TODO: Implement download */}}
      disabled={report.status !== ReportStatus.COMPLETED}
      icon="download"
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
                <Text variant="headingLg" as="h2">Exports réussis</Text>
                <Text variant="heading2xl" as="p">{successfulExports}</Text>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Text variant="headingLg" as="h2">Exports échoués</Text>
                <Text variant="heading2xl" as="p">{failedExports}</Text>
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

        {/* Recent Exports */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '20px' }}>
              <Text variant="headingMd" as="h2">Exports récemment générés</Text>
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
                <div style={{ 
                  padding: '20px',
                  height: '400px',
                  overflowY: 'auto',
                  overflowX: 'auto'
                }}>
                  <div style={{ minWidth: '600px' }}>
                    <Text variant="headingMd" as="h2">Échecs récents</Text>
                    {recentReports && recentReports.filter(report => report.status === ReportStatus.ERROR).length > 0 ? (
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
                            <Button onClick={() => {/* TODO: Implement retry */}}>
                              Corriger
                            </Button>
                          ])}
                      />
                    ) : (
                      <EmptyState
                        heading="Aucun échec récent"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <p>Tous vos exports ont réussi.</p>
                      </EmptyState>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Upcoming Exports */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Card>
                <div style={{ 
                  padding: '20px',
                  height: '400px',
                  overflowY: 'auto',
                  overflowX: 'auto'
                }}>
                  <div style={{ minWidth: '600px' }}>
                    <Text variant="headingMd" as="h2">Les prochains exports</Text>
                    {upcomingExports && upcomingExports.length > 0 ? (
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
                    ) : (
                      <EmptyState
                        heading="Aucun export planifié"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <p>Les exports planifiés apparaîtront ici.</p>
                        <Button onClick={() => navigate("/app/reports/schedule")}>
                          Planifier un export
                        </Button>
                      </EmptyState>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Layout.Section>

        {/* Popular Reports */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '20px' }}>
              <Text variant="headingMd" as="h2">Rapports populaires</Text>
              <LegacyStack distribution="fill">
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" alt="Ventes" />
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
                      <Thumbnail source="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" alt="Taxes" />
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
                      <Thumbnail source="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" alt="Clients" />
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
    </Page>
  );
} 