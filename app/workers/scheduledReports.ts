import "@shopify/shopify-api/adapters/node";
import "@shopify/shopify-app-remix/adapters/node";
import { prisma } from "../db.server";
import { sendEmail } from "../utils/email.server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import { ShopifyRefundService } from "../models/ShopifyRefund.service";
import { ShopifyTaxService } from "../models/ShopifyTax.service";
import { ReportService } from "../services/report.service";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import type {
  ScheduledTask,
  Report,
  Shop,
} from "@prisma/client";
import type { EmailConfig } from "../types/EmailConfigType";
import {
  formatDate,
  getPeriodForFrequency,
  type Frequency,
} from "../utils/date";

// Create session storage instance
const sessionStorage = new PrismaSessionStorage(prisma);

// Create Shopify API instance
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: process.env.SCOPES?.split(",") || [],
  hostName: process.env.SHOPIFY_APP_URL?.replace(/https?:\/\//, "") || "",
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  sessionStorage,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
    lineItemBilling: true,
    customerAddressDefaultFix: true,
  },
});

// Fonction pour traiter les tâches planifiées
export async function processScheduledTasks() {
  try {
    // 1. Trouver toutes les tâches planifiées actives et arrivées à échéance
    const now = new Date();
    const dueTasks = await prisma.scheduledTask.findMany({
      where: {
        status: "ACTIVE",
        nextRun: { lte: now },
      },
      include: {
        report: true,
        shop: {
          include: {
            fiscalConfig: true,
          },
        },
      },
    });

    console.log(`Tâches planifiées à traiter : ${dueTasks.length}`);

    for (const task of dueTasks) {
      let taskExecution;
      try {
        // 2. Créer un enregistrement d'exécution de tâche
        taskExecution = await prisma.task.create({
          data: {
            scheduledTaskId: task.id,
            shopId: task.shopId,
            reportId: task.reportId,
            status: "PROCESSING",
            scheduledFor: now,
            startedAt: now,
            emailConfig: task.emailConfig,
          },
        });

        // 3. Générer le rapport si nécessaire
        const filePaths = await generateAndSaveReport(task, shopify);

        // 4. Envoyer l'email avec le rapport en pièce jointe
        const emailConfig = JSON.parse(task.emailConfig);
        const attachments = await Promise.all(
          filePaths.map(async (filePath: string) => ({
          filename: filePath.split("/").pop(),
            content: await readFile(filePath),
          })),
        );
        const mail: EmailConfig = {
          ...emailConfig,
          subject:
            emailConfig.subject || `Rapport planifié : ${task.report.fileName}`,
          text:
            emailConfig.text || `Veuillez trouver ci-joint votre rapport planifié.`,
          attachments,
        };
        await sendEmail(mail);

        // 5. Mettre à jour l'exécution de la tâche
        await prisma.task.update({
          where: { id: taskExecution.id },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
          },
        });

        // 6. Mettre à jour la tâche planifiée avec la prochaine exécution
        const nextRun = calculateNextRun(
          task.frequency,
          task.executionDay,
          task.executionTime,
        );
        await prisma.scheduledTask.update({
          where: { id: task.id },
          data: {
            lastRun: now,
            nextRun,
          },
        });
        console.log(`Tâche ${task.id} traitée avec succès.`);
      } catch (error) {
        console.error(
          `Erreur lors du traitement de la tâche planifiée ${task.id} :`,
          error,
        );
        if (taskExecution) {
          await prisma.task.update({
            where: { id: taskExecution.id },
            data: {
              status: "FAILED",
              errorMessage: error instanceof Error ? error.message : String(error),
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Erreur dans processScheduledTasks :", error);
  }
}

// Génère et sauvegarde le rapport si besoin, retourne les chemins des fichiers générés
async function generateAndSaveReport(
  task: ScheduledTask & {
    report: Report;
    shop: Shop & {
      fiscalConfig: any;
    };
  },
  shopifyInstance: any,
): Promise<string[]> {
  // Récupère le rapport et la configuration fiscale liés à la tâche
  const report = task.report;
  const shop = task.shop;
  const fiscalConfig = shop.fiscalConfig;
  const dataTypes = report.dataType.split(",");
  const fileFormat = report.format;
  const exportDir = join(process.cwd(), "exports", shop.id);
  await mkdir(exportDir, { recursive: true });

  // Si le rapport existe déjà (filePath non vide), retourne les fichiers existants
  if (report.filePath) {
    return report.filePath.split(",");
  }

  // Calcule dynamiquement les dates de début et de fin selon la fréquence de la tâche
  let startDate: Date;
  let endDate: Date;

  if (report.startDate && report.endDate) {
    // Utilise les dates fixes si elles existent (génération immédiate)
    startDate = report.startDate;
    endDate = report.endDate;
  } else {
    // Sinon, calcule la période à exporter selon la fréquence (planification)
    const { startDate: start, endDate: end } = getPeriodForFrequency(
      task.frequency as Frequency,
    );
    startDate = start;
    endDate = end;
  }

  // Récupère la session Shopify pour le shop
  const dbSession = await prisma.session.findFirst({
    where: { shop: shop.shopifyDomain },
  });

  if (!dbSession) {
    throw new Error(
      `No session found for shop ${shop.shopifyDomain}. Please reinstall the app.`,
    );
  }

  // Crée une session Shopify avec le bon accessToken
  const session = shopifyInstance.session.customAppSession(shop.shopifyDomain);
  session.accessToken = dbSession.accessToken;

  // Crée le client admin Shopify
  const admin = new shopifyInstance.clients.Graphql({
    session: session,
  });

  let filePaths: string[] = [];
  // Pour chaque type de données à exporter (ventes, clients, etc.)
  for (const dataType of dataTypes) {
    let data = null;
    // Récupère les données Shopify selon le type
    switch (dataType) {
      case "ventes":
        data = await ShopifyOrderService.getOrders(
          admin,
          startDate.toISOString(),
          endDate.toISOString(),
        );
        break;
      case "clients":
        data = await ShopifyCustomerService.getCustomers(
          admin,
          startDate.toISOString(),
          endDate.toISOString(),
        );
        break;
      case "remboursements":
        data = await ShopifyRefundService.getRefunds(
          admin,
          startDate.toISOString(),
          endDate.toISOString(),
        );
        break;
      case "taxes":
        data = await ShopifyTaxService.getTaxes(
          admin,
          startDate.toISOString(),
          endDate.toISOString(),
        );
        break;
    }
    if (!data) continue;
    // Génère le contenu du rapport (CSV, XLSX, etc.)
    const reportContent = ReportService.generateReport(
      data,
      fiscalConfig.code,
      fileFormat,
      dataType,
      fiscalConfig.separator,
    );
    // Génère le nom et le chemin du fichier à sauvegarder
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const fileName = `ledgerxport-${
      fiscalConfig.code
    }-${dataType}-${formattedStartDate}-${formattedEndDate}-${timestamp}.${fileFormat.toLowerCase()}`;
    const filePath = join(exportDir, fileName);
    // Sauvegarde le fichier sur le disque
    await writeFile(filePath, reportContent);
    filePaths.push(filePath);
  }

  // Met à jour le rapport en base avec les chemins des fichiers générés et leur taille totale
  await prisma.report.update({
    where: { id: report.id },
    data: {
      filePath: filePaths.join(","),
      fileSize: filePaths.reduce((total, filePath) => {
        try {
          const stats = require("fs").statSync(filePath);
          return total + stats.size;
        } catch {
          return total;
        }
      }, 0),
      status: "COMPLETED",
    },
  });

  // Retourne la liste des fichiers générés
  return filePaths;
}

// Calcule la prochaine exécution
function calculateNextRun(
  frequency: string,
  executionDay: number,
  executionTime: string,
): Date {
  const now = new Date();
  const [hours, minutes] = executionTime.split(":").map(Number);
  let nextRun = new Date(now);
  nextRun.setHours(hours, minutes, 0, 0);
  switch (frequency) {
    case "daily":
      nextRun.setDate(nextRun.getDate() + 1);
      break;
    case "monthly":
      nextRun.setDate(executionDay);
      nextRun.setMonth(nextRun.getMonth() + 1);
      break;
    case "yearly":
      nextRun.setDate(executionDay);
      nextRun.setMonth(0);
      nextRun.setFullYear(nextRun.getFullYear() + 1);
      break;
  }
  return nextRun;
} 