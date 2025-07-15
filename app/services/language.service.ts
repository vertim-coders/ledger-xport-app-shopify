import { prisma } from "../db.server";

export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
}

// Suppression de toute logique de détection automatique de langue

// Si besoin, ne garder que les méthodes utiles à la gestion manuelle de la langue (ex: updateShopLanguage, etc.)
// Supprimer toute référence à SUPPORTED_LANGUAGES et aux méthodes associées

export class LanguageService {
  /**
   * Met à jour la langue de la boutique dans la base de données
   */
  static async updateShopLanguage(shopId: string, language: string): Promise<void> {
    try {
      await prisma.shop.update({
        where: { id: shopId },
        data: { language }
      });

      // Mettre à jour aussi dans GeneralSettings si elle existe
      await prisma.generalSettings.upsert({
        where: { shopId },
        update: { language },
        create: {
          shopId,
          language,
          timezone: 'UTC',
          salesAccount: '701'
        }
      });
    } catch (error) {
      console.error('Error updating shop language:', error);
    }
  }

  /**
   * Récupère la langue actuelle de la boutique
   */
  static async getShopLanguage(shopId: string): Promise<string> {
    try {
      const shop = await prisma.shop.findUnique({
        where: { id: shopId },
        select: { language: true }
      });
      
      return shop?.language || 'fr';
    } catch (error) {
      console.error('Error getting shop language:', error);
      return 'fr';
    }
  }
} 