import { useState, useMemo, useCallback } from 'react';
import { Card, DataTable, Badge, Button, TextField, Select, Checkbox, Text, InlineStack, Icon, BlockStack, Modal, Popover, Page, Toast } from '@shopify/polaris';
import { BiSimpleBtn } from '../components/Buttons/BiSimpleBtn';
import { CalendarIcon } from '@shopify/polaris-icons';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

// HelpIcon Component
const HelpIcon = ({ description }: { description: string }) => {
  const [active, setActive] = useState(false);
  const { t } = useTranslation();
  return (
    <Popover
      active={active}
      activator={
        <span
          style={{
            marginLeft: 6,
            cursor: 'pointer',
            color: '#0670fa',
            fontWeight: 'bold',
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            textAlign: 'center',
            borderRadius: '50%',
            border: '1px solid #0670fa',
            background: '#f4f8ff',
            lineHeight: '16px',
          }}
          onClick={() => setActive((a) => !a)}
          title={t('common.help')}
        >
          ?
        </span>
      }
      onClose={() => setActive(false)}
      preferredAlignment="left"
    >
      <div style={{ maxWidth: 320, padding: 12 }}>
        <Text as="span" variant="bodyMd">{description}</Text>
      </div>
    </Popover>
  );
};

export default function InvoiceTestPage() {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [exportType, setExportType] = useState<'invoice' | 'customer'>('invoice');
  
  // Invoice Export States
  const [invoiceDateFrom, setInvoiceDateFrom] = useState('');
  const [invoiceDateTo, setInvoiceDateTo] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<string>('All');
  const [invoiceClient, setInvoiceClient] = useState('');
  const [invoiceFormat, setInvoiceFormat] = useState<'PDF' | 'XML' | 'CSV'>('PDF');
  
  // Customer Export States
  const [customerDateFrom, setCustomerDateFrom] = useState('');
  const [customerDateTo, setCustomerDateTo] = useState('');
  const [customerTag, setCustomerTag] = useState(''); // Recherche par nom ou email
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [customerExportFormat, setCustomerExportFormat] = useState<'CSV' | 'XLSX' | 'JSON'>('CSV');
  const [isCustomerExporting, setIsCustomerExporting] = useState(false);

  // Toast States
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  // Templates data
  const templates = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    image: `/assets/Template_Images/template${i + 1}-preview.png`,
  }));

  // Handle invoice export
  const handleInvoiceExport = async () => {
    try {
      // Validation de la période de sélection (priorité 1)
      if (!invoiceDateFrom && !invoiceDateTo) {
        setToastMessage(t('invoice.export.error.selectPeriod'));
        setToastError(true);
        setToastActive(true);
        return;
      }

      // Validation du nom du client (si fourni) - seulement si la période est valide
      if (invoiceClient && invoiceClient.trim().length < 2) {
        setToastMessage(t('invoice.export.error.clientNameMinLength'));
        setToastError(true);
        setToastActive(true);
        return;
      }

      // Préparer les données du formulaire
      const formData = new FormData();
      formData.append('dateFrom', invoiceDateFrom);
      formData.append('dateTo', invoiceDateTo);
      formData.append('status', invoiceStatus);
      formData.append('client', invoiceClient);
      formData.append('format', invoiceFormat);
      formData.append('template', selectedTemplate.toString());

      // Appeler l'API d'export
      const response = await fetch('/api/invoices/export', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Afficher l'erreur spécifique du backend
        const errorMessage = errorData.error || errorData.details || 'Erreur lors de l\'export';
        throw new Error(errorMessage);
      }

      // Récupérer le fichier
      const blob = await response.blob();
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extraire le nom du fichier depuis les headers
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'invoices-export';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Afficher un message de succès
      setToastMessage(t('invoice.export.success'));
      setToastError(false);
      setToastActive(true);

    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      
      // Afficher le message d'erreur spécifique du backend
      if (error instanceof Error) {
        setToastMessage(error.message);
      } else {
        setToastMessage(t('invoice.export.error.unknown'));
      }
      setToastError(true);
      setToastActive(true);
    }
  };

  // État de chargement pour le bouton d'export
  const [isExporting, setIsExporting] = useState(false);

  const handleExportClick = async () => {
    setIsExporting(true);
    try {
      await handleInvoiceExport();
    } finally {
      setIsExporting(false);
    }
  };

  // Customer Export Functions
  const handleCustomerExport = async () => {
    try {
      // Validation des colonnes sélectionnées
      if (selectedColumns.length === 0) {
        setToastMessage(t('invoice.export.error.selectColumns'));
        setToastError(true);
        setToastActive(true);
        return;
      }

      setIsCustomerExporting(true);

      // Préparer les données du formulaire
      const formData = new FormData();
      formData.append('dateFrom', customerDateFrom);
      formData.append('dateTo', customerDateTo);
      formData.append('searchTerm', customerTag);
      formData.append('columns', JSON.stringify(selectedColumns));
      formData.append('format', customerExportFormat);
      formData.append('columnOrder', JSON.stringify(columnOrder.length > 0 ? columnOrder : selectedColumns));
      formData.append('shopId', 'current-shop'); // À adapter selon votre logique

      // Appeler l'API d'export
      const response = await fetch('/api/customers/export', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.details || 'Erreur lors de l\'export';
        throw new Error(errorMessage);
      }

      // Récupérer le fichier
      const blob = await response.blob();
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extraire le nom du fichier depuis les headers
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'customers-export';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Afficher un message de succès
      setToastMessage(t('invoice.export.success'));
      setToastError(false);
      setToastActive(true);

    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      
      if (error instanceof Error) {
        setToastMessage(error.message);
      } else {
        setToastMessage(t('invoice.export.error.unknown'));
      }
      setToastError(true);
      setToastActive(true);
    } finally {
      setIsCustomerExporting(false);
    }
  };

  const handleSelectAllColumns = () => {
    const allColumns = [
      'firstName', 'lastName', 'email', 'phone', 'createdAt',
      'totalSpent', 'ordersCount', 'lastOrder', 'tags', 'defaultAddress',
      'id', 'note', 'taxExempt'
    ];
    setSelectedColumns(allColumns);
    setColumnOrder(allColumns);
  };

  const handleResetColumns = () => {
    setSelectedColumns([]);
    setColumnOrder([]);
  };

  // Fonction pour gérer la sélection/désélection des colonnes
  const handleColumnToggle = useCallback((columnValue: string, checked: boolean) => {
    if (checked) {
      setSelectedColumns(prev => {
        const newColumns = [...prev, columnValue];
        setColumnOrder(prevOrder => [...prevOrder, columnValue]);
        return newColumns;
      });
    } else {
      setSelectedColumns(prev => {
        const newColumns = prev.filter(col => col !== columnValue);
        setColumnOrder(prevOrder => prevOrder.filter(col => col !== columnValue));
        return newColumns;
      });
    }
  }, []);

  // Fonction pour réorganiser les colonnes
  const handleColumnReorder = useCallback((newOrder: string[]) => {
    setColumnOrder(newOrder);
  }, []);

  // Données d'exemple pour le tableau de prévisualisation
  const sampleCustomers = useMemo(() => [
    {
      firstName: t('customer.sample.firstName1'),
      lastName: t('customer.sample.lastName1'),
      email: 'jean.dupont@example.com',
      phone: '+33 1 23 45 67 89',
      createdAt: '2024-01-15',
      totalSpent: 1250.50,
      ordersCount: 3,
      lastOrder: '2024-03-20',
      tags: [t('customer.sample.tagVIP'), t('customer.sample.tagLoyal')],
      defaultAddress: t('customer.sample.address1'),
      id: 'gid://shopify/Customer/123456789',
      note: t('customer.sample.note1'),
      taxExempt: false
    },
    {
      firstName: t('customer.sample.firstName2'),
      lastName: t('customer.sample.lastName2'),
      email: 'marie.martin@example.com',
      phone: '+33 1 98 76 54 32',
      createdAt: '2024-02-10',
      totalSpent: 450.75,
      ordersCount: 1,
      lastOrder: '2024-02-15',
      tags: [t('customer.sample.tagNew')],
      defaultAddress: t('customer.sample.address2'),
      id: 'gid://shopify/Customer/987654321',
      note: '',
      taxExempt: true
    }
  ], [t]);

  // Préparer les données du tableau selon les colonnes sélectionnées
  const tableData = useMemo(() => {
    if (selectedColumns.length === 0) return [];
    
    const orderedColumns = columnOrder.length > 0 ? columnOrder : selectedColumns;
    
    return sampleCustomers.map(customer => {
      const row: any = {};
      orderedColumns.forEach(col => {
        switch (col) {
          case 'firstName':
            row[col] = customer.firstName;
            break;
          case 'lastName':
            row[col] = customer.lastName;
            break;
          case 'email':
            row[col] = customer.email;
            break;
          case 'phone':
            row[col] = customer.phone;
            break;
          case 'createdAt':
            row[col] = new Date(customer.createdAt).toLocaleDateString('fr-FR');
            break;
          case 'totalSpent':
            row[col] = `${customer.totalSpent.toFixed(2)} €`;
            break;
          case 'ordersCount':
            row[col] = customer.ordersCount.toString();
            break;
          case 'lastOrder':
            row[col] = customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString('fr-FR') : '';
            break;
          case 'tags':
            row[col] = customer.tags.join(', ');
            break;
          case 'defaultAddress':
            row[col] = customer.defaultAddress;
            break;
          case 'id':
            row[col] = customer.id;
            break;
          case 'note':
            row[col] = customer.note;
            break;
          case 'taxExempt':
            row[col] = customer.taxExempt ? t('common.yes') : t('common.no');
            break;
        }
      });
      return row;
    });
  }, [selectedColumns, columnOrder, sampleCustomers, t]);

  // Mapping des colonnes pour les en-têtes
  const columnMap: { [key: string]: string } = {
    'firstName': t('customer.columns.firstName'),
    'lastName': t('customer.columns.lastName'),
    'email': t('customer.columns.email'),
    'phone': t('customer.columns.phone'),
    'createdAt': t('customer.columns.createdAt'),
    'totalSpent': t('customer.columns.totalSpent'),
    'ordersCount': t('customer.columns.ordersCount'),
    'lastOrder': t('customer.columns.lastOrder'),
    'tags': t('customer.columns.tags'),
    'defaultAddress': t('customer.columns.defaultAddress'),
    'id': t('customer.columns.id'),
    'note': t('customer.columns.note'),
    'taxExempt': t('customer.columns.taxExempt')
  };

  // Préparer les en-têtes et les clés des colonnes pour le tableau
  const tableHeaders = useMemo(() => {
    if (selectedColumns.length === 0) return [];
    
    const orderedColumns = columnOrder.length > 0 ? columnOrder : selectedColumns;
    
    return orderedColumns.map(col => columnMap[col] || col);
  }, [selectedColumns, columnOrder, columnMap]);

  // Préparer les clés des colonnes pour le mapping des données
  const tableColumnKeys = useMemo(() => {
    if (selectedColumns.length === 0) return [];
    
    const orderedColumns = columnOrder.length > 0 ? columnOrder : selectedColumns;
    
    return orderedColumns;
  }, [selectedColumns, columnOrder]);

  // Available columns for customer export
  const availableColumns = [
    { value: 'firstName', label: t('customer.columns.firstName') },
    { value: 'lastName', label: t('customer.columns.lastName') },
    { value: 'email', label: t('customer.columns.email') },
    { value: 'phone', label: t('customer.columns.phone') },
    { value: 'createdAt', label: t('customer.columns.createdAt') },
    { value: 'totalSpent', label: t('customer.columns.totalSpent') },
    { value: 'ordersCount', label: t('customer.columns.ordersCount') },
    { value: 'lastOrder', label: t('customer.columns.lastOrder') },
    { value: 'tags', label: t('customer.columns.tags') },
    { value: 'defaultAddress', label: t('customer.columns.defaultAddress') },
    { value: 'id', label: t('customer.columns.id') },
    { value: 'note', label: t('customer.columns.note') },
    { value: 'taxExempt', label: t('customer.columns.taxExempt') }
  ];



  return (
    <>
      <style>{`
        .Polaris-Page--fullWidth,
        .Polaris-Page__Content,
        .Polaris-Layout,
        .Polaris-Layout__Section,
        .Polaris-Card {
          max-width: 100% !important;
          width: 100% !important;
        }
        .Polaris-Layout,
        .Polaris-Layout__Section {
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      `}</style>
      <Page fullWidth title={t('invoice.export.title')}>
        <BlockStack gap="500">
          {/* Export Type Selection */}
          <div>
            <BlockStack gap="400">
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  type="button"
                  onClick={() => setExportType('invoice')}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: exportType === 'invoice' ? '2px solid #2563eb' : '2px solid #e5e7eb',
                    background: exportType === 'invoice' ? '#eff6ff' : '#f3f4f6',
                    color: exportType === 'invoice' ? '#2563eb' : '#222',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t('invoice.export.invoiceExport')}
                </button>
                <button
                  type="button"
                  onClick={() => setExportType('customer')}
                  style={{
                    padding: '10px 24px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: exportType === 'customer' ? '2px solid #2563eb' : '2px solid #e5e7eb',
                    background: exportType === 'customer' ? '#eff6ff' : '#f3f4f6',
                    color: exportType === 'customer' ? '#2563eb' : '#222',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                >
                  {t('invoice.export.customerExport')}
                </button>
              </div>
            </BlockStack>
          </div>

          {/* Invoice Export Section */}
          {exportType === 'invoice' && (
            <>
              {/* Template Gallery */}
              <Card>
                <div style={{ padding: '20px' }}>
                  <BlockStack gap="400">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Text variant="headingMd" as="h2">
                        {t('invoice.template.chooseTemplate')}
                      </Text>
                      <HelpIcon description={t('invoice.template.chooseTemplateHelp')} />
                    </div>
                    
                    {/* Template Cards */}
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      marginBottom: '8px',
                    }}>
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          style={{
                            background: '#f3f4f6',
                            padding: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            minWidth: '150px',
                            boxShadow: selectedTemplate === template.id 
                              ? '0 0 0 4px #2563eb' 
                              : '0 2px 8px 0 rgba(0,0,0,0.04)',
                            transition: 'box-shadow 0.3s',
                            border: selectedTemplate === template.id 
                              ? '2px solid #2563eb' 
                              : '2px solid transparent',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={template.image}
                            alt={template.name}
                            style={{
                              width: '100%',
                              height: '140px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              marginBottom: '8px',
                              background: '#fff',
                            }}
                          />
                          <div style={{ 
                            textAlign: 'center', 
                            fontWeight: 500,
                            fontSize: '14px',
                          }}>
                            {template.name}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View Template Button */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <BiSimpleBtn
                        title={t('invoice.template.viewSelectedTemplate')}
                        onClick={() => setShowTemplatePreview(true)}
                      />
                    </div>
                  </BlockStack>
                </div>
              </Card>

              {/* Invoice Export Filters */}
              <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <Card>
                <div style={{ padding: '20px' }}>
                  <BlockStack gap="400">
                  <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
                      <Text variant="headingMd" as="h2">
                        {t('invoice.export.parameters')}
                      </Text>
                      <HelpIcon description={t('invoice.export.parametersHelp')} />
                    </div>

                    {/* Date Range */}
                    <BlockStack gap="300">
                      <Text variant="headingMd" as="h3" alignment='center'>
                        📅 {t('invoice.export.dateRange')}
                      </Text>
                      
                      {/* Quick Date Presets */}
                      <div style={{ marginBottom: '0px' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <Text variant="bodySm" as="p" tone="subdued" alignment="center">
                            {t('invoice.export.predefinedPeriods')} :
                          </Text>
                        </div>
                        <InlineStack gap="200" wrap align="center">
                          {[
                            { label: t('invoice.export.last7Days'), days: 7 },
                            { label: t('invoice.export.last30Days'), days: 30 },
                            { label: t('invoice.export.last3Months'), days: 90 },
                            { label: t('invoice.export.last6Months'), days: 180 },
                            { label: t('invoice.export.lastYear'), days: 365 }
                          ].map((preset) => {
                            const endDate = new Date();
                            const startDate = new Date();
                            startDate.setDate(endDate.getDate() - preset.days);
                            
                            return (
                              <button
                                key={preset.days}
                                type="button"
                                onClick={() => {
                                  setInvoiceDateFrom(startDate.toISOString().split('T')[0]);
                                  setInvoiceDateTo(endDate.toISOString().split('T')[0]);
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  border: '1px solid #d1d5db',
                                  background: '#fff',
                                  color: '#374151',
                                  fontSize: '14px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f3f4f6';
                                  e.currentTarget.style.borderColor = '#9ca3af';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#fff';
                                  e.currentTarget.style.borderColor = '#d1d5db';
                                }}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </InlineStack>
                      </div>

                      {/* Custom Date Range */}
                      <InlineStack gap="400" wrap={false} align="center">
                        <div style={{ minWidth: '200px' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                            {t('invoice.export.from')}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="date"
                              value={invoiceDateFrom}
                              onChange={(e) => setInvoiceDateFrom(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: '#fff',
                                cursor: 'pointer',
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#6b7280'
                            }}>
                              📅
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          minWidth: '40px',
                          marginTop: '20px'
                        }}>
                          <Text variant="bodyMd" as="span" tone="subdued">
                            →
                          </Text>
                        </div>
                        
                        <div style={{ minWidth: '200px' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                            {t('invoice.export.to')}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="date"
                              value={invoiceDateTo}
                              onChange={(e) => setInvoiceDateTo(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: '#fff',
                                cursor: 'pointer',
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#6b7280'
                            }}>
                              📅
                            </div>
                          </div>
                        </div>
                      </InlineStack>

                      {/* Date Range Summary */}
                      {invoiceDateFrom && invoiceDateTo && (
                        <div style={{
                          padding: '12px',
                          background: '#f0f9ff',
                          borderRadius: '6px',
                          border: '1px solid #bae6fd'
                        }}>
                          <Text variant="bodySm" as="p" alignment="center">
                            📅 {t('invoice.export.selectedPeriod')} : {t('invoice.export.from')} {new Date(invoiceDateFrom).toLocaleDateString('fr-FR')} {t('invoice.export.to')} {new Date(invoiceDateTo).toLocaleDateString('fr-FR')}
                          </Text>
                        </div>
                      )}
                    </BlockStack>

                    {/* Status and Client */}
                    <InlineStack gap="400" wrap={false} align="center">
                      <div style={{ minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <label style={{ fontWeight: 500, fontSize: '14px' }}>
                            ✅ {t('invoice.export.status')}
                          </label>
                          <HelpIcon description={t('invoice.export.statusHelp')} />
                        </div>
                        <Select
                          label=""
                          options={[
                            { label: t('invoice.export.all'), value: 'All' },
                            { label: t('invoice.export.paid'), value: 'Paid' },
                            { label: t('invoice.export.unpaid'), value: 'Unpaid' },
                            { label: t('invoice.export.draft'), value: 'Draft' }
                          ]}
                          value={invoiceStatus}
                          onChange={setInvoiceStatus}
                        />
                      </div>
                      <div style={{ minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <label style={{ fontWeight: 500, fontSize: '14px' }}>
                            👤 {t('invoice.export.client')}
                          </label>
                          <HelpIcon description={t('invoice.export.clientHelp')} />
                        </div>
                        <TextField
                          label=""
                          value={invoiceClient}
                          onChange={setInvoiceClient}
                          placeholder={t('invoice.export.enterClient')}
                          autoComplete="off"
                        />
                      </div>
                    </InlineStack>

                    {/* Format Selection */}
                    <BlockStack gap="300">
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'center' }}>
                        <Text variant="headingMd" as="h3">
                          🧾 {t('invoice.export.format')}
                        </Text>
                        <HelpIcon description={t('invoice.export.formatHelp')} />
                      </div>
                      <InlineStack gap="400" wrap={false} align="center">
                        {(['PDF', 'XML', 'CSV'] as const).map((format) => (
                          <label 
                            key={format} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              cursor: 'pointer',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: invoiceFormat === format ? '2px solid #2563eb' : '2px solid #e5e7eb',
                              backgroundColor: invoiceFormat === format ? '#eff6ff' : '#f9fafb',
                              transition: 'all 0.2s'
                            }}
                          >
                            <input
                              type="radio"
                              name="invoiceFormat"
                              value={format}
                              checked={invoiceFormat === format}
                              onChange={() => setInvoiceFormat(format)}
                              style={{ accentColor: '#2563eb' }}
                            />
                            <Text variant="bodyMd" as="span" fontWeight={invoiceFormat === format ? 'semibold' : 'regular'}>
                              {format}
                            </Text>
                          </label>
                        ))}
                      </InlineStack>
                    </BlockStack>

                    {/* Export Button */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <BiSimpleBtn
                        title={isExporting ? t('invoice.export.exporting') : t('invoice.export.exportInvoices')}
                        onClick={handleExportClick}
                        disabled={isExporting}
                      />
                    </div>

                    {/* Summary */}
                    <div style={{
                      padding: '16px',
                      background: '#eff6ff',
                      borderRadius: '8px',
                      border: '1px solid #bfdbfe'
                    }}>
                      <Text variant="bodyMd" as="p" alignment="center">
                        {invoiceDateFrom && invoiceDateTo 
                          ? t('invoice.export.summaryWithDates', { from: new Date(invoiceDateFrom).toLocaleDateString('fr-FR'), to: new Date(invoiceDateTo).toLocaleDateString('fr-FR') })
                          : invoiceDateFrom || invoiceDateTo
                          ? t('invoice.export.summaryPartialDates', { 
                              from: invoiceDateFrom ? new Date(invoiceDateFrom).toLocaleDateString('fr-FR') : '', 
                              to: invoiceDateTo ? new Date(invoiceDateTo).toLocaleDateString('fr-FR') : '',
                              hasFrom: !!invoiceDateFrom,
                              hasTo: !!invoiceDateTo
                            })
                          : t('invoice.export.summaryNoDates')
                        }
                        {invoiceStatus !== 'All' && ` ${t('invoice.export.status')}: ${invoiceStatus}.`}
                        {invoiceClient && ` ${t('invoice.export.client')}: ${invoiceClient}.`}
                        {` ${t('invoice.export.format')}: ${invoiceFormat}.`}
                      </Text>
                    </div>
                  </BlockStack>
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* Customer Export Section */}
          {exportType === 'customer' && (
            <>
              {/* Filters */}
              <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <Card>
                <div style={{ padding: '20px', alignItems: 'center' }}>
                  <BlockStack gap="400">
                    {/* Date Range */}
                    <BlockStack gap="300">
                      <Text variant="headingMd" as="h2" alignment="center">
                        {t('customer.export.periodSelector')}
                      </Text>
                      
                      {/* Quick Date Presets */}
                      <div style={{ marginBottom: '0px' }}>
                        <InlineStack gap="200" wrap align="center">
                          {[
                            { label: t('customer.export.last7Days'), days: 7 },
                            { label: t('customer.export.last30Days'), days: 30 },
                            { label: t('customer.export.last3Months'), days: 90 },
                            { label: t('customer.export.last6Months'), days: 180 },
                            { label: t('customer.export.lastYear'), days: 365 }
                          ].map((preset) => {
                            const endDate = new Date();
                            const startDate = new Date();
                            startDate.setDate(endDate.getDate() - preset.days);
                            
                            return (
                              <button
                                key={preset.days}
                                type="button"
                                onClick={() => {
                                  setCustomerDateFrom(startDate.toISOString().split('T')[0]);
                                  setCustomerDateTo(endDate.toISOString().split('T')[0]);
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  border: '1px solid #d1d5db',
                                  background: '#fff',
                                  color: '#374151',
                                  fontSize: '14px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f3f4f6';
                                  e.currentTarget.style.borderColor = '#9ca3af';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#fff';
                                  e.currentTarget.style.borderColor = '#d1d5db';
                                }}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </InlineStack>
                      </div>

                      {/* Custom Date Range */}
                      <InlineStack gap="400" wrap={false} align="center">
                        <div style={{ minWidth: '200px' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                            {t('customer.export.registrationDateStart')}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="date"
                              value={customerDateFrom}
                              onChange={(e) => setCustomerDateFrom(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: '#fff',
                                cursor: 'pointer',
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#6b7280'
                            }}>
                              📅
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          minWidth: '40px',
                          marginTop: '20px'
                        }}>
                          <Text variant="bodyMd" as="span" tone="subdued">
                            →
                          </Text>
                        </div>
                        
                        <div style={{ minWidth: '200px' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                            {t('customer.export.registrationDateEnd')}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="date"
                              value={customerDateTo}
                              onChange={(e) => setCustomerDateTo(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: '#fff',
                                cursor: 'pointer',
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#6b7280'
                            }}>
                              📅
                            </div>
                          </div>
                        </div>
                      </InlineStack>

                      {/* Date Range Summary */}
                      {customerDateFrom && customerDateTo && (
                        <div style={{
                          padding: '12px',
                          background: '#f0f9ff',
                          borderRadius: '6px',
                          border: '1px solid #bae6fd'
                        }}>
                          <Text variant="bodySm" as="p" alignment="center">
                            📅 {t('customer.export.selectedPeriod')} : {new Date(customerDateFrom).toLocaleDateString('fr-FR')} {t('customer.export.to')} {new Date(customerDateTo).toLocaleDateString('fr-FR')}
                          </Text>
                        </div>
                      )}
                    </BlockStack>

                    {/* Search Filter */}
                    <div style={{ marginTop: '16px', }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                        <label style={{ fontWeight: 500, fontSize: '14px' }}>
                          {t('customer.export.searchByNameOrEmail')}
                        </label>
                        <HelpIcon description={t('customer.export.searchByNameOrEmailHelp')} />
                      </div>
                      <TextField
                        label=""
                        value={customerTag}
                        onChange={setCustomerTag}
                        placeholder={t('customer.export.enterNameOrEmail')}
                        autoComplete="off"
                      />
                    </div>

                    {/* Format d'export */}
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }}>
                        <Text variant="headingMd" as="h3">
                          {t('customer.export.exportFormat')}
                        </Text>
                        <HelpIcon description={t('customer.export.exportFormatHelp')} />
                      </div>
                      <InlineStack gap="400" wrap={false} align="center">
                        {(['CSV', 'XLSX', 'JSON'] as const).map((format) => (
                          <label 
                            key={format} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              cursor: 'pointer',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: customerExportFormat === format ? '2px solid #2563eb' : '2px solid #e5e7eb',
                              backgroundColor: customerExportFormat === format ? '#eff6ff' : '#f9fafb',
                              transition: 'all 0.2s'
                            }}
                          >
                            <input
                              type="radio"
                              name="exportFormat"
                              value={format}
                              checked={customerExportFormat === format}
                              onChange={() => setCustomerExportFormat(format)}
                              style={{ accentColor: '#2563eb' }}
                            />
                            <Text variant="bodyMd" as="span" fontWeight={customerExportFormat === format ? 'semibold' : 'regular'}>
                              {format}
                            </Text>
                          </label>
                        ))}
                      </InlineStack>
                    </div>
                  </BlockStack>
                </div>
              </Card>
              </div>

              {/* Columns Selection */}
              <Card>
                <div style={{ padding: '20px' }}>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text variant="headingMd" as="h2">
                          {t('customer.export.columnsToExport')}
                        </Text>
                        <HelpIcon description={t('customer.export.columnsToExportHelp')} />
                      </div>
                      <InlineStack gap="200">
                        <Button
                          size="slim"
                          onClick={handleSelectAllColumns}
                        >
                          {t('customer.export.selectAll')}
                        </Button>
                        <Button
                          size="slim"
                          onClick={handleResetColumns}
                        >
                          {t('customer.export.reset')}
                        </Button>
                      </InlineStack>
                    </InlineStack>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                      gap: '12px',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: '#f9fafb'
                    }}>
                      {availableColumns.map((column) => (
                        <div 
                          key={column.value} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            padding: '8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            backgroundColor: selectedColumns.includes(column.value) ? '#eff6ff' : 'transparent',
                            border: selectedColumns.includes(column.value) ? '1px solid #bfdbfe' : '1px solid transparent'
                          }}
                          onClick={() => handleColumnToggle(column.value, !selectedColumns.includes(column.value))}
                        >
                          <Checkbox
                            label=""
                            checked={selectedColumns.includes(column.value)}
                            onChange={(checked) => handleColumnToggle(column.value, checked)}
                          />
                          <Text variant="bodyMd" as="span">
                            {column.label}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </BlockStack>
                </div>
              </Card>

              {/* Column Order */}
              {selectedColumns.length > 0 && (
                <div style={{ padding: '20px' }}>
                  <BlockStack gap="400">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text variant="headingMd" as="h2">
                          {t('customer.export.columnOrder')}
                        </Text>
                        <HelpIcon description={t('customer.export.columnOrderHelp')} />
                      </div>
                      <Text variant="bodySm" as="span" tone="subdued">
                        {selectedColumns.length} {t('customer.export.selectedColumns')}
                      </Text>
                    </div>
                    
                    <div 
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        padding: '16px',
                        border: '2px dashed #d1d5db',
                        borderRadius: '8px',
                        background: '#f9fafb',
                        minHeight: '80px',
                        transition: 'all 0.2s'
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#2563eb';
                        e.currentTarget.style.background = '#eff6ff';
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.background = '#f9fafb';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.background = '#f9fafb';
                      }}
                    >
                      {(columnOrder.length > 0 ? columnOrder : selectedColumns).map((columnValue, index) => {
                        const column = availableColumns.find(col => col.value === columnValue);
                        return (
                          <div
                            key={columnValue}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 14px',
                              backgroundColor: '#fff',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              cursor: 'grab',
                              userSelect: 'none',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              transition: 'all 0.2s',
                              position: 'relative'
                            }}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', columnValue);
                              e.dataTransfer.setData('text/html', index.toString());
                              e.currentTarget.style.opacity = '0.5';
                              e.currentTarget.style.transform = 'rotate(5deg)';
                            }}
                            onDragEnd={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'rotate(0deg)';
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.style.borderColor = '#2563eb';
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.2)';
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                              
                              const draggedColumn = e.dataTransfer.getData('text/plain');
                              const draggedIndex = parseInt(e.dataTransfer.getData('text/html'));
                              const currentIndex = (columnOrder.length > 0 ? columnOrder : selectedColumns).indexOf(columnValue);
                              
                              if (draggedIndex !== currentIndex) {
                                const currentOrder = columnOrder.length > 0 ? [...columnOrder] : [...selectedColumns];
                                const [removed] = currentOrder.splice(draggedIndex, 1);
                                currentOrder.splice(currentIndex, 0, removed);
                                setColumnOrder(currentOrder);
                              }
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '4px',
                              color: '#6b7280',
                              fontSize: '12px'
                            }}>
                              <span style={{ fontWeight: 'bold' }}>{index + 1}</span>
                              <Icon source="drag-handle" tone="subdued" />
                            </div>
                            <Text variant="bodyMd" as="span" fontWeight="medium">
                              {column?.label || columnValue}
                            </Text>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleColumnToggle(columnValue, false);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ef4444',
                                fontSize: '14px',
                                width: '20px',
                                height: '20px',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fef2f2';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                              title={t('customer.export.removeColumn')}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedColumns.length === 0 && (
                      <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}>
                        {t('customer.export.selectColumnsToReorder')}
                      </div>
                    )}
                  </BlockStack>
                </div>
              )}

                             {/* Table Preview */}
               {selectedColumns.length > 0 && (
                 <div style={{ marginTop: '-25px' }}>
                   <Card>
                  <div style={{ padding: '20px' }}>
                    <BlockStack gap="400">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Text variant="headingMd" as="h2">
                            {t('customer.export.dataPreview')}
                          </Text>
                          <HelpIcon description={t('customer.export.dataPreviewHelp')} />
                        </div>
                        <Text variant="bodySm" as="span" tone="subdued">
                          {tableData.length} {t('customer.export.exampleRows')}
                        </Text>
                      </div>
                      
                      {tableData.length > 0 && (
                        <div style={{ 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px', 
                          overflow: 'hidden',
                          maxHeight: '400px',
                          overflowY: 'auto'
                        }}>
                          <DataTable
                            columnContentTypes={tableHeaders.map(() => 'text')}
                            headings={tableHeaders}
                            rows={tableData.map(row => 
                              tableColumnKeys.map(key => row[key] || '')
                            )}
                            sortable={tableHeaders.map(() => false)}
                          />
                                                 </div>
                       )}
                     </BlockStack>
                   </div>
                 </Card>
                 </div>
               )}

              {/* Export Action */}
                <div style={{ padding: '20px' }}>
                  <BlockStack gap="400">

                    {/* Export Button */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <BiSimpleBtn
                        title={isCustomerExporting ? t('customer.export.exporting') : t('customer.export.exportNow')}
                        onClick={handleCustomerExport}
                        disabled={isCustomerExporting}
                      />
                    </div>

                    {/* Summary */}
                    <div style={{
                      padding: '16px',
                      background: '#eff6ff',
                      borderRadius: '8px',
                      border: '1px solid #bfdbfe'
                    }}>
                      <Text variant="bodyMd" as="p" alignment="center">
                        {customerDateFrom && customerDateTo 
                          ? t('customer.export.summaryWithDates', { from: new Date(customerDateFrom).toLocaleDateString('fr-FR'), to: new Date(customerDateTo).toLocaleDateString('fr-FR') })
                          : customerDateFrom || customerDateTo
                          ? t('customer.export.summaryPartialDates', { 
                              from: customerDateFrom ? new Date(customerDateFrom).toLocaleDateString('fr-FR') : '', 
                              to: customerDateTo ? new Date(customerDateTo).toLocaleDateString('fr-FR') : '',
                              hasFrom: !!customerDateFrom,
                              hasTo: !!customerDateTo
                            })
                          : t('customer.export.summaryNoDates')
                        }
                        {selectedColumns.length > 0 && ` ${selectedColumns.length} ${t('customer.export.selectedColumns')}.`}
                        {customerTag && ` ${t('customer.export.search')}: "${customerTag}".`}
                        {` ${t('customer.export.format')}: ${customerExportFormat}.`}
                      </Text>
                    </div>

                    
                  </BlockStack>
                </div>
            </>
          )}

          {/* Template Preview Modal */}
          <Modal
            open={showTemplatePreview}
            onClose={() => setShowTemplatePreview(false)}
            title={templates[selectedTemplate - 1]?.name || 'Template'}
          >
            <Modal.Section>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={templates[selectedTemplate - 1]?.image}
                  alt={templates[selectedTemplate - 1]?.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '500px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                    background: '#fff',
                  }}
                />
              </div>
            </Modal.Section>
          </Modal>
        </BlockStack>
        
        {/* Toast Component */}
        {toastActive && (
          <Toast
            content={toastMessage}
            onDismiss={() => setToastActive(false)}
            error={toastError}
          />
        )}
        
        {/* Footer */}
        <Footer />
      </Page>
    </>
  );
}
