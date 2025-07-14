import { prisma } from "../db.server";

export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
}

// Configuration des langues supportées
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// Mapping des codes de langue Shopify vers nos codes
const SHOPIFY_LANGUAGE_MAPPING: Record<string, string> = {
  'fr': 'fr',
  'en': 'en',
  'es': 'es',
  'de': 'de',
  'it': 'it',
  'pt': 'pt',
  'nl': 'nl',
  'ja': 'ja',
  'ko': 'ko',
  'zh': 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'en-CA': 'en',
  'en-GB': 'en',
  'fr-CA': 'fr',
  'es-ES': 'es',
  'es-MX': 'es',
  'pt-BR': 'pt',
  'pt-PT': 'pt',
  'de-AT': 'de',
  'de-CH': 'de',
  'it-CH': 'it',
  'nl-BE': 'nl',
};

export class LanguageService {
  /**
   * Détecte la langue de la boutique Shopify
   */
  static async detectShopLanguage(shopDomain: string, accessToken: string): Promise<string> {
    try {
      const response = await fetch(`https://${shopDomain}/admin/api/2024-01/shop.json`, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch shop details:', response.statusText);
        return 'fr'; // Fallback par défaut
      }

      const shopData = await response.json();
      const shopifyLocale = shopData.shop.primary_locale || 'fr';
      
      // Mapper le code de langue Shopify vers notre code
      return SHOPIFY_LANGUAGE_MAPPING[shopifyLocale] || 'fr';
    } catch (error) {
      console.error('Error detecting shop language:', error);
      return 'fr'; // Fallback par défaut
    }
  }

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

  /**
   * Vérifie si une langue est supportée
   */
  static isLanguageSupported(languageCode: string): boolean {
    return SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode);
  }

  /**
   * Obtient la configuration d'une langue
   */
  static getLanguageConfig(languageCode: string): LanguageConfig | undefined {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
  }

  /**
   * Obtient toutes les langues supportées
   */
  static getSupportedLanguages(): LanguageConfig[] {
    return SUPPORTED_LANGUAGES;
  }
} 