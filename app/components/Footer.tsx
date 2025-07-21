import React from "react";
import { Box, Layout, Text, Link, InlineStack, Icon } from "@shopify/polaris";
import { FileIcon, CollectionFeaturedIcon, DockSideIcon, ChannelsIcon, ViewIcon } from "@shopify/polaris-icons";
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

const footerLinks = [
    { name: t('footer.changelog', 'Changelog'), href: "/changelog", icon: FileIcon  },
    { name: t('footer.featureRequest', 'Feature request'), href: "/feature-request", icon: CollectionFeaturedIcon },
    { name: t('footer.docs', 'Docs'), href: "/docs", icon: DockSideIcon },
    { name: t('footer.affiliateProgram', 'Affiliate program'), href: "/affiliate", icon: ChannelsIcon },
];

  return (
  <Box as="div" background="bg" paddingBlock={{ xs: '600', md: '800' }} paddingInline={{ xs: '400', md: '800' }}>
    <Layout>
      <Layout.Section>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <InlineStack gap="400">
            {footerLinks.map((l) => (
              <Link key={l.name} url={l.href} removeUnderline>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon source={l.icon} tone="subdued" />
                  <Text as="span" tone="subdued" variant="bodySm">
                    {l.name}
                  </Text>
                </span>
              </Link>
            ))}
          </InlineStack>
        </div>
      </Layout.Section>
    </Layout>
    
    {/* Barre explicative pour les liens */}
    <div style={{ 
      paddingTop: '16px', 
      paddingBottom: '8px', 
      marginTop: '16px',
      borderTop: '1px solid var(--p-border-subdued)',
      textAlign: 'center'
    }}>
      <Text as="p" tone="subdued" variant="bodyXs">
        {t('footer.usefulLinks', 'Liens utiles et ressources')}
      </Text>
    </div>
    
    <Box paddingBlockStart="400">
      <Text as="p" tone="subdued" variant="bodyXs" alignment="center">
        {t('footer.copyright', '© {year}. LedgerXport. All rights reserved.', { year: new Date().getFullYear() })}
      </Text>
    </Box>
  </Box>
);
};

export default Footer; 