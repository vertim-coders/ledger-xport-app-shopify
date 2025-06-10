import { processScheduledTasks } from "../app/workers/scheduledReports";

async function runWorker() {
  console.log('Starting scheduled reports worker...');
  
  // Process tasks immediately on startup
  await processScheduledTasks();
  
  // Then run every minute
  setInterval(async () => {
    await processScheduledTasks();
  }, 60 * 1000); // 60 seconds
}

runWorker().catch(console.error); 