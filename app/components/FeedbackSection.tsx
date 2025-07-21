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
import { useTranslation } from 'react-i18next';
// ConversationIcon ou MessageIcon n'est pas certain, on testera l'un puis l'autre
// import { ConversationIcon } from '@shopify/polaris-icons';
// import { MessageIcon } from '@shopify/polaris-icons';

const APP_NAME = 'Ledger Xport'; // À personnaliser si besoin

const FeedbackSection: React.FC = () => {
  const { t } = useTranslation();
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
              <Text as="h3" variant="headingMd">{t('feedback.shareFeedback', 'Partagez vos commentaires')}</Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                {t('feedback.shareExperience', 'Partagez votre expérience avec {appName} en laissant un avis sur l\'App Store.', { appName: APP_NAME })}
              </Text>
              <Button onClick={handleAppReview} icon={<Icon source={NoteIcon} />}>
                {t('feedback.rateApp', 'Donner un avis sur l\'app')}
              </Button>
            </BlockStack>
          </div>

          {/* Bloc Get in touch */}
          <div style={{ minWidth: 0 }}>
            <BlockStack gap="200">
              <Text as="h3" variant="headingMd">{t('feedback.getInTouch', 'Entrer en contact')}</Text>
              <Button onClick={() => {
                Crisp.chat.open();
              }} icon={<Icon source={ChatIcon} />}>
                {t('feedback.startChat', 'Démarrer un chat en direct')}
              </Button>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                marginTop: 8,
                justifyContent: 'center',
              }}>
                <Link url="mailto:support@ledgerxport.com" external>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={EmailIcon} tone="base" />
                    {t('feedback.sendEmail', 'Envoyez-nous un email')}
                  </span>
                </Link>
                <Link url="https://help.ledgerxport.com" external>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={ExternalIcon} tone="base" />
                    {t('feedback.visitHelp', 'Visitez le centre d\'aide')}
                  </span>
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                <Link url="/app/subscribe">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon source={CalendarIcon} tone="base" />
                    {t('feedback.accessPlan', 'Accéder au plan')}
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
        title={t('feedback.featureInDev', 'Fonctionnalité en cours de développement')}
        primaryAction={{ content: t('action.close', 'Fermer'), onAction: () => setShowReviewMessage(false) }}
      >
        <Modal.Section>
          <BlockStack gap="300">
            <Text as="p">
              {t('feedback.featureInDevDesc', 'Nous travaillons sur l\'intégration de l\'API Reviews de Shopify App Bridge pour vous offrir une expérience d\'évaluation fluide directement dans l\'interface d\'administration.')}
            </Text>
            <Text as="p" tone="subdued">
              {t('feedback.waitingReview', 'En attendant, vous pouvez toujours laisser un avis sur notre page App Store.')}
            </Text>
            <Button 
              onClick={() => {
                window.open('https://apps.shopify.com/ledger-xport', '_blank');
                setShowReviewMessage(false);
              }}
              variant="primary"
            >
              {t('feedback.goToAppStore', 'Aller sur l\'App Store')}
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