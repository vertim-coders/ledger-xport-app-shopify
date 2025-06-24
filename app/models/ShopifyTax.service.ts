export class ShopifyTaxService {
    static async getTaxes(admin: any, startDate: string, endDate: string) {
        try {
            // Format dates for GraphQL query
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            const query = `
                query GetTaxes($query: String!) {
                    orders(first: 250, query: $query) {
                        edges {
                            node {
                                id
                                name
                                createdAt
                                taxLines {
                                    title
                                    rate
                                    priceSet {
                                        shopMoney {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                                lineItems(first: 10) {
                                    nodes {
                                        id
                                        name
                                        title
                                        quantity
                                        taxLines {
                                            title
                                            rate
                                            priceSet {
                                                shopMoney {
                                                    amount
                                                    currencyCode
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            const variables = {
              query: `created_at:>=${formattedStartDate} AND created_at:<=${formattedEndDate}`
            };

            let data;
            if (typeof admin.graphql === "function") {
                const response = await admin.graphql(query, { variables });
                data = await response.json();
            } else if (typeof admin.request === "function") {
                data = await admin.request(query, { variables });
            } else {
                throw new Error("No valid Shopify GraphQL client found");
            }

            if (data.errors) {
                console.log("GraphQL errors:", data.errors);
                return null;
            }

            const taxes = data.data?.orders?.edges?.map((edge: any) => ({
                order_id: edge.node.id,
                order_name: edge.node.name,
                created_at: edge.node.createdAt,
                tax_lines: edge.node.taxLines.map((tax: any) => ({
                    title: tax.title,
                    rate: tax.rate,
                    amount: tax.priceSet.shopMoney.amount,
                    currency: tax.priceSet.shopMoney.currencyCode
                })),
                line_items: edge.node.lineItems.nodes.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    title: item.title,
                    quantity: item.quantity,
                    tax_lines: item.taxLines.map((tax: any) => ({
                        title: tax.title,
                        rate: tax.rate,
                        amount: tax.priceSet.shopMoney.amount,
                        currency: tax.priceSet.shopMoney.currencyCode
                    }))
                }))
            })) || [];

            return taxes;
        } catch (error) {
            console.log("Error fetching taxes:", error);
            return null;
        }
    }
} 