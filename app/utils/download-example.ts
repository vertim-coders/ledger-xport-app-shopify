/**
 * Exemple d'utilisation des fonctions utilitaires de téléchargement
 * Ce fichier montre comment utiliser les fonctions dans d'autres routes
 */

import { getMimeType, downloadFileFromBase64, downloadMultipleFiles, downloadFilesFromResults, generateFileName } from './download';
import { ExportFormat } from '@prisma/client';

// Exemple 1: Téléchargement d'un seul fichier
export async function exampleSingleDownload() {
  try {
    // Simuler une réponse API avec du contenu base64
    const mockApiResponse = {
      fileContent: 'SGVsbG8gV29ybGQ=', // "Hello World" en base64
      fileName: 'example.txt',
      mimeType: 'text/plain'
    };

    // Télécharger le fichier
    downloadFileFromBase64(
      mockApiResponse.fileContent,
      mockApiResponse.fileName,
      mockApiResponse.mimeType
    );

    console.log('Fichier téléchargé avec succès');
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
  }
}

// Exemple 2: Téléchargement de plusieurs fichiers
export async function exampleMultipleDownloads() {
  try {
    // Simuler une réponse API avec plusieurs fichiers
    const mockApiResponse = {
      results: [
        {
          status: 'success',
          fileContent: 'SGVsbG8gV29ybGQ=', // "Hello World" en base64
          fileName: 'file1.txt',
          mimeType: 'text/plain'
        },
        {
          status: 'success',
          fileContent: 'Qm9uam91ciBMZSBtb25kZQ==', // "Bonjour Le monde" en base64
          fileName: 'file2.txt',
          mimeType: 'text/plain'
        },
        {
          status: 'error',
          message: 'Erreur lors de la génération'
        }
      ]
    };

    // Télécharger tous les fichiers avec succès
    const downloadedCount = downloadFilesFromResults(mockApiResponse.results);
    console.log(`${downloadedCount} fichiers téléchargés avec succès`);
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
  }
}

// Exemple 3: Utilisation dans une route Remix
export async function exampleRemixRoute() {
  // Simuler une action de route Remix
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch('/api/generate-reports', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération');
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Utiliser notre fonction utilitaire
        const downloadedCount = downloadFilesFromResults(data.results);
        
        if (downloadedCount > 0) {
          // Afficher un message de succès
          console.log(`Rapport(s) généré(s) et téléchargé(s) avec succès (${downloadedCount} fichier(s))`);
        } else {
          console.log("Aucun rapport généré");
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return { handleSubmit };
}

// Exemple 4: Génération de nom de fichier
export function exampleGenerateFileName() {
  const fileName = generateFileName(
    'ledgerxport',
    'ventes',
    '20250101',
    '20250131',
    ExportFormat.CSV
  );
  
  console.log('Nom de fichier généré:', fileName);
  // Output: ledgerxport-ventes-20250101-20250131-2025-01-15T10-30-45-123Z.csv
}

// Exemple 5: Obtention du type MIME
export function exampleGetMimeType() {
  const mimeTypes = [
    ExportFormat.CSV,
    ExportFormat.XML,
    ExportFormat.XLSX,
    ExportFormat.TXT,
    ExportFormat.JSON
  ];

  mimeTypes.forEach(format => {
    const mimeType = getMimeType(format);
    console.log(`Format ${format}: ${mimeType}`);
  });
}

// Exemple 6: Téléchargement avec gestion d'erreur avancée
export async function exampleAdvancedDownload() {
  try {
    // Simuler une réponse API
    const apiResponse = await fetch('/api/generate-report');
    const data = await apiResponse.json();

    if (data.results && data.results.length > 0) {
      const successResults = data.results.filter((r: any) => r.status === 'success');
      const errorResults = data.results.filter((r: any) => r.status === 'error');

      // Télécharger les fichiers avec succès
      const downloadedCount = downloadFilesFromResults(successResults);

      // Gérer les erreurs
      if (errorResults.length > 0) {
        console.warn(`${errorResults.length} rapport(s) en erreur:`);
        errorResults.forEach((error: any) => {
          console.warn(`- ${error.dataType}: ${error.message}`);
        });
      }

      // Retourner un résumé
      return {
        success: downloadedCount,
        errors: errorResults.length,
        total: data.results.length
      };
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    throw error;
  }
} 