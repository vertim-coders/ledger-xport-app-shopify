import { json } from '@remix-run/node';
import { processScheduledTasks } from '../../workers/scheduledReports';

export const loader = async () => {
  await processScheduledTasks();
  return json({ status: 'ok' });
}; 