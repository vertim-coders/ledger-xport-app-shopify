# Utilitaires de Téléchargement

Ce module contient des fonctions utilitaires pour gérer le téléchargement de fichiers dans l'application.

## Fonctions Disponibles

### `getMimeType(format: ExportFormat): string`

Détermine le type MIME approprié selon le format d'export.

**Paramètres:**
- `format`: Le format d'export (CSV, XML, XLSX, TXT, JSON)

**Retourne:**
- Le type MIME correspondant

**Exemple:**
```typescript
import { getMimeType } from '../utils/download';
import { ExportFormat } from '@prisma/client';

const mimeType = getMimeType(ExportFormat.CSV); // 'text/csv'
```

### `downloadFileFromBase64(fileContent: string, fileName: string, mimeType: string): void`

Télécharge un fichier depuis du contenu encodé en base64.

**Paramètres:**
- `fileContent`: Le contenu du fichier encodé en base64
- `fileName`: Le nom du fichier à télécharger
- `mimeType`: Le type MIME du fichier

**Exemple:**
```typescript
import { downloadFileFromBase64 } from '../utils/download';

downloadFileFromBase64(
  'SGVsbG8gV29ybGQ=', // "Hello World" en base64
  'example.txt',
  'text/plain'
);
```

### `downloadMultipleFiles(files: Array<{fileContent: string, fileName: string, mimeType: string}>): void`

Télécharge plusieurs fichiers depuis du contenu encodé en base64.

**Paramètres:**
- `files`: Un tableau d'objets contenant le contenu, le nom et le type MIME de chaque fichier

**Exemple:**
```typescript
import { downloadMultipleFiles } from '../utils/download';

const files = [
  {
    fileContent: 'SGVsbG8gV29ybGQ=',
    fileName: 'file1.txt',
    mimeType: 'text/plain'
  },
  {
    fileContent: 'Qm9uam91ciBMZSBtb25kZQ==',
    fileName: 'file2.txt',
    mimeType: 'text/plain'
  }
];

downloadMultipleFiles(files);
```

### `downloadFilesFromResults(results: Array<{status: string, fileContent?: string, fileName?: string, mimeType?: string}>): number`

Télécharge tous les fichiers avec succès depuis les résultats d'une API.

**Paramètres:**
- `results`: Un tableau de résultats d'API contenant le statut et les informations de fichier

**Retourne:**
- Le nombre de fichiers téléchargés avec succès

**Exemple:**
```typescript
import { downloadFilesFromResults } from '../utils/download';

const apiResponse = {
  results: [
    {
      status: 'success',
      fileContent: 'SGVsbG8gV29ybGQ=',
      fileName: 'report.csv',
      mimeType: 'text/csv'
    },
    {
      status: 'error',
      message: 'Erreur lors de la génération'
    }
  ]
};

const downloadedCount = downloadFilesFromResults(apiResponse.results);
console.log(`${downloadedCount} fichiers téléchargés`);
```

### `getFileExtension(format: ExportFormat): string`

Obtient l'extension de fichier correspondant au format d'export.

**Paramètres:**
- `format`: Le format d'export

**Retourne:**
- L'extension de fichier (sans le point)

**Exemple:**
```typescript
import { getFileExtension } from '../utils/download';
import { ExportFormat } from '@prisma/client';

const extension = getFileExtension(ExportFormat.CSV); // 'csv'
```

### `generateFileName(prefix: string, dataType: string, startDate: string, endDate: string, format: ExportFormat): string`

Génère un nom de fichier avec timestamp.

**Paramètres:**
- `prefix`: Préfixe du nom de fichier
- `dataType`: Type de données
- `startDate`: Date de début (format YYYYMMDD)
- `endDate`: Date de fin (format YYYYMMDD)
- `format`: Format d'export

**Retourne:**
- Le nom de fichier généré

**Exemple:**
```typescript
import { generateFileName } from '../utils/download';
import { ExportFormat } from '@prisma/client';

const fileName = generateFileName(
  'ledgerxport',
  'ventes',
  '20250101',
  '20250131',
  ExportFormat.CSV
);
// Résultat: ledgerxport-ventes-20250101-20250131-2025-01-15T10-30-45-123Z.csv
```

## Utilisation dans les Routes Remix

### Exemple d'utilisation dans une action de route

```typescript
// app/routes/app.reports.manual-export.tsx
import { getMimeType, downloadFilesFromResults } from '../utils/download';

export const action = async ({ request }: ActionFunctionArgs) => {
  // ... logique de génération de rapport ...
  
  const results = [];
  for (const dataType of selectedDataTypes) {
    try {
      const report = await reportService.generateAndSaveReport(/* ... */);
      
      // Lire le contenu du fichier
      const fileContent = await fs.readFile(report.filePath);
      
      results.push({
        status: 'success',
        dataType,
        reportId: report.id,
        fileName: report.fileName,
        fileContent: fileContent.toString('base64'),
        mimeType: getMimeType(format)
      });
    } catch (error) {
      results.push({
        status: 'error',
        dataType,
        message: error.message
      });
    }
  }
  
  return json({ results });
};
```

### Exemple d'utilisation dans un composant

```typescript
// Dans un composant React
import { downloadFilesFromResults } from '../utils/download';

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/app/reports/manual-export', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const downloadedCount = downloadFilesFromResults(data.results);
      
      if (downloadedCount > 0) {
        setToastMessage(`Rapport(s) généré(s) et téléchargé(s) avec succès (${downloadedCount} fichier(s))`);
      } else {
        setToastMessage("Aucun rapport généré");
      }
    }
  } catch (error) {
    setToastMessage("Erreur lors de la génération du rapport");
  }
};
```

## Gestion des Erreurs

Toutes les fonctions de téléchargement incluent une gestion d'erreur appropriée :

- `downloadFileFromBase64` lance une exception si le téléchargement échoue
- `downloadFilesFromResults` ignore les fichiers en erreur et ne télécharge que ceux avec succès
- Les erreurs sont loggées dans la console pour le débogage

## Compatibilité

Ces fonctions sont compatibles avec :
- Tous les navigateurs modernes supportant l'API Blob et URL.createObjectURL
- Remix et React
- TypeScript
- Tous les formats d'export supportés (CSV, XML, XLSX, TXT, JSON)

## Notes Importantes

1. **Base64**: Le contenu des fichiers doit être encodé en base64 côté serveur
2. **MIME Types**: Les types MIME sont automatiquement déterminés selon le format
3. **Nettoyage**: Les URLs d'objet sont automatiquement révoquées après téléchargement
4. **Sécurité**: Les fichiers sont téléchargés directement sans passer par le serveur 