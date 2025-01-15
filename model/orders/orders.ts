import { db } from "@/lib/db";

export async function createOrder(price: number, user_id: number) {
    const createdAt = new Date();
    const updatedAt = new Date();

    const order = await db.orders.create({
        data: {
            user_id: user_id,
            is_payment_online: 1,
            total_price: price,
            createdAt: createdAt.toString(),
            updatedAt: updatedAt.toString(),
            status: 0
        },
    });

    return order;
}


export async function createOrderDetail({ order_id, product_size_id, quantity, total_price }: { order_id: number, product_size_id: number, quantity: number, total_price: number }) {
    const createdAt = new Date();
    const updatedAt = new Date();

    const order_detail = await db.order_detail.create({
        data: {
            order_id: order_id,
            quantity: quantity,
            price: total_price,
            product_size_id: product_size_id,
            createAt: createdAt.toString(),
            updatedAt: updatedAt.toString()
        },
    });

    return order_detail;
}


export async function loadOrders(user_id: number) {
    const orders = await db.orders.findMany({
        where: { user_id }
    })

    return orders;
}


export async function getOrderDetails(order_id: string) {

    try {
        const order_details = await db.order_detail.findMany({
            where: { order_id: parseInt(order_id) },
        });

        return order_details;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw new Error("Failed to fetch order details");
    }
}


export async function loadAllOrders() {
    const orders = await db.orders.findMany();

    return orders;
}


export async function updateOrderStatus(id: number, status: number) {
    try {
        // Update the order status
        const updatedOrder = await db.orders.update({
            where: { id },
            data: { status },
        });

        return updatedOrder;
    } catch (error) {
        console.error("Error updating order status:", error);
    }
}


export async function getTopOrders() {
    const productQuantities = await db.order_detail.groupBy({
        by: ['product_size_id'],
        _sum: {
            quantity: true,
        },
    });

    const productTotals = new Map<number, { product_id: number; totalQuantity: number }>();

    for (const item of productQuantities) {
        const productSize = await db.product_size.findUnique({
            where: { id: item.product_size_id },
        });

        if (productSize) {
            const existing = productTotals.get(productSize.product_id);
            if (existing) {
                existing.totalQuantity += item._sum.quantity ?? 0;
            } else {
                productTotals.set(productSize.product_id, {
                    product_id: productSize.product_id,
                    totalQuantity: item._sum.quantity ?? 0,
                });
            }
        }
    }

    const topProducts = Array.from(productTotals.values())
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 5);

    const detailedProducts = await Promise.all(
        topProducts.map(async (item) => {
            const product = await db.products.findUnique({
                where: { id: item.product_id },
            });

            const productImage = await db.product_image.findUnique({
                where: { product_id: item.product_id },
            });

            return {
                product: {
                    id: product?.id,
                    name: product?.name,
                    description: product?.description,
                    price: product?.price,
                    image_url: productImage?.main_url, // Fetch the main image URL
                    type: product?.type,
                    brand: product?.brand,
                },
                totalQuantity: item.totalQuantity,
            };
        })
    );

    return detailedProducts;
}


export async function getOrderTypes() {
    // Step 1: Get order counts grouped by product_size_id
    const orderCounts = await db.order_detail.groupBy({
        by: ['product_size_id'],
        _count: {
            _all: true,
        },
    });

    // Step 2: Fetch product details using product_id from product_size
    const productTypeCounts: Record<string, number> = {};

    for (const order of orderCounts) {
        // Fetch the product_size entry
        const productSize = await db.product_size.findUnique({
            where: { id: order.product_size_id },
        });

        if (productSize) {
            // Fetch the related product details
            const product = await db.products.findUnique({
                where: { id: productSize.product_id },
            });

            const productType = product?.type;

            if (productType) {
                if (!productTypeCounts[productType]) {
                    productTypeCounts[productType] = 0;
                }
                productTypeCounts[productType] += order._count._all;
            }
        }
    }

    const totalOrders = Object.values(productTypeCounts).reduce((sum, count) => sum + count, 0);

    // Step 3: Format the data for the chart
    const formattedData = Object.entries(productTypeCounts).map(([type, count]) => ({
        id: type,
        value: ((count / totalOrders) * 100).toFixed(2), // Percentage
        label: type,
    }));

    return formattedData;
}


export async function getOrderTypeCounts() {
    const orderCounts = await db.order_detail.groupBy({
        by: ['product_size_id'],
        _count: {
            _all: true,
        },
    });

    const productTypeCounts: Record<string, number> = {};

    for (const order of orderCounts) {
        const productSize = await db.product_size.findUnique({
            where: { id: order.product_size_id },
        });

        if (productSize) {
            const product = await db.products.findUnique({
                where: { id: productSize.product_id },
            });

            const productType = product?.type;

            if (productType) {
                if (!productTypeCounts[productType]) {
                    productTypeCounts[productType] = 0;
                }
                productTypeCounts[productType] += order._count._all;
            }
        }
    }

    const formattedData = Object.entries(productTypeCounts).map(([type, count]) => ({
        type,
        orders: count,
    }));

    return formattedData;
}


export async function getProductStats() {
    // Get the count of products by type
    const productCounts = await db.products.groupBy({
        by: ['type'],
        _count: {
            id: true,
        },
    });

    // Get all products of interest (shoes, clothes, accessories) with their IDs and types
    const products = await db.products.findMany({
        where: {
            type: {
                in: ['shoes', 'clothes', 'accessories'],
            },
        },
        select: {
            id: true,
            type: true,
        },
    });

    // Create a map of product_id to type
    const productTypeMap: { [key: number]: string } = products.reduce((map, product) => {
        map[product.id] = product.type;
        return map;
    }, {} as { [key: number]: string });

    // Get all product_size_id corresponding to the selected products
    const productSizes = await db.product_size.findMany({
        where: {
            product_id: {
                in: Object.keys(productTypeMap).map(Number), // Map product IDs
            },
        },
        select: {
            id: true,
            product_id: true,
        },
    });

    // Get all order details for the relevant product sizes
    const orderCounts = await db.order_detail.findMany({
        where: {
            product_size_id: {
                in: productSizes.map((size) => size.id),
            },
        },
    });

    // Group orders by product type and sum the quantities
    const groupedOrderCounts = orderCounts.reduce((acc: { [key: string]: number }, order) => {
        const productId = productSizes.find((size) => size.id === order.product_size_id)?.product_id;

        if (productId) {
            const type = productTypeMap[productId]; // Get product type from the map
            if (type) {
                if (!acc[type]) acc[type] = 0;
                acc[type] += order.quantity; // Sum the quantities
            }
        }
        return acc;
    }, {});

    // Get the count of favorited products by type
    const favoriteCounts = await db.favorites.groupBy({
        by: ['product_id'],
        _count: {
            product_id: true,
        },
        where: {
            product_id: {
                in: Object.keys(productTypeMap).map(Number),
            },
        },
    });

    // Combine the data and return
    const stats = ['shoes', 'clothes', 'accessories'].map((type) => {
        const productCount = productCounts.find((item) => item.type === type)?._count.id || 0;
        const orderCount = groupedOrderCounts[type] || 0; // Get order count from grouped data
        const favoriteCount = favoriteCounts.find((item) => productTypeMap[item.product_id] === type)?._count.product_id || 0;

        return {
            type,
            products: productCount,
            orders: orderCount,
            favorites: favoriteCount,
        };
    });

    return stats;
}


export async function updateQuantity(id: any){
    const orderDetails = await db.order_detail.findMany({
        where: { order_id: id },
    });

    for (const detail of orderDetails) {
        const productSize = await db.product_size.findUnique({
            where: { id: detail.product_size_id },
        });

        if (productSize) {
            const remainingQuantity = productSize.quantity - detail.quantity;

            if (remainingQuantity > 0) {
                // Reduce quantity by the amount in the order
                await db.product_size.update({
                    where: { id: productSize.id },
                    data: { quantity: remainingQuantity },
                });
            } else {
                // Delete the product size if the remaining quantity is 0 or less
                await db.product_size.delete({
                    where: { id: productSize.id },
                });
            }
        }
    }
}


export async function calculateRevenue() {
    try {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const allOrders = await db.orders.findMany({
            where: {
                status: 3,
            },
        });

        const totalRevenue = allOrders
            .filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startOfMonth && orderDate <= endOfMonth;
            })
            .reduce((sum, order) => sum + order.total_price, 0);

        console.log("Total revenue for the month:", totalRevenue);
        return totalRevenue;
    } catch (error) {
        console.error("Error calculating monthly revenue:", error);
    }
}



















