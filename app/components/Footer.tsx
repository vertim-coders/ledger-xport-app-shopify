import React from "react";
import { Box, Layout, Text, Link, InlineStack, Icon } from "@shopify/polaris";
import { FileIcon, CollectionFeaturedIcon, DockSideIcon, ChannelsIcon, ViewIcon } from "@shopify/polaris-icons";

const footerLinks = [
  { name: "Changelog", href: "/changelog", icon: FileIcon  },
  { name: "Feature request", href: "/feature-request", icon: CollectionFeaturedIcon },
  { name: "Docs", href: "/docs", icon: DockSideIcon },
  { name: "Affiliate program", href: "/affiliate", icon: ChannelsIcon },
  { name: "Demos", href: "/demos", icon: ViewIcon },
];

const Footer: React.FC = () => (
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
    <Box paddingBlockStart="600">
      <Text as="p" tone="subdued" variant="bodyXs" alignment="center">
        &copy; {new Date().getFullYear()}. LedgerXport. All rights reserved.
      </Text>
    </Box>
  </Box>
);

export default Footer; 