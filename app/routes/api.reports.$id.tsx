import { json, type ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const reportId = params.id;

  if (!reportId) {
    throw new Response("Report ID is required", { status: 400 });
  }

  if (request.method === "DELETE") {
    await prisma.report.delete({
      where: { id: reportId },
    });

    return json({ success: true });
  }

  throw new Response("Method not allowed", { status: 405 });
}; 