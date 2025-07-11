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
} from '@shopify/polaris';
import { PlusIcon, AlertCircleIcon, NoteIcon, ChatIcon, ExternalIcon, EmailIcon, PlayIcon, CalendarIcon } from '@shopify/polaris-icons';
import { Crisp } from "crisp-sdk-web";
// ConversationIcon ou MessageIcon n'est pas certain, on testera l'un puis l'autre
// import { ConversationIcon } from '@shopify/polaris-icons';
// import { MessageIcon } from '@shopify/polaris-icons';

const APP_NAME = 'Ledger Xport'; // À personnaliser si besoin

const FeedbackSection: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const [showReviewMessage, setShowReviewMessage] = useState(false);

  const handleAppReview = () => {
    // Fonctionnalité en cours de développement
    setShowReviewMessage(true);
  };

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
              <Button onClick={() => {
                Crisp.chat.open();
              }} icon={<Icon source={ChatIcon} />}>
                Démarrer un chat en direct
              </Button>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginTop: 8,
                marginLeft: 35
              }}>
                <Link url="mailto:support@ledgerxport.com" external>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={EmailIcon} tone="base" />
                    Envoyez-nous un email
                  </span>
                </Link>
                <Link url="/demo" external={false}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={PlayIcon} tone="base" />
                    Accéder à la démo
                  </span>
                </Link>
                <Link url="https://help.ledgerxport.com" external>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={ExternalIcon} tone="base" />
                    Visitez le centre d'aide
                  </span>
                </Link>
                <Link url="/plans" external={false}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={CalendarIcon} tone="base" />
                    Accéder au plan
                  </span>
                </Link>
              </div>
            </BlockStack>
          </div>
        </div>
      </Card>

      {/* Modal Live Chat */}
      {/* Modal Review Feature */}
      <Modal
        open={showReviewMessage}
        onClose={() => setShowReviewMessage(false)}
        title="Fonctionnalité en cours de développement"
        primaryAction={{ content: 'Fermer', onAction: () => setShowReviewMessage(false) }}
      >
        <Modal.Section>
          <BlockStack gap="300">
            <Text as="p">
              La fonctionnalité d'avis intégrée est actuellement en cours de développement.
            </Text>
            <Text as="p" tone="subdued">
              Nous travaillons sur l'intégration de l'API Reviews de Shopify App Bridge pour vous offrir une expérience d'évaluation fluide directement dans l'interface d'administration.
            </Text>
            <Text as="p">
              En attendant, vous pouvez toujours laisser un avis sur notre page App Store.
            </Text>
            <Button 
              onClick={() => {
                window.open('https://apps.shopify.com/ledger-xport', '_blank');
                setShowReviewMessage(false);
              }}
              variant="primary"
            >
              Aller sur l'App Store
            </Button>
          </BlockStack>
        </Modal.Section>
      </Modal>

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