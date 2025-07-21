import { json, type LoaderFunctionArgs, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher, useNavigate } from "@remix-run/react";
import { listScheduledTasks, updateScheduledTaskStatus, deleteScheduledTask } from "../services/scheduledTask.service";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { Page, Card, DataTable, Button, Badge, Text, Modal, Box, InlineStack, Icon, Layout } from "@shopify/polaris";
import { useState } from "react";
import { PlayIcon, PauseCircleIcon, DeleteIcon } from "@shopify/polaris-icons";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import { CalendarIcon } from "@shopify/polaris-icons";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } });
  // Vérification de la période d'essai et du statut d'abonnement
  const now = new Date();
  if (
    shop &&
    ((shop.subscriptionStatus === 'TRIAL' && shop.trialEndDate && now > shop.trialEndDate) ||
      shop.subscriptionStatus === 'EXPIRED' ||
      shop.subscriptionStatus === 'CANCELLED')
  ) {
    return redirect('/app/subscribe');
  }
  if (!shop) throw new Response("Shop not found", { status: 404 });
  const scheduledTasks = await listScheduledTasks(shop.id);
  return json({ scheduledTasks });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const id = formData.get("id") as string;
  if (actionType === "updateStatus") {
    const status = formData.get("status") as string;
    await updateScheduledTaskStatus(id, status);
    return json({ ok: true });
  }
  if (actionType === "delete") {
    await deleteScheduledTask(id);
    return json({ ok: true });
  }
  return json({ ok: false });
};

const statusTones: Record<string, "success" | "attention" | "info" | undefined> = {
  ACTIVE: "success",
  PAUSED: "attention",
  COMPLETED: "info",
};

export default function ScheduledListPage() {
  const { scheduledTasks } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Ajout d'une fonction utilitaire locale pour la traduction de la fréquence
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'hourly': return t('schedule.frequency.hourly', 'Toutes les heures');
      case 'daily': return t('schedule.frequency.daily', 'Quotidien');
      case 'weekly': return t('schedule.frequency.weekly', 'Hebdomadaire');
      case 'monthly': return t('schedule.frequency.monthly', 'Mensuel');
      case 'yearly': return t('schedule.frequency.yearly', 'Annuel');
      default: return frequency;
    }
  };

  const rows = scheduledTasks.map((task: any) => [
    <Text variant="bodyMd" as="span" key="type">{t(`dataType.${task.report?.dataType}`)}</Text>,
    <Text variant="bodyMd" as="span" key="freq">{getFrequencyLabel(task.frequency)}</Text>,
    <Text variant="bodyMd" as="span" key="time">{task.executionTime}</Text>,
    <Badge key="status" tone={statusTones[task.status] || undefined}>{t(`status.${task.status}`)}</Badge>,
    <Text variant="bodyMd" as="span" key="execs">{task.tasks.filter((t: any) => t.status === "COMPLETED").length}</Text>,
    <InlineStack key="actions" gap="200">
      {task.status !== "ACTIVE" && (
        <fetcher.Form method="post">
          <input type="hidden" name="actionType" value="updateStatus" />
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value="ACTIVE" />
          <Button icon={<Icon source={PlayIcon} />} size="slim" submit>{t('actions.activate')}</Button>
        </fetcher.Form>
      )}
      {task.status === "ACTIVE" && (
        <fetcher.Form method="post">
          <input type="hidden" name="actionType" value="updateStatus" />
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value="PAUSED" />
          <Button icon={<Icon source={PauseCircleIcon} />} size="slim" submit>{t('actions.pause')}</Button>
        </fetcher.Form>
      )}
      <Button icon={<Icon source={DeleteIcon} />} size="slim" tone="critical" onClick={() => setDeleteId(task.id)}>{t('actions.delete')}</Button>
    </InlineStack>
  ]);

  return (
    <Page title={t('scheduledList.title')}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <BiSimpleBtn
          title={t('scheduledList.planReport')}
          icon={<Icon source={CalendarIcon} tone="inherit" />}
          onClick={() => navigate("/app/reports/schedule")}
        />
      </div>
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "numeric", "text"]}
          headings={[
            t('scheduledList.type'),
            t('scheduledList.frequency'),
            t('scheduledList.time'),
            t('scheduledList.status'),
            t('scheduledList.executions'),
            t('scheduledList.actions'),
          ]}
          rows={rows}
        />
      </Card>
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('scheduledList.deleteTitle')}
        primaryAction={{
          content: t('actions.delete'),
          destructive: true,
          onAction: () => {
            fetcher.submit({ actionType: "delete", id: deleteId }, { method: "post" });
            setDeleteId(null);
          },
        }}
        secondaryActions={[{ content: t('actions.cancel'), onAction: () => setDeleteId(null) }]}
      >
        <Modal.Section>
          <Text as="span">{t('scheduledList.deleteConfirm')}</Text>
        </Modal.Section>
      </Modal>
      <Layout.Section>
        <Footer />
      </Layout.Section>
    </Page>
  );
} 