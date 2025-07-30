export function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
}

export const getCurrencySymbol = (currencyCode: string) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
};
