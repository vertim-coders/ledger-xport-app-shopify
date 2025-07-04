export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export type Frequency = "hourly" | "daily" | "monthly" | "yearly";

export function getPeriodForFrequency(frequency: Frequency): {
  startDate: Date;
  endDate: Date;
} {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (frequency) {
    case "hourly":
      // Précédente heure complète
      startDate = new Date(now);
      startDate.setHours(now.getHours() - 1, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(now.getHours() - 1, 59, 59, 999);
      break;
    case "daily":
      // Previous day
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(now);
      endDate.setDate(now.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "monthly":
      // Previous full month
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "yearly":
      // Previous full year
      startDate = new Date(now.getFullYear() - 1, 0, 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(now.getFullYear() - 1, 11, 31);
      endDate.setHours(23, 59, 59, 999);
      break;
  }

  return { startDate, endDate };
} 