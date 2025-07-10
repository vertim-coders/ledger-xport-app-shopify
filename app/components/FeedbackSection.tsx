import React, { useState } from 'react';
import {
  Card,
  Button,
  Text,
  Modal,
  Link,
  FooterHelp,
  Box,
  BlockStack,
  InlineStack,
  Icon,
  Toast,
} from '@shopify/polaris';
import { PlusIcon, AlertCircleIcon, NoteIcon, ChatIcon} from '@shopify/polaris-icons';
// ConversationIcon ou MessageIcon n'est pas certain, on testera l'un puis l'autre
// import { ConversationIcon } from '@shopify/polaris-icons';
// import { MessageIcon } from '@shopify/polaris-icons';

const APP_NAME = 'Ledger Xport'; // À personnaliser si besoin

const FeedbackSection: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState(false);

  const handleAppReview = async () => {
    try {
      // Vérifier si nous sommes dans l'admin Shopify
      const host = new URLSearchParams(window.location.search).get('host');
      if (!host) {
        setToastMessage('Cette fonctionnalité n\'est disponible que dans l\'admin Shopify');
        setToastError(true);
        setToastActive(true);
        return;
      }

      // Note: L'API Reviews de Shopify App Bridge est disponible à partir de la version 4.0.0
      // Le projet utilise actuellement la version 3.7.10, donc on utilise le fallback App Store
      // TODO: Mettre à jour @shopify/app-bridge vers v4+ pour utiliser l'API Reviews native
      
      console.log('Redirection vers l\'App Store pour laisser un avis');
      window.open('https://apps.shopify.com/ledger-xport', '_blank');
      setToastMessage('Redirection vers l\'App Store pour laisser un avis');
      setToastError(false);
      setToastActive(true);
      
      // Code pour l'API Reviews (à activer après mise à jour vers App Bridge v4+)
      /*
      const { createApp } = await import('@shopify/app-bridge');
      const { reviews } = await import('@shopify/app-bridge/actions');

      const app = createApp({
        apiKey: process.env.SHOPIFY_API_KEY || '',
        host: host,
      });

      const reviewsModal = reviews(app);
      const result = await reviewsModal.dispatch(reviews.Action.OPEN);

      if (!result.success) {
        let errorMessage = 'Impossible d\'afficher la fenêtre d\'évaluation';
        
        switch (result.code) {
          case 'mobile-app':
            errorMessage = 'La fenêtre d\'évaluation n\'est pas prise en charge sur les appareils mobiles';
            break;
          case 'already-reviewed':
            errorMessage = 'Vous avez déjà évalué cette application';
            break;
          case 'annual-limit-reached':
            errorMessage = 'La fenêtre d\'évaluation a déjà été affichée le nombre maximal de fois cette année';
            break;
          case 'cooldown-period':
            errorMessage = 'La fenêtre d\'évaluation a déjà été affichée récemment (période de refroidissement de 60 jours)';
            break;
          case 'merchant-ineligible':
            errorMessage = 'Vous n\'êtes pas autorisé à évaluer cette application';
            break;
          default:
            errorMessage = `${result.message || 'Erreur inconnue'}`;
        }
        
        setToastMessage(errorMessage);
        setToastError(true);
        setToastActive(true);
        console.log(`Review modal not displayed. Reason: ${result.code}: ${result.message}`);
      } else {
        setToastMessage('Fenêtre d\'évaluation affichée avec succès');
        setToastError(false);
        setToastActive(true);
      }
      */
    } catch (error) {
      console.error('Error requesting review:', error);
      setToastMessage('Erreur lors de l\'ouverture de la fenêtre d\'évaluation');
      setToastError(true);
      setToastActive(true);
    }
  };

  const toggleToast = () => setToastActive((active) => !active);

  return (
    <Box paddingBlockStart="400" paddingBlockEnd="400">
      <Card>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            width: '100%',
            minWidth: 0,
            minHeight: 0,
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* Bloc Share your feedback */}
          <div style={{ minWidth: 0 }}>
            <BlockStack gap="200">
              <Text as="h3" variant="headingMd">Partagez vos commentaires</Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Partagez votre expérience avec {APP_NAME} en laissant un avis sur l'App Store.
              </Text>
              <Button onClick={handleAppReview} icon={<Icon source={NoteIcon} />}>
                Donner un avis sur l'app
              </Button>
            </BlockStack>
          </div>

          {/* Bloc Get in touch */}
          <div style={{ minWidth: 0 }}>
            <BlockStack gap="200">
              <Text as="h3" variant="headingMd">Entrer en contact</Text>
              <Button onClick={() => setChatOpen(true)} icon={<Icon source={ChatIcon} />}>
                Démarrer un chat en direct
              </Button>
              <Link url="mailto:support@ledgerxport.com" external>
                Envoyez-nous un email
              </Link>
              <Link url="https://help.ledgerxport.com" external>
                Visitez le centre d'aide
              </Link>
            </BlockStack>
          </div>
        </div>
      </Card>

      {/* Modal Live Chat */}
      <Modal
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        title="Live Chat"
        primaryAction={{ content: 'Close', onAction: () => setChatOpen(false) }}
      >
        <Modal.Section>
          {/* Ici, intégrer le widget de chat réel (Shopify App Bridge, Intercom, etc.) */}
          <Text as="p">Live chat coming soon! (Intégration réelle à faire ici)</Text>
        </Modal.Section>
      </Modal>

      {/* Toast pour les messages de feedback */}
      {toastActive && (
        <Toast
          content={toastMessage}
          error={toastError}
          onDismiss={toggleToast}
          duration={4000}
        />
      )}

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .Polaris-Card > div {
            display: block !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default FeedbackSection; 