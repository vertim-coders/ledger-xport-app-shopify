import "@shopify/shopify-api/adapters/node";
import "@shopify/shopify-app-remix/adapters/node";
import { processScheduledTasks } from "../app/workers/scheduledReports";
import { config } from "dotenv";

// Load environment variables from .env file
config();

async function runWorker() {
  console.log('Starting scheduled reports worker...');
  
  // Validate required environment variables
  const requiredEnvVars = [
    'SHOPIFY_API_KEY',
    'SHOPIFY_API_SECRET',
    'SHOPIFY_APP_URL',
    'DATABASE_URL',
    'SCOPES'
  ];

  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
  }

  try {
    // Initial run
    await processScheduledTasks();

    // Schedule subsequent runs every minute
    setInterval(async () => {
      try {
        await processScheduledTasks();
      } catch (error) {
        console.error('Error in scheduled task execution:', error);
      }
    }, 60000); // Run every minute
  } catch (error) {
    console.error('Error starting worker:', error);
    process.exit(1);
  }
}

runWorker().catch(error => {
  console.error('Fatal error in worker:', error);
  process.exit(1);
}); 