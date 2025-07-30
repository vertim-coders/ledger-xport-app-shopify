import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { InvoiceService } from "../services/invoice.service";

export async function action({ request }: LoaderFunctionArgs) {
  const { admin, session } = await authenticate.admin(request);

  try {
    const formData = await request.formData();
    const dateFrom = formData.get('dateFrom') as string;
    const dateTo = formData.get('dateTo') as string;
    const status = formData.get('status') as string;
    const client = formData.get('client') as string;
    const format = formData.get('format') as 'PDF' | 'XML' | 'CSV';
    const template = parseInt(formData.get('template') as string);

    // Récupérer le shopId
    const { prisma } = await import('../db.server');
    const shop = await prisma.shop.findUnique({
      where: { shopifyDomain: session.shop }
    });

    if (!shop) {
      return json({ error: 'Shop non trouvé' }, { status: 404 });
    }

    // Validation des paramètres
    if (!format || !['PDF', 'XML', 'CSV'].includes(format)) {
      return json({ error: 'Format invalide' }, { status: 400 });
    }

    if (format === 'PDF' && (!template || template < 1 || template > 9)) {
      return json({ error: 'Template invalide pour le format PDF' }, { status: 400 });
    }

    // Créer le service d'export des factures
    const invoiceService = new InvoiceService(admin);

    // Paramètres d'export
    const exportParams = {
      dateFrom: dateFrom || '',
      dateTo: dateTo || '',
      status: status || 'All',
      client: client || '',
      format,
      template: template || 1,
      shopId: shop.id
    };

    // Exporter les factures
    const result = await invoiceService.exportInvoices(exportParams);

    // Retourner le fichier
    return new Response(result.data, {
      headers: {
        'Content-Type': result.contentType,
        'Content-Disposition': `attachment; filename="${result.filename}"`,
      },
    });

  } catch (error) {
    console.error('Erreur lors de l\'export des factures:', error);
    
    // Retourner le message d'erreur spécifique
    let errorMessage = 'Erreur lors de l\'export des factures';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return json(
      { 
        error: errorMessage
      }, 
      { status: 500 }
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ message: 'Cette route ne supporte que les requêtes POST' }, { status: 405 });
}