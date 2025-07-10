# Mise à jour vers App Bridge v4+ pour l'API Reviews

## Contexte

L'API Reviews de Shopify App Bridge permet d'afficher une fenêtre modale native pour demander des avis sur l'application directement dans l'admin Shopify. Cette API est disponible à partir de la version 4.0.0 d'App Bridge.

## État actuel

- **Version actuelle** : `@shopify/app-bridge@3.7.10`
- **Version requise** : `@shopify/app-bridge@4.0.0+`
- **Statut** : Fallback vers l'App Store activé

## Étapes pour la mise à jour

### 1. Mettre à jour les dépendances

```bash
npm install @shopify/app-bridge@latest @shopify/app-bridge-react@latest
```

### 2. Vérifier les breaking changes

Consulter la [documentation de migration](https://shopify.dev/docs/api/app-bridge/migrate) pour les changements entre v3 et v4.

### 3. Activer l'API Reviews

Dans `app/components/FeedbackSection.tsx`, décommenter le code de l'API Reviews :

```typescript
// Remplacer le code de fallback par :
const { createApp } = await import('@shopify/app-bridge');
const { reviews } = await import('@shopify/app-bridge/actions');

const app = createApp({
  apiKey: process.env.SHOPIFY_API_KEY || '',
  host: host,
});

const reviewsModal = reviews(app);
const result = await reviewsModal.dispatch(reviews.Action.OPEN);

// Gestion des résultats...
```

### 4. Tester l'implémentation

1. Déployer la mise à jour
2. Tester dans l'admin Shopify
3. Vérifier que la modale native s'affiche correctement

## Codes de réponse de l'API Reviews

| Code | Message | Description |
|------|---------|-------------|
| `success` | Modalité d'évaluation affichée | ✅ Succès |
| `mobile-app` | Non supporté sur mobile | ❌ Limitation plateforme |
| `already-reviewed` | Déjà évalué | ❌ Utilisateur a déjà donné un avis |
| `annual-limit-reached` | Limite annuelle atteinte | ❌ Trop de demandes cette année |
| `cooldown-period` | Période de refroidissement | ❌ Demande récente (60 jours) |
| `merchant-ineligible` | Non autorisé | ❌ Permissions insuffisantes |

## Avantages de l'API Reviews native

1. **Expérience utilisateur** : Modale native Shopify, pas de redirection
2. **Intégration** : Parfaitement intégrée dans l'admin
3. **Gestion automatique** : Shopify gère les limites et restrictions
4. **Feedback direct** : L'avis va directement à l'App Store

## Fallback actuel

En attendant la mise à jour, le bouton redirige vers l'App Store avec un message informatif.

## Notes importantes

- L'API Reviews ne fonctionne que dans l'admin Shopify (pas en standalone)
- Les avis sont gérés par Shopify, pas accessibles via l'API
- Respecter les bonnes pratiques de timing pour les demandes d'avis 