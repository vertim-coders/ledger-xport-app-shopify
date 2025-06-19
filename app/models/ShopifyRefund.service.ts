export class ShopifyRefundService {
    static async getRefunds(admin: any, startDate: string, endDate: string) {
        try {
            // Format dates for GraphQL query
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            const query = `
                query GetRefunds {
                    orders(first: 250) {
                        edges {
                            node {
                                id
                                name
                                refunds {
                                    id
                                    createdAt
                                    note
                                    refundLineItems(first: 10) {
                                        nodes {
                                            id
                                            quantity
                                            restockType
                                            subtotalSet {
                                                shopMoney {
                                                    amount
                                                    currencyCode
                                                }
                                            }
                                            totalTaxSet {
                                                shopMoney {
                                                    amount
                                                    currencyCode
                                                }
                                            }
                                            lineItem {
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
                                    }
                                    transactions(first: 10) {
                                        nodes {
                                            id
                                            amountSet {
                                                shopMoney {
                                                    amount
                                                    currencyCode
                                                }
                                            }
                                            kind
                                            status
                                            gateway
                                            processedAt
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            const response = await admin.graphql(query);

            const data = await response.json();

            if (data.errors) {
                console.log("GraphQL errors:", data.errors);
                return null;
            }

            const refunds = data.data?.orders?.edges?.flatMap((edge: any) => 
                edge.node.refunds.map((refund: any) => ({
                    id: refund.id,
                    order_id: edge.node.id,
                    order_name: edge.node.name,
                    created_at: refund.createdAt,
                    note: refund.note,
                    refund_line_items: refund.refundLineItems.nodes.map((item: any) => ({
                        id: item.id,
                        quantity: item.quantity,
                        restock_type: item.restockType,
                        subtotal: item.subtotalSet.shopMoney.amount,
                        total_tax: item.totalTaxSet.shopMoney.amount,
                        currency: item.subtotalSet.shopMoney.currencyCode,
                        line_item: {
                            id: item.lineItem.id,
                            name: item.lineItem.name,
                            title: item.lineItem.title,
                            quantity: item.lineItem.quantity,
                            sku: item.lineItem.sku,
                            taxable: item.lineItem.taxable,
                            tax_lines: item.lineItem.taxLines.map((tax: any) => ({
                                rate: tax.rate,
                                title: tax.title
                            })),
                            variant: {
                                id: item.lineItem.variant.id,
                                legacy_resource_id: item.lineItem.variant.legacyResourceId,
                                sku: item.lineItem.variant.sku,
                                title: item.lineItem.variant.title,
                                price: item.lineItem.variant.price
                            },
                            product: {
                                id: item.lineItem.product.id,
                                legacy_resource_id: item.lineItem.product.legacyResourceId,
                                product_type: item.lineItem.product.productType
                            }
                        }
                    })),
                    transactions: refund.transactions.nodes.map((transaction: any) => ({
                        id: transaction.id,
                        amount: transaction.amountSet.shopMoney.amount,
                        currency: transaction.amountSet.shopMoney.currencyCode,
                        kind: transaction.kind,
                        status: transaction.status,
                        gateway: transaction.gateway,
                        processed_at: transaction.processedAt
                    }))
                }))
            ) || [];

            console.log("Fetched Shopify Refunds:", refunds);
            return refunds;
        } catch (error) {
            console.log("Error fetching refunds:", error);
            return null;
        }
    }
} 