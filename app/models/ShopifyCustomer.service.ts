export class ShopifyCustomerService {
    static async getCustomers(admin: any, startDate: string, endDate: string) {
        try {
            // Format dates for GraphQL query
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            const query = `
                query GetCustomers($query: String!) {
                    customers(first: 250, query: $query) {
                        edges {
                            node {
                                id
                                firstName
                                lastName
                                email
                                phone
                                createdAt
                                tags
                                taxExempt
                                taxExemptions
                                defaultAddress {
                                    address1
                                    address2
                                    city
                                    province
                                    zip
                                    country
                                    countryCodeV2
                                }
                                orders(first: 1) {
                                    edges {
                                        node {
                                            totalPriceSet {
                                                shopMoney {
                                                    currencyCode
                                                }
                                            }
                                        }
                                    }
                                }
                                metafields(first: 10) {
                                    edges {
                                        node {
                                            key
                                            value
                                            namespace
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

            const customers = data.data?.customers?.edges?.map((edge: any) => ({
                ...edge.node,
                default_address: edge.node.defaultAddress,
                currency: edge.node.orders.edges[0]?.node.totalPriceSet.shopMoney.currencyCode,
                metafields: edge.node.metafields.edges.map((meta: any) => ({
                    key: meta.node.key,
                    value: meta.node.value,
                    namespace: meta.node.namespace
                }))
            })) || [];
            console.log("Fetched Shopify Customers:", customers);
            return customers;
        } catch (error) {
            console.log("Error fetching customers:", error);
            return null;
        }
    }
} 