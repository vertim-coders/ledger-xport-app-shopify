import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  Text,
  Toast,
  Frame,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { ExportFormat, FiscalRegime } from "@prisma/client";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { companyParams: true },
  });

  return json({
    settings: shop?.companyParams || null,
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const settings = {
    companyName: formData.get("companyName") as string,
    country: formData.get("country") as string,
    currency: formData.get("currency") as string,
    vatRate: parseFloat(formData.get("vatRate") as string),
    defaultFormat: formData.get("defaultExportFormat") as ExportFormat,
  };

  // First, ensure the user exists
  const user = await prisma.user.upsert({
    where: { id: session.id },
    create: {
      id: session.id,
      email: session.shop, // Using shop domain as email temporarily
      firstName: "",
      lastName: "",
    },
    update: {},
  });

  // Then, ensure the shop exists
  const shop = await prisma.shop.upsert({
    where: { shopifyDomain: session.shop },
    create: {
      id: session.shop,
      shopifyDomain: session.shop,
      name: session.shop,
      domain: session.shop,
      accessToken: session.accessToken || "",
      fiscalRegimeId: (await prisma.fiscalRegime.findFirst({ where: { code: "OHADA" } }))?.id,
      userId: user.id,
    },
    update: {},
  });

  // Finally, update or create the settings
  await prisma.companyParams.upsert({
    where: {
      shopId: shop.id,
    },
    create: {
      ...settings,
      userId: user.id,
      shopId: shop.id,
    },
    update: settings,
  });

  return json({ success: true });
};

export default function CompanySettings() {
  const { settings } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [formData, setFormData] = useState({
    companyName: settings?.companyName || "",
    country: settings?.country || "",
    currency: settings?.currency || "EUR",
    vatRate: settings?.vatRate?.toString() || "",
    defaultExportFormat: settings?.defaultFormat || "CSV",
  });
  const [toastActive, setToastActive] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    submit(data, { method: "post" });
    setToastActive(true);
  };

  const toastMarkup = toastActive ? (
    <Toast
      content="Paramètres enregistrés avec succès"
      onDismiss={() => setToastActive(false)}
    />
  ) : null;

  return (
    <Frame>
    <Page
      title="Paramètres de l'entreprise"
      subtitle="Configurez les informations de votre entreprise pour les exports comptables"
    >
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="Nom de l'entreprise"
                  name="companyName"
                  value={formData.companyName}
                  onChange={value => handleChange("companyName", value)}
                  autoComplete="organization"
                />

                <Select
                  label="Devise"
                  name="currency"
                  options={[
                    { label: "EUR (€)", value: "EUR" },
                    { label: "USD ($)", value: "USD" },
                    { label: "CAD ($)", value: "CAD" },
                    { label: "XOF (CFA)", value: "XOF" },
                  ]}
                  value={formData.currency}
                  onChange={value => handleChange("currency", value)}
                />

                <TextField
                  label="Taux de TVA (%)"
                  name="vatRate"
                  type="number"
                  value={formData.vatRate}
                  onChange={value => handleChange("vatRate", value)}
                  autoComplete="off"
                    min={0}
                    max={100}
                    step={0.1}
                />

                <Select
                  label="Format d'export par défaut"
                  name="defaultExportFormat"
                  options={[
                    { label: "CSV", value: "CSV" },
                    { label: "JSON", value: "JSON" },
                    { label: "PDF", value: "PDF" },
                    { label: "XML", value: "XML" },
                  ]}
                  value={formData.defaultExportFormat}
                  onChange={value => handleChange("defaultExportFormat", value)}
                />

                  <input type="hidden" name="country" value={formData.country} />

                <Button submit variant="primary">
                  Enregistrer les paramètres
                </Button>
              </FormLayout>
            </form>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text variant="headingMd" as="h2">
              À propos des paramètres
            </Text>
            <Text as="p">
              Ces paramètres seront utilisés pour générer vos exports comptables.
              Assurez-vous que les informations sont exactes pour éviter des erreurs
              dans vos rapports.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
      {toastMarkup}
    </Frame>
  );
} 