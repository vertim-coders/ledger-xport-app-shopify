import { prisma } from "../db.server";
import type { ScheduledTask, Task } from "@prisma/client";

export async function listScheduledTasks(shopId: string) {
  return prisma.scheduledTask.findMany({
    where: { shopId },
    include: {
      report: true,
      tasks: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateScheduledTaskStatus(id: string, status: string) {
  return prisma.scheduledTask.update({
    where: { id },
    data: { status },
  });
}

export async function deleteScheduledTask(id: string) {
  // Delete all related tasks first (if needed)
  await prisma.task.deleteMany({ where: { scheduledTaskId: id } });
  return prisma.scheduledTask.delete({ where: { id } });
}

export async function getScheduledTaskExecutionsCount(id: string) {
  return prisma.task.count({ where: { scheduledTaskId: id, status: "COMPLETED" } });
} 