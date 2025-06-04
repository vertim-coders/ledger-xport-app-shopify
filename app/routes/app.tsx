import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { NavMenu } from "@shopify/app-bridge-react";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
          <Link to="/app/settings/company">Company settings</Link>
          <Link to="/app/settings/fiscal-regime">Fiscal regime settings</Link>
          <Link to="/app/dashboard">Dashboard</Link>
          <Link to="/app/reports/manual-export">Reports Manual</Link>
          </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage = typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
    ? error.message
    : "Unknown error";
  return <div>Erreur: {errorMessage}</div>;
}

export const headers: HeadersFunction = (headersArgs) => {
  return new Headers(headersArgs.loaderHeaders);
};
