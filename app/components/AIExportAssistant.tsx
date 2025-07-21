import React, { useRef, useState, useEffect } from 'react';
import { ActionList, Text, BlockStack } from '@shopify/polaris';
import { OrderIcon, ProfileIcon, CashDollarIcon } from '@shopify/polaris-icons';
import { useTranslation } from 'react-i18next';

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

interface ExportParams {
  dataType: 'orders' | 'customers' | 'sales' | 'taxes' | 'refunds';
  format: 'CSV' | 'XLSX' | 'JSON';
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  filters?: {
    vip?: boolean;
    country?: string;
    status?: string;
  };
}

const AIExportAssistant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExportButton, setShowExportButton] = useState(false);
  const [exportParams, setExportParams] = useState<ExportParams | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const textareaContainerRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(1);

  // Exemples rapides traduits
  const QUICK_EXAMPLES = [
    {
      content: t('ai.examples.exportSalesWeek', 'Je veux exporter les ventes de la semaine en Excel'),
      icon: CashDollarIcon,
    },
    {
      content: t('ai.examples.showLastMonthOrders', 'Montre-moi les commandes du mois dernier'),
      icon: OrderIcon,
    },
    {
      content: t('ai.examples.vipCustomers', 'Donne-moi la liste de mes clients VIP'),
      icon: ProfileIcon,
    },
    {
      content: t('ai.examples.exportTaxesQuarter', 'Exporte mes taxes du trimestre en CSV'),
      icon: CashDollarIcon,
    },
  ];

  // Effet de border glow avec suivi de la souris pour la carte principale
  useEffect(() => {
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(-x, y);
        card.style.setProperty("--rotation", angle + "rad");
      }
    };

    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Effet de border glow avec suivi de la souris pour le textarea
  useEffect(() => {
    const textareaContainer = textareaContainerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (textareaContainer) {
        const rect = textareaContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(-x, y);
        textareaContainer.style.setProperty("--rotation", angle + "rad");
      }
    };

    if (textareaContainer) {
      textareaContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (textareaContainer) {
        textareaContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  // Analyser la requête utilisateur pour déterminer les paramètres d'export
  const analyzeUserRequest = (userQuery: string): ExportParams | null => {
    const query = userQuery.toLowerCase();
    
    // Détecter le type de données
    let dataType: ExportParams['dataType'] = 'orders';
    if (query.includes('client') || query.includes('customer') || query.includes('vip')) {
      dataType = 'customers';
    } else if (query.includes('vente') || query.includes('sale') || query.includes('revenue')) {
      dataType = 'sales';
    } else if (query.includes('taxe') || query.includes('tax')) {
      dataType = 'taxes';
    } else if (query.includes('remboursement') || query.includes('refund')) {
      dataType = 'refunds';
    }

    // Détecter le format
    let format: ExportParams['format'] = 'CSV';
    if (query.includes('excel') || query.includes('xlsx')) {
      format = 'XLSX';
    } else if (query.includes('json')) {
      format = 'JSON';
    }

    // Détecter la période
    let dateRange: ExportParams['dateRange'] | undefined;
    if (query.includes('mois dernier') || query.includes('last month')) {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      dateRange = {
        startDate: lastMonth.toISOString().split('T')[0],
        endDate: new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0],
      };
    } else if (query.includes('semaine') || query.includes('week')) {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateRange = {
        startDate: weekAgo.toISOString().split('T')[0],
        endDate: now.toISOString().split('T')[0],
      };
    }

    // Détecter les filtres
    const filters: ExportParams['filters'] = {};
    if (query.includes('vip')) {
      filters.vip = true;
    }

    return {
      dataType,
      format,
      dateRange,
      filters,
    };
  };

  const handleSubmit = async () => {
    if (!value.trim() || loading) return;
    setError(null);
    setShowExportButton(false);
    setExportParams(null);
    
    const userMsg: ChatMessage = {
      id: nextId.current++,
      role: 'user',
      content: value,
    };
    setMessages((msgs) => [...msgs, userMsg]);
    const userQuery = value;
    setValue('');
    setLoading(true);

    try {
      // Appel à l'API IA réelle
      const response = await fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: userQuery,
          language: i18n.language || 'fr'
        }),
      });

      if (!response.ok) {
        throw new Error(t('ai.requestError', 'Erreur lors de la requête IA'));
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Analyser la requête utilisateur pour préparer l'export
      const params = analyzeUserRequest(userQuery);
      
      // Réponse IA
      let aiResponse = data.message || t('ai.defaultResponse', 'Je comprends votre demande.');
      
      // Si l'IA détecte une demande d'export, personnaliser la réponse
      if (params) {
        const dataTypeLabels = {
          orders: t('ai.dataType.orders', 'commandes'),
          customers: t('ai.dataType.customers', 'clients'),
          sales: t('ai.dataType.sales', 'ventes'),
          taxes: t('ai.dataType.taxes', 'taxes'),
          refunds: t('ai.dataType.refunds', 'remboursements'),
        };
        
        const formatLabels = {
          CSV: t('ai.format.csv', 'CSV'),
          XLSX: t('ai.format.xlsx', 'Excel'),
          JSON: t('ai.format.json', 'JSON'),
        };

        aiResponse = `${t('ai.exportRequest', 'J\'ai compris que vous voulez un export de vos')} ${dataTypeLabels[params.dataType]} ${t('ai.exportRequest.format', 'au format')} ${formatLabels[params.format]}`;
        
        if (params.dateRange) {
          aiResponse += ` ${t('ai.exportRequest.period', 'pour la période du')} ${params.dateRange.startDate} ${t('ai.exportRequest.to', 'au')} ${params.dateRange.endDate}`;
        }
        
        if (params.filters?.vip) {
          aiResponse += ` ${t('ai.exportRequest.vipFilter', '(clients VIP uniquement)')}`;
        }
        
        aiResponse += `. ${t('ai.exportRequest.generate', 'Voulez-vous générer cet export ?')}`;
        
        setExportParams(params);
        setShowExportButton(true);
      }

      const aiMsg: ChatMessage = {
        id: nextId.current++,
        role: 'ai',
        content: aiResponse,
      };
      setMessages((msgs) => [...msgs, aiMsg]);

    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: nextId.current++,
        role: 'ai',
        content: `${t('ai.error', 'Désolé, j\'ai rencontré une erreur :')} ${err.message}. ${t('ai.error.retry', 'Veuillez réessayer.')}`,
      };
      setMessages((msgs) => [...msgs, errorMsg]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExample = (example: { content: string; icon: any }) => {
    setValue(example.content);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const handleExport = async () => {
    if (!exportParams) return;
    
    setShowExportButton(false);
    setLoading(true);

    try {
      // Ici, on appellera la logique d'export existante
      // Pour l'instant, on simule l'appel
      const exportMsg: ChatMessage = {
        id: nextId.current++,
        role: 'ai',
        content: `${t('ai.exporting', 'Export')} ${exportParams.dataType} ${t('ai.exporting.format', 'au format')} ${exportParams.format} ${t('ai.exporting.generating', 'en cours de génération...')}`
      };
      setMessages((msgs) => [...msgs, exportMsg]);

      // TODO: Appeler la vraie logique d'export avec exportParams
      // Exemple: await generateExport(exportParams);
      
      setTimeout(() => {
        const successMsg: ChatMessage = {
          id: nextId.current++,
          role: 'ai',
          content: `${t('ai.export.success', 'Export généré avec succès !')} ${t('ai.export.mvp', '(MVP - à connecter à la vraie logique d\'export)')}`
        };
        setMessages((msgs) => [...msgs, successMsg]);
        setLoading(false);
      }, 2000);

    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: nextId.current++,
        role: 'ai',
        content: `${t('ai.export.error', 'Erreur lors de la génération de l\'export :')} ${err.message}`
      };
      setMessages((msgs) => [...msgs, errorMsg]);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ai-assistant-container {
          position: relative;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 2px solid transparent;
          background-image: 
            linear-gradient(#fff, #fff),
            linear-gradient(calc(var(--rotation, 0rad)), #007aff 0%, #00b86b 30%, #ff6b35 60%, transparent 80%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          transition: transform 0.2s ease;
        }
        
        .ai-assistant-container:hover {
          transform: scale(1.01);
        }

        .textarea-container {
          position: relative;
          background: #fff;
          border-radius: 16px;
          border: 2px solid transparent;
          background-image: 
            linear-gradient(#fff, #fff),
            linear-gradient(calc(var(--rotation, 0rad)), #007aff 0%, #00b86b 30%, #ff6b35 60%, transparent 80%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          transition: transform 0.2s ease;
        }
        
        .textarea-container:hover {
          transform: scale(1.02);
        }
      `}</style>
      <div 
        ref={cardRef}
        className="ai-assistant-container" 
        style={{ minHeight: '40vh', padding: 0, margin: 0 }}
      >
        <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
          {/* Section d'en-tête moderne */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 32,
            padding: '24px 0'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #007aff, #00b86b)',
              borderRadius: 16,
              padding: '20px',
              marginBottom: 24,
              boxShadow: '0 4px 20px rgba(0,102,255,0.15)'
            }}>
              <h1 style={{ 
                color: '#fff', 
                fontSize: 28, 
                fontWeight: 700, 
                margin: '0 0 8px 0',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                {t('ai.title', 'Rapport personnalisé avec IA')}
              </h1>
              <p style={{ 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: 16, 
                margin: 0,
                lineHeight: 1.5,
                fontWeight: 400
              }}>
                {t('ai.description', 'Posez une question en langage naturel sur vos données (ventes, clients, etc.) et laissez l\'IA préparer un export adapté à votre besoin.')}
              </p>
            </div>
          </div>

          <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, color: '#111', marginBottom: 24 }}>
            {t('ai.assistantTitle', 'Assistant IA d\'export')}
          </h2>
        <div style={{ minHeight: 220, marginBottom: 24 }}>
          {messages.length === 0 && (
            <div style={{ color: '#888', textAlign: 'center', fontSize: 16, marginTop: 16 }}>
              {t('ai.startPrompt', 'Posez une question sur vos données pour commencer…')}
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  background: msg.role === 'user' ? '#e3eafe' : '#f6f6f7',
                  color: '#111',
                  borderRadius: 18,
                  padding: '10px 16px',
                  maxWidth: '80%',
                  fontSize: 16,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  whiteSpace: 'pre-line',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ color: '#007aff', textAlign: 'center', marginTop: 16 }}>
              {t('ai.thinking', 'L\'IA réfléchit à votre demande…')}
            </div>
          )}
          {error && (
            <div style={{ color: '#d72c0d', textAlign: 'center', marginTop: 16, fontWeight: 500 }}>
              {error}
            </div>
          )}
        </div>
        <div
          ref={textareaContainerRef}
          className="textarea-container"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            padding: 8,
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('ai.placeholder', 'Posez une question…')}
            style={{
              flex: 1,
              minHeight: 44,
              maxHeight: 120,
              resize: 'none',
              fontSize: 16,
              padding: '12px 16px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#111',
              fontFamily: 'inherit',
              borderRadius: 12,
            }}
            disabled={loading}
            rows={1}
          />
          {/* Icône magique IA avec gradient */}
          <div style={{
            marginLeft: 8,
            marginRight: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #007aff, #00b86b)',
            boxShadow: '0 2px 8px rgba(0,102,255,0.2)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
              <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="white"/>
              <path d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z" fill="white"/>
            </svg>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !value.trim()}
            style={{
              background: '#007aff',
              border: 'none',
              borderRadius: 12,
              color: '#fff',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
              fontSize: 22,
              transition: 'background 0.18s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
            aria-label={t('ai.sendButtonLabel', 'Envoyer')}
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 20L20 12L4 4V10L16 12L4 14V20Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Text as="h3" variant="headingMd">
              {t('ai.quickExamplesTitle', 'Exemples rapides')}
            </Text>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 16, 
            maxWidth: 600, 
            margin: '0 auto' 
          }}>
            {QUICK_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleExample(ex)}
                disabled={loading}
                style={{
                  background: '#f6f6f7',
                  color: '#111',
                  border: 'none',
                  borderRadius: 12,
                  padding: '16px',
                  fontSize: 12,
                  fontWeight: 520,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  transition: 'background 0.18s',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 40,
                }}
                type="button"
                onMouseOver={e => {
                  if (!loading) e.currentTarget.style.background = '#e8e8ea';
                }}
                onMouseOut={e => {
                  if (!loading) e.currentTarget.style.background = '#f6f6f7';
                }}
              >
                <div style={{ 
                  background: '#007aff', 
                  borderRadius: 8, 
                  padding: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {ex.icon === CashDollarIcon ? (
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="white"/>
                    ) : ex.icon === OrderIcon ? (
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="white"/>
                    ) : ex.icon === ProfileIcon ? (
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                    ) : (
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="white"/>
                    )}
                  </svg>
                </div>
                <span style={{ lineHeight: 1.4 }}>{ex.content}</span>
              </button>
            ))}
          </div>
        </div>
        {showExportButton && exportParams && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              onClick={handleExport}
              disabled={loading}
              style={{
                background: '#00b86b',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 17,
                fontWeight: 700,
                padding: '12px 32px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'background 0.18s',
              }}
              type="button"
            >
              {loading ? t('ai.generating', 'Génération...') : t('ai.generateExport', 'Générer l\'export')}
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AIExportAssistant; 