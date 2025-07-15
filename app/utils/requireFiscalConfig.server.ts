import { prisma } from '../db.server';
import { redirect } from '@remix-run/node';

/**
 * Vérifie la présence d'une configuration fiscale pour le shopId donné.
 * Si absente, retourne une redirection vers la page de config fiscale.
 * Sinon, retourne null (pas de redirection).
 */
export async function requireFiscalConfigOrRedirect(shopId: string) {
  const fiscalConfig = await prisma.fiscalConfiguration.findUnique({ where: { shopId } });
  if (!fiscalConfig) {
    return redirect('/app/settings/company-fiscal-regime');
  }
  return null;
} 