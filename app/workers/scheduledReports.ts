import { prisma } from "../db.server";
import { sendEmail } from "../utils/email.server";
import { readFile } from "fs/promises";
import { join } from "path";

// Function to process scheduled tasks
export async function processScheduledTasks() {
  try {
    // Find all active scheduled tasks that are due
    const now = new Date();
    const dueTasks = await prisma.scheduledTask.findMany({
      where: {
        status: "ACTIVE",
        nextRun: {
          lte: now
        }
      },
      include: {
        report: true,
        shop: true
      }
    });

    console.log(`Found ${dueTasks.length} due tasks to process`);

    for (const task of dueTasks) {
      let taskExecution;
      try {
        // Create a new task execution record
        taskExecution = await prisma.task.create({
          data: {
            scheduledTaskId: task.id,
            shopId: task.shopId,
            reportId: task.reportId,
            status: "PROCESSING",
            scheduledFor: now,
            startedAt: now,
            emailConfig: task.emailConfig
          }
        });

        console.log(`Processing task ${task.id} with execution ${taskExecution.id}`);

        // Generate the report
        const reportContent = await generateReport(task);
        
        // Send the email
        const emailConfig = JSON.parse(task.emailConfig);
        await sendEmail({
          to: emailConfig.to,
          cc: emailConfig.cc,
          bcc: emailConfig.bcc,
          replyTo: emailConfig.replyTo,
          subject: `Rapport planifié: ${task.report.fileName}`,
          text: `Veuillez trouver ci-joint votre rapport planifié.`,
          attachments: [{
            filename: task.report.fileName,
            content: reportContent
          }]
        });

        // Update task execution record
        await prisma.task.update({
          where: { id: taskExecution.id },
          data: {
            status: "COMPLETED",
            completedAt: new Date()
          }
        });

        // Update scheduled task with next run time
        const nextRun = calculateNextRun(
          task.frequency,
          task.executionDay,
          task.executionTime
        );

        await prisma.scheduledTask.update({
          where: { id: task.id },
          data: {
            lastRun: now,
            nextRun
          }
        });

        console.log(`Successfully processed task ${task.id}`);

      } catch (error) {
        console.error(`Error processing scheduled task ${task.id}:`, error);
        
        if (taskExecution) {
          // Update task execution record with error
          await prisma.task.update({
            where: { id: taskExecution.id },
            data: {
              status: "FAILED",
              errorMessage: error instanceof Error ? error.message : String(error)
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error in processScheduledTasks:', error);
  }
}

// Helper function to generate report
async function generateReport(task: any) {
  // Read the report file
  const filePath = task.report.filePath;
  if (!filePath) {
    throw new Error('Report file path not found');
  }

  return await readFile(filePath);
}

// Helper function to calculate next run time
function calculateNextRun(frequency: string, executionDay: number, executionTime: string): Date {
  const now = new Date();
  const [hours, minutes] = executionTime.split(':').map(Number);
  
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
      nextRun.setMonth(0); // January
      nextRun.setFullYear(nextRun.getFullYear() + 1);
      break;
  }

  return nextRun;
} 