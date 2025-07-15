import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { LanguageService } from "./services/language.service";
import { authenticate } from "./shopify.server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // Suppression de toute logique de détection automatique de langue

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  // Injecter la langue détectée dans le HTML
  const htmlWithLanguage = markup.replace(
    'window.__SHOP_LANGUAGE__ = "fr"; // Remplacer par la langue détectée dynamiquement côté serveur',
    `window.__SHOP_LANGUAGE__ = "fr";`
  );

          responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + htmlWithLanguage, {
              status: responseStatusCode,
    headers: responseHeaders,
  });
}
