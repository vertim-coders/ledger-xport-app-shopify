import React from "react";
import { Box, Layout, Text, Link, InlineStack, BlockStack, Icon } from "@shopify/polaris";
import { PlusIcon, EmailIcon, SearchIcon, RefreshIcon } from "@shopify/polaris-icons";

// Polaris n'a pas d'icônes Facebook/Twitter/Instagram, on utilise des icônes génériques
const socialLinks = [
  { name: "Facebook", href: "#", icon: PlusIcon },
  { name: "Twitter", href: "#", icon: EmailIcon },
  { name: "Instagram", href: "#", icon: SearchIcon },
  { name: "LinkedIn", href: "#", icon: RefreshIcon },
];

const servicesLinks = [
  { name: '1on1 Coaching', href: '#' },
  { name: 'Company Review', href: '#' },
  { name: 'Accounts Review', href: '#' },
  { name: 'HR Consulting', href: '#' },
  { name: 'SEO Optimisation', href: '#' },
];

const companyLinks = [
  { name: 'About', href: '#' },
  { name: 'Meet the Team', href: '#' },
  { name: 'Accounts Review', href: '#' },
];

const helpfulLinks = [
  { name: 'Contact', href: '#' },
  { name: 'FAQs', href: '#' },
  { name: 'Live Chat', href: '#' },
];

const legalLinks = [
  { name: 'Accessibility', href: '#' },
  { name: 'Returns Policy', href: '#' },
  { name: 'Refund Policy', href: '#' },
  { name: 'Hiring‑3 Statistics', href: '#' },
];

const linkGroups = [
  { title: 'Services', links: servicesLinks },
  { title: 'Company', links: companyLinks },
  { title: 'Helpful Links', links: helpfulLinks },
  { title: 'Legal', links: legalLinks },
];

const Footer: React.FC = () => (
  <Box as="div" background="bg" paddingBlock={{ xs: '600', md: '800' }} paddingInline={{ xs: '400', md: '800' }}>
    <Layout>
      <Layout.Section>
        <BlockStack gap="400">
          <Box>
            <img
              src="/assets/LedgerXportLogo.png"
              alt="LedgerXport Logo"
              style={{ maxHeight: '32px', height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          </Box>
          <Text as="p" tone="subdued" variant="bodySm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam molestias.
          </Text>
          <InlineStack gap="400">
            {socialLinks.map((l) => (
              <Link key={l.name} url={l.href} removeUnderline>
                <Icon source={l.icon} tone="subdued" accessibilityLabel={l.name} />
              </Link>
            ))}
          </InlineStack>
        </BlockStack>
      </Layout.Section>
      <Layout.Section>
        <Box width="100%">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '32px',
              minWidth: '0',
              minHeight: '0',
            }}
            id="footer-links"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '32px',
                minWidth: '0',
                minHeight: '0',
              }}
              id="footer-links-inner"
            >
              {linkGroups.map((group) => (
                <Box key={group.title}>
                  <Text as="p" fontWeight="medium" tone="base" variant="bodyMd">
                    {group.title}
                  </Text>
                  <Box paddingBlockStart="200">
                    <BlockStack gap="200" as="ul">
                      {group.links.map((l) => (
                        <li key={l.name} style={{ listStyle: 'none' }}>
                          <Link url={l.href} removeUnderline>
                            <Text as="span" tone="subdued" variant="bodySm">
                              {l.name}
                            </Text>
                          </Link>
                        </li>
                      ))}
                    </BlockStack>
                  </Box>
                </Box>
              ))}
            </div>
          </div>
        </Box>
      </Layout.Section>
    </Layout>
    <Box paddingBlockStart="600">
      <Text as="p" tone="subdued" variant="bodyXs" alignment="center">
        &copy; {new Date().getFullYear()}. Company Name. All rights reserved.
      </Text>
    </Box>
  </Box>
);

export default Footer; 