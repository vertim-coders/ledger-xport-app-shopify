import { ExportFormat } from "@prisma/client";

/**
 * Get MIME type based on export format
 */
export function getMimeType(format: ExportFormat): string {
  switch (format) {
    case ExportFormat.CSV:
      return 'text/csv';
    case ExportFormat.XML:
      return 'application/xml';
    case ExportFormat.XLSX:
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case ExportFormat.TXT:
      return 'text/plain';
    case ExportFormat.JSON:
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
}

/**
 * Download a single file from base64 content
 */
export function downloadFileFromBase64(
  fileContent: string, 
  fileName: string, 
  mimeType: string
): void {
  try {
    // Validate base64 content
    if (!fileContent || typeof fileContent !== 'string') {
      throw new Error(`Invalid file content for ${fileName}: content is not a string`);
    }
    
    // Check if the string looks like valid base64
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(fileContent)) {
      throw new Error(`Invalid base64 content for ${fileName}: content is not properly base64 encoded`);
    }
    
    // Decode base64 content
    const binaryString = atob(fileContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Create blob and download
    const blob = new Blob([bytes], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error(`Failed to download file ${fileName}: ${error}`);
  }
}

/**
 * Download multiple files from base64 content
 */
export function downloadMultipleFiles(
  files: Array<{
    fileContent: string;
    fileName: string;
    mimeType: string;
  }>
): void {
  files.forEach(file => {
    downloadFileFromBase64(file.fileContent, file.fileName, file.mimeType);
  });
}

/**
 * Download files from API response results
 */
export function downloadFilesFromResults(results: Array<{
  status: string;
  fileContent?: string;
  fileName?: string;
  mimeType?: string;
}>): number {
  const successResults = results.filter(r => r.status === 'success');
  const downloadableFiles = successResults.filter(r => 
    r.fileContent && r.fileName && r.mimeType
  );

  downloadableFiles.forEach(result => {
    downloadFileFromBase64(
      result.fileContent!, 
      result.fileName!, 
      result.mimeType!
    );
  });

  return downloadableFiles.length;
}

/**
 * Get file extension from format
 */
export function getFileExtension(format: ExportFormat): string {
  switch (format) {
    case ExportFormat.CSV:
      return 'csv';
    case ExportFormat.XML:
      return 'xml';
    case ExportFormat.XLSX:
      return 'xlsx';
    case ExportFormat.TXT:
      return 'txt';
    case ExportFormat.JSON:
      return 'json';
    default:
      return 'bin';
  }
}

/**
 * Generate filename with timestamp
 */
export function generateFileName(
  prefix: string,
  dataType: string,
  startDate: string,
  endDate: string,
  format: ExportFormat
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const extension = getFileExtension(format);
  return `${prefix}-${dataType}-${startDate}-${endDate}-${timestamp}.${extension}`;
} 