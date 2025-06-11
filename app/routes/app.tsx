import { json, type HeadersFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { Frame } from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { AppNavbar } from "../components/Navigation/AppNavbar";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Frame>
        <AppNavbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </Frame>
    </AppProvider>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return new Headers(headersArgs.loaderHeaders);
};
