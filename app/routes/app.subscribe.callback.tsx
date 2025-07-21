import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const chargeId = url.searchParams.get("charge_id");
  if (!chargeId) {
    throw new Error("Aucun charge_id fourni par Shopify.");
  }
  // Vérifier l'état du recurring charge
  const response = await fetch(`https://${session.shop}/admin/api/2023-10/recurring_application_charges/${chargeId}.json`, {
    headers: [
      ["X-Shopify-Access-Token", session.accessToken || ""],
      ["Content-Type", "application/json"],
      ["Accept", "application/json"]
    ]
  });
  const data = await response.json();
  const status = data.recurring_application_charge?.status;
  if (status === "active") {
    // Met à jour le statut d'abonnement dans la base
    await prisma.shop.update({
      where: { shopifyDomain: session.shop },
      data: {
        subscriptionStatus: "ACTIVE"
      }
    });
    return redirect("/app/dashboard");
  }
  // Si non actif, on reste sur la page d'abonnement
  return redirect("/app/subscribe");
};

export default function Callback() {
  return null;
} 