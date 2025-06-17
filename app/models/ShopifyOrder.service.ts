export class ShopifyOrderService {
    static async getOrders(admin: any, startDate: string, endDate: string) {
        try {
            // Format dates for GraphQL query
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            const query = `
                query GetOrders {
                    orders(first: 250) {
                        edges {
                            node {
                                id
                                name
                                createdAt
                                totalPriceSet {
                                    shopMoney {
                                        amount
                                        currencyCode
                                    }
                                }
                                subtotalPriceSet {
                                    shopMoney {
                                        amount
                                    }
                                }
                                totalTaxSet {
                                    shopMoney {
                                        amount
                                    }
                                }
                                customer {
                                    id
                                    firstName
                                    lastName
                                    email
                                    taxExempt
                                    defaultAddress {
                                        country
                                        province
                                        zip
                                    }
                                }
                                lineItems(first: 10) {
                                    nodes {
                                        id
                                        name
                                        title
                                        quantity
                                        sku
                                        taxable
                                        taxLines {
                                            rate
                                            title
                                        }
                                        variant {
                                            id
                                            legacyResourceId
                                            sku
                                            title
                                            price
                                        }
                                        product {
                                            id
                                            legacyResourceId
                                            productType
                                        }
                                    }
                                }
                                transactions {
                                    status
                                    kind
                                    gateway
                                    amountSet {
                                        shopMoney {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                                shippingAddress {
                                    country
                                    province
                                    zip
                                }
                                note
                                tags
                            }
                        }
                    }
                }
            `;

            //, {
            //    variables: {
            //        startDate: formattedStartDate,
            //        endDate: formattedEndDate
            //    }
            //}

            const response = await admin.graphql(query);

            const data = await response.json();

            if (data.errors) {
                console.log("GraphQL errors:", data.errors);
                return null;
            }

            return data.data?.orders?.edges?.map((edge: any) => ({
                id: edge.node.id,
                name: edge.node.name,
                created_at: edge.node.createdAt,
                total_price: edge.node.totalPriceSet.shopMoney.amount,
                subtotal_price: edge.node.subtotalPriceSet.shopMoney.amount,
                total_tax: edge.node.totalTaxSet.shopMoney.amount,
                currency: edge.node.totalPriceSet.shopMoney.currencyCode,
                customer: edge.node.customer ? {
                    ...edge.node.customer,
                    tax_exempt: edge.node.customer.taxExempt,
                    country: edge.node.customer.defaultAddress?.country,
                    province: edge.node.customer.defaultAddress?.province,
                    zip: edge.node.customer.defaultAddress?.zip
                } : null,
                line_items: edge.node.lineItems.nodes.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    title: item.title,
                    quantity: item.quantity,
                    sku: item.sku,
                    taxable: item.taxable,
                    tax_lines: item.taxLines,
//                    variant_id: item.variant.legacyResourceId,
//                    product_id: item.product.legacyResourceId,
//                    product_type: item.product.productType,
//                    price: item.variant.price
                })),
                shipping_address: edge.node.shippingAddress,
                transactions: edge.node.transactions,
                note: edge.node.note,
                tags: edge.node.tags
            })) || [];
        } catch (error) {
            console.log("Error fetching orders:", error);
            return null;
        }
    }
} 