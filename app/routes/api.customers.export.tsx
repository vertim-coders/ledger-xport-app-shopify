import { json, type ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { CustomerService } from "../services/customer.service";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  try {
    const formData = await request.formData();
    
    // Récupérer les paramètres du formulaire
    const dateFrom = formData.get('dateFrom') as string;
    const dateTo = formData.get('dateTo') as string;
    const searchTerm = formData.get('searchTerm') as string;
    const columns = JSON.parse(formData.get('columns') as string) as string[];
    const format = formData.get('format') as 'CSV' | 'XLSX' | 'JSON';
    const columnOrder = JSON.parse(formData.get('columnOrder') as string) as string[];
    const shopId = formData.get('shopId') as string;

    // Validation des paramètres
    if (!columns || columns.length === 0) {
      return json({ error: 'Veuillez sélectionner au moins une colonne à exporter' }, { status: 400 });
    }

    if (!format || !['CSV', 'XLSX', 'JSON'].includes(format)) {
      return json({ error: 'Format d\'export invalide' }, { status: 400 });
    }

    // Créer le service d'export des clients
    const customerService = new CustomerService(admin);

    // Préparer les paramètres d'export
    const exportParams = {
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      searchTerm: searchTerm || '',
      columns,
      format,
      columnOrder: columnOrder.length > 0 ? columnOrder : columns, // Utiliser l'ordre spécifié ou l'ordre par défaut
      shopId: shopId || ''
    };

    // Exporter les clients
    const result = await customerService.exportCustomers(exportParams);

    // Retourner le fichier
    return new Response(result.data, {
      headers: {
        'Content-Type': result.contentType,
        'Content-Disposition': `attachment; filename="${result.filename}"`,
      },
    });

  } catch (error) {
    console.error('Erreur lors de l\'export des clients:', error);
    
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    
    return json({ error: 'Erreur inconnue lors de l\'export des clients' }, { status: 500 });
  }
}; 