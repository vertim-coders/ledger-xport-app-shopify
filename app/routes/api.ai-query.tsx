import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Refuser les requêtes GET sur ce endpoint API
  return json({ error: 'Méthode non autorisée' }, { status: 405 });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { query, language = 'fr' } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return json({ error: 'Requête invalide' }, { status: 400 });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return json({ error: 'Configuration API manquante' }, { status: 500 });
    }

    console.log("[AI-DEBUG] Clé Replicate utilisée :", process.env.REPLICATE_API_TOKEN);
    
    // Adapter le prompt selon la langue
    const languagePrompts = {
      fr: `Tu es un assistant IA spécialisé dans l'analyse de données e-commerce. Réponds en français de manière naturelle et amicale. L'utilisateur te demande: "${query}". Analyse sa demande et explique ce que tu comprends.`,
      en: `You are an AI assistant specialized in e-commerce data analysis. Respond in English in a natural and friendly way. The user asks you: "${query}". Analyze their request and explain what you understand.`,
      es: `Eres un asistente de IA especializado en análisis de datos de comercio electrónico. Responde en español de manera natural y amigable. El usuario te pregunta: "${query}". Analiza su solicitud y explica lo que entiendes.`
    };

    const prompt = languagePrompts[language as keyof typeof languagePrompts] || languagePrompts.fr;

    const replicateRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '7a216605843d87f5426a10d2cc6940485a232336ed04d655ef86b91e020e9210',
        input: { prompt },
      }),
    });

    console.log("[AI-DEBUG] Status Replicate:", replicateRes.status);
    const replicateData = await replicateRes.json();
    console.log("[AI-DEBUG] Réponse Replicate:", replicateData);

    if (!replicateRes.ok) {
      console.error("[AI-DEBUG] Erreur Replicate:", replicateData);
      return json({ 
        error: replicateData.detail || 'Erreur lors de l\'appel à l\'IA',
        canExport: false 
      }, { status: replicateRes.status });
    }

    // Simuler une réponse si l'API n'est pas disponible
    const message = replicateData.output?.[0] || `Je comprends votre demande concernant "${query}". Je peux vous aider à analyser vos données et préparer un export adapté.`;

    return json({ 
      message,
      canExport: true 
    });

  } catch (err: any) {
    console.error("[AI-DEBUG] Erreur dans l'action /api/ai-query:", err);
    return json({ error: err.message || 'Erreur serveur' }, { status: 500 });
  }
}; 