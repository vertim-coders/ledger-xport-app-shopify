import React, { useState, useRef, useCallback } from 'react';
import { Button, Text, InlineStack, Thumbnail } from '@shopify/polaris';
import { UploadIcon } from '@shopify/polaris-icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // en MB
  label?: string;
  helpText?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = ['image/*'],
  maxSize = 5, // 5MB par défaut
  label = "Choisir un fichier",
  helpText,
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Vérifier le type de fichier
    if (acceptedTypes.length > 0) {
      const isAccepted = acceptedTypes.some(type => {
        if (type === 'image/*') {
          return file.type.startsWith('image/');
        }
        return file.type === type;
      });
      
      if (!isAccepted) {
        return `Type de fichier non supporté. Types acceptés: ${acceptedTypes.join(', ')}`;
      }
    }

    // Vérifier la taille
    if (file.size > maxSize * 1024 * 1024) {
      return `Le fichier est trop volumineux. Taille maximale: ${maxSize}MB`;
    }

    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    onFileSelect(file);
  }, [onFileSelect, acceptedTypes, maxSize]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      
      <div
        style={{
          border: `2px dashed ${isDragOver ? '#0066FF' : '#e1e3e5'}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: isDragOver ? '#f0f8ff' : '#f6f6f7',
          transition: 'all 0.2s ease',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!disabled ? handleButtonClick : undefined}
      >
                 <InlineStack gap="200" align="center" blockAlign="center">
           <Thumbnail
             source={UploadIcon}
             alt="Upload"
             size="small"
           />
          <div>
            <Text variant="bodyMd" as="p" fontWeight="medium">
              {label}
            </Text>
            <Text variant="bodySm" as="p" color="subdued">
              Glissez-déposez un fichier ici ou cliquez pour sélectionner
            </Text>
            {helpText && (
              <Text variant="bodySm" as="p" color="subdued">
                {helpText}
              </Text>
            )}
          </div>
        </InlineStack>
      </div>
      
      {error && (
        <div style={{ marginTop: '8px' }}>
          <Text variant="bodySm" as="p" color="critical">
            {error}
          </Text>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 