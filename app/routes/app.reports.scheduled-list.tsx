import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { listScheduledTasks, updateScheduledTaskStatus, deleteScheduledTask } from "../services/scheduledTask.service";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { Page, Card, DataTable, Button, Badge, Text, Modal, Box, InlineStack, Icon } from "@shopify/polaris";
import { useState } from "react";
import { PlayIcon, PauseCircleIcon, DeleteIcon } from "@shopify/polaris-icons";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import { CalendarIcon } from "@shopify/polaris-icons";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } });
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

  const rows = scheduledTasks.map((task: any) => [
    <Text variant="bodyMd" as="span" key="type">{task.report?.dataType}</Text>,
    <Text variant="bodyMd" as="span" key="freq">{task.frequency}</Text>,
    <Text variant="bodyMd" as="span" key="time">{task.executionTime}</Text>,
    <Badge key="status" tone={statusTones[task.status] || undefined}>{task.status}</Badge>,
    <Text variant="bodyMd" as="span" key="execs">{task.tasks.filter((t: any) => t.status === "COMPLETED").length}</Text>,
    <InlineStack key="actions" gap="200">
      {task.status !== "ACTIVE" && (
        <fetcher.Form method="post">
          <input type="hidden" name="actionType" value="updateStatus" />
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value="ACTIVE" />
          <Button icon={<Icon source={PlayIcon} />} size="slim" submit>Activer</Button>
        </fetcher.Form>
      )}
      {task.status === "ACTIVE" && (
        <fetcher.Form method="post">
          <input type="hidden" name="actionType" value="updateStatus" />
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="status" value="PAUSED" />
          <Button icon={<Icon source={PauseCircleIcon} />} size="slim" submit>Pause</Button>
        </fetcher.Form>
      )}
      <Button icon={<Icon source={DeleteIcon} />} size="slim" tone="critical" onClick={() => setDeleteId(task.id)}>Supprimer</Button>
    </InlineStack>
  ]);

  return (
    <Page title="Plannifications programmées">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <BiSimpleBtn
          title="Planifier un rapport"
          icon={<Icon source={CalendarIcon} tone="inherit" />}
          onClick={() => window.location.assign('/app/reports/schedule')}
        />
      </div>
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "numeric", "text"]}
          headings={["Type", "Fréquence", "Heure", "Statut", "Exécutions", "Actions"]}
          rows={rows}
        />
      </Card>
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Supprimer la plannification ?"
        primaryAction={{
          content: "Supprimer",
          destructive: true,
          onAction: () => {
            fetcher.submit({ actionType: "delete", id: deleteId }, { method: "post" });
            setDeleteId(null);
          },
        }}
        secondaryActions={[{ content: "Annuler", onAction: () => setDeleteId(null) }]}
      >
        <Modal.Section>
          <Text as="span">Êtes-vous sûr de vouloir supprimer cette plannification ? Cette action est irréversible.</Text>
        </Modal.Section>
      </Modal>
    </Page>
  );
} 