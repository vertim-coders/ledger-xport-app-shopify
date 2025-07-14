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
  // Détecter la langue de la boutique Shopify
  let detectedLanguage = "fr"; // Fallback par défaut
  
  try {
    // Essayer de récupérer la session Shopify pour détecter la langue
    const { session } = await authenticate.admin(request);
    if (session?.shop && session?.accessToken) {
      detectedLanguage = await LanguageService.detectShopLanguage(session.shop, session.accessToken);
      console.log('Detected language for shop:', session.shop, 'Language:', detectedLanguage);
    }
  } catch (error) {
    // Si l'authentification échoue (page de login, etc.), utiliser le fallback
    console.log("Could not detect language from session, using fallback:", error);
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  // Injecter la langue détectée dans le HTML
  const htmlWithLanguage = markup.replace(
    'window.__SHOP_LANGUAGE__ = "fr"; // Remplacer par la langue détectée dynamiquement côté serveur',
    `window.__SHOP_LANGUAGE__ = "${detectedLanguage}";`
  );

          responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + htmlWithLanguage, {
              status: responseStatusCode,
    headers: responseHeaders,
  });
}
