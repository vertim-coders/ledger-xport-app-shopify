import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  Select,
  Button,
  Text,
  Banner,
  List,
  LegacyStack,
  Toast,
  Frame,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { useState } from "react";
import fiscalRegimesData from "../data/fiscal-regimes.json";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { fiscalRegime: true },
  });

  return json({
    fiscalRegime: shop?.fiscalRegime || null,
    regimes: fiscalRegimesData.regimes,
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const regimeCode = formData.get("fiscalRegime") as string;

  const selectedRegime = fiscalRegimesData.regimes.find(r => r.code === regimeCode);
  if (!selectedRegime) {
    throw new Error("Invalid fiscal regime selected");
  }

  // Create or update the fiscal regime
  const fiscalRegime = await prisma.fiscalRegime.upsert({
    where: { code: selectedRegime.code },
    create: selectedRegime,
    update: selectedRegime,
  });

  // Update the shop with the selected regime
  await prisma.shop.update({
    where: { shopifyDomain: session.shop },
    data: { fiscalRegime: { connect: { id: fiscalRegime.id } } },
  });

  return json({ success: true });
};

export default function FiscalRegimeSettings() {
  const { fiscalRegime, regimes } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [selectedRegime, setSelectedRegime] = useState(fiscalRegime?.code || "");
  const [toastActive, setToastActive] = useState(false);

  const handleSubmit = () => {
    submit({ fiscalRegime: selectedRegime }, { method: "post" });
    setToastActive(true);
  };

  const toastMarkup = toastActive ? (
    <Toast
      content="Régime fiscal enregistré avec succès"
      onDismiss={() => setToastActive(false)}
    />
  ) : null;

  const selectedRegimeDetails = regimes.find(r => r.code === selectedRegime);

  return (
    <Frame>
    <Page
      title="Régime Fiscal"
      subtitle="Sélectionnez votre régime fiscal pour configurer les exports comptables"
    >
      <Layout>
        <Layout.Section>
          <Card>
            <FormLayout>
              <Select
                label="Régime Fiscal"
                  options={regimes.map(regime => ({
                    label: regime.name,
                    value: regime.code,
                  }))}
                value={selectedRegime}
                onChange={setSelectedRegime}
              />
              <Button onClick={handleSubmit} variant="primary">
                Enregistrer
              </Button>
            </FormLayout>
          </Card>
        </Layout.Section>

          {selectedRegimeDetails && (
        <Layout.Section>
          <Card>
                <LegacyStack vertical spacing="loose">
            <Text variant="headingMd" as="h2">
                    Détails du régime fiscal
                  </Text>
                  
                  <Text as="p">{selectedRegimeDetails.description}</Text>

                  <Text variant="headingMd" as="h3">
                    Pays concernés
            </Text>
                  <List type="bullet">
                    {selectedRegimeDetails.countries.map(country => (
                      <List.Item key={country}>{country}</List.Item>
                    ))}
                  </List>

                  <Text variant="headingMd" as="h3">
                    Logiciels compatibles
            </Text>
                  <List type="bullet">
                    {selectedRegimeDetails.compatibleSoftware.map(software => (
                      <List.Item key={software}>{software}</List.Item>
                    ))}
                  </List>

                  <Text variant="headingMd" as="h3">
                    Formats d'export supportés
                </Text>
                  <List type="bullet">
                    {selectedRegimeDetails.exportFormats.map(format => (
                      <List.Item key={format}>{format}</List.Item>
                    ))}
                  </List>

                  <Text variant="headingMd" as="h3">
                    Spécifications techniques
                </Text>
                  <List type="bullet">
                    <List.Item>Format de fichier : {selectedRegimeDetails.fileFormat}</List.Item>
                    <List.Item>Encodage : {selectedRegimeDetails.encoding}</List.Item>
                    <List.Item>Séparateur : {selectedRegimeDetails.separator}</List.Item>
                    <List.Item>Devise : {selectedRegimeDetails.currency}</List.Item>
                  </List>

                  <Text variant="headingMd" as="h3">
                    Colonnes requises
                </Text>
                  <List type="bullet">
                    {selectedRegimeDetails.requiredColumns.map(column => (
                      <List.Item key={column}>{column}</List.Item>
                    ))}
                  </List>

                  <Text variant="headingMd" as="h3">
                    Notes importantes
                </Text>
                  <Text as="p">{selectedRegimeDetails.notes}</Text>
                </LegacyStack>
          </Card>
        </Layout.Section>
          )}
      </Layout>
    </Page>
      {toastMarkup}
    </Frame>
  );
} 