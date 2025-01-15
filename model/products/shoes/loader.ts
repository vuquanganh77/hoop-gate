import { db } from "@/lib/db";

interface Filters {
    minPrice?: string;
    maxPrice?: string;
    brands?: string;
    size?: string;
    sort?: string;
    search?: string;
}

export async function getAllShoes(filters: Filters = {}) {

    const { minPrice, maxPrice, brands, size, sort, search } = filters;

    const whereClause: Record<string, any> = { type: "shoes" };

    if (minPrice) whereClause.price = { ...whereClause.price, gte: parseFloat(minPrice) };
    if (maxPrice) whereClause.price = { ...whereClause.price, lte: parseFloat(maxPrice) };

    if (brands) {
        const brandArray = brands.split(",");
        whereClause.brand = { in: brandArray };
    }

    if (search) {
        whereClause.name = { contains: search}; // Search by name, case insensitive
    }

    if (size) {
        const sizeExists = await db.product_size.findFirst({
            where: {
                size: parseInt(size, 10),
            },
        });
        console.log("so luong", sizeExists);

        if (sizeExists) whereClause.id = sizeExists.product_id;
        else return [];
    }

    // Add sorting based on the selected criteria
    let orderBy: Record<string, any> = {};

    switch (sort) {
        case "priceLowHigh":
            orderBy = { price: "asc" };
            break;
        case "priceHighLow":
            orderBy = { price: "desc" };
            break;
        case "ratingLowHigh":
            orderBy = { average_rating: "asc" };
            break;
        case "ratingHighLow":
            orderBy = { average_rating: "desc" };
            break;
        case "nameAZ":
            orderBy = { name: "asc" };
            break;
        case "nameZA":
            orderBy = { name: "desc" };
            break;
        default:
            break;
    }

    const shoes = await db.products.findMany({
        where: whereClause,
        orderBy: orderBy, // Apply sorting here
    });

    const shoesWithDetails = await Promise.all(
        shoes.map(async (shoe) => {
            // get quantity
            const quantitySum = await db.product_size.aggregate({
                _sum: {
                    quantity: true,
                },
                where: {
                    product_id: shoe.id,
                },
            });

            // get main_url 
            const image = await db.product_image.findFirst({
                where: {
                    product_id: shoe.id,
                },
                select: {
                    main_url: true,
                    urls: true,
                },
            });


            // Get average star rating
            const ratingAvg = await db.comments.aggregate({
                _avg: {
                    star: true,
                },
                where: {
                    product_id: shoe.id,
                },
            });

            const sizes = await db.product_size.groupBy({
                by: ['size'], // Group by size
                where: {
                    product_id: shoe.id, // Filter by product ID
                },
                _sum: {
                    quantity: true, // Sum the quantity for each group
                },
            });

            const productSizes = sizes.map(item => ({
                size: item.size,
                quantity: item._sum.quantity, // Access summed quantity
            }));

            return {
                ...shoe,
                quantity: quantitySum._sum.quantity || 0, // Thêm trường tổng quantity
                main_url: image?.main_url || null, // Thêm trường `main_url` từ bảng `product_image`
                gallery: image?.urls || null, // Thêm trường `urls` từ bảng `product_image`
                average_rating: ratingAvg._avg.star || 5, // Average star rating
                sizes: productSizes,
            };
        })
    );

    return shoesWithDetails;
}

export async function testQuery() {

    await db.products.findMany({
        where: {
            name: {
                contains: 'search',
            },
        },
    });
    console.log(testQuery);

}


export async function getShoesDetailById({ id }: { id: number }) {
    try {
        // Fetch basic shoe details
        const shoes = await db.products.findUnique({ where: { id: id } });;

        if (!shoes) {
            return null; // Return null if the shoe doesn't exist
        }

        // Fetch total quantity
        const quantitySum = await db.product_size.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                product_id: id,
            },
        });

        // Fetch main image and gallery
        const image = await db.product_image.findFirst({
            where: {
                product_id: id,
            },
            select: {
                main_url: true,
                urls: true,
            },
        });

        // Fetch average star rating
        const ratingAvg = await db.comments.aggregate({
            _avg: {
                star: true,
            },
            where: {
                product_id: id,
            },
        });

        // Fetch sizes and quantities
        const sizes = await db.product_size.groupBy({
            by: ['size'], // Group by size
            where: {
                product_id: id,
            },
            _sum: {
                quantity: true, // Sum the quantity for each group
            },
        });

        const productSizes = sizes.map(item => ({
            size: item.size,
            quantity: item._sum.quantity, // Access summed quantity
        }));

        // Combine all details into a single object
        return {
            ...shoes,
            main_url: image?.main_url || null, // Main image URL
            gallery: image?.urls || null, // Gallery images
            average_rating: ratingAvg._avg.star || 5, // Average star rating
            sizes: productSizes, // Sizes with quantities
        };
    } catch (error) {
        console.error("Failed to fetch shoe details:", error);
        throw new Error("Failed to fetch shoe details");
    }
}



export async function getShoesById({ id }: { id: number }) {
    try {
        // Fetch basic shoe details
        const shoes = await db.products.findUnique({ where: { id: id } });;

        if (!shoes) {
            return null; // Return null if the shoe doesn't exist
        }

        // Fetch total quantity
        const quantitySum = await db.product_size.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                product_id: id,
            },
        });

        // Fetch main image and gallery
        const image = await db.product_image.findFirst({
            where: {
                product_id: id,
            },
            select: {
                main_url: true,
                urls: true,
            },
        });

        // Fetch average star rating
        const ratingAvg = await db.comments.aggregate({
            _avg: {
                star: true,
            },
            where: {
                product_id: id,
            },
        });

        // Fetch sizes and quantities
        const sizes = await db.product_size.groupBy({
            by: ['size'], // Group by size
            where: {
                product_id: id,
            },
            _sum: {
                quantity: true, // Sum the quantity for each group
            },
        });

        const productSizes = sizes.map(item => ({
            size: item.size,
            quantity: item._sum.quantity, // Access summed quantity
        }));

        // Combine all details into a single object
        return {
            ...shoes,
            quantity: quantitySum._sum.quantity || 0, // Total quantity
            main_url: image?.main_url || null, // Main image URL
            gallery: image?.urls || null, // Gallery images
            average_rating: ratingAvg._avg.star || 5, // Average star rating
            sizes: productSizes, // Sizes with quantities
        };
    } catch (error) {
        console.error("Failed to fetch shoe details:", error);
        throw new Error("Failed to fetch shoe details");
    }
}


export async function getMainImageById({ id }: { id: any }) {
    const image = await db.product_image.findUnique({ where: { id: id } });
    return image;
}


export async function getProductQuantity({ id }: { id: number }) {
    try {
        console.log("Fetching product quantity for ID:", id);

        // Get quantity
        const result = await db.product_size.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                product_id: id,
            },
        });

        return result._sum.quantity || 0;
    } catch (error) {
        console.error("Error fetching product quantity:", error);
        throw new Error("Failed to fetch product quantity");
    }
}


export async function getProductSizesByProductId(product_id: number) {
    try {
        const productSizes = await db.product_size.groupBy({
            by: ['size'], // Group by size
            where: {
                product_id: product_id, // Filter by product ID
            },
            _sum: {
                quantity: true, // Sum the quantity for each group
            },
        });

        console.log("zzz", productSizes);


        return productSizes.map(item => ({
            size: item.size,
            quantity: item._sum.quantity, // Access summed quantity
        }));
    } catch (error) {
        console.error("Error fetching product sizes:", error);
        return { error: "Failed to fetch product sizes" };
    } finally {
        await db.$disconnect();
    }
}


export async function getSuggestedShoes(limit: number) {
    // Query to fetch 10 shoes only, without filters or sorting
    const shoes = await db.products.findMany({
        take: limit, // Limit the query to 10 results
        where: {
            type: "shoes", // Only fetch products of type "shoes"
        },
    });

    const shoesWithDetails = await Promise.all(
        shoes.map(async (shoe) => {
            // Get quantity
            const quantitySum = await db.product_size.aggregate({
                _sum: {
                    quantity: true,
                },
                where: {
                    product_id: shoe.id,
                },
            });

            // Get main_url
            const image = await db.product_image.findFirst({
                where: {
                    product_id: shoe.id,
                },
                select: {
                    main_url: true,
                    urls: true,
                },
            });

            // Get average star rating
            const ratingAvg = await db.comments.aggregate({
                _avg: {
                    star: true,
                },
                where: {
                    product_id: shoe.id,
                },
            });

            // Get sizes and their quantities
            const sizes = await db.product_size.groupBy({
                by: ['size'], // Group by size
                where: {
                    product_id: shoe.id, // Filter by product ID
                },
                _sum: {
                    quantity: true, // Sum the quantity for each group
                },
            });

            const productSizes = sizes.map((item) => ({
                size: item.size,
                quantity: item._sum.quantity, // Access summed quantity
            }));

            return {
                ...shoe,
                quantity: quantitySum._sum.quantity || 0, // Total quantity
                main_url: image?.main_url || null, // Main image URL
                gallery: image?.urls || null, // Additional image URLs
                average_rating: ratingAvg._avg.star || 5, // Average star rating
                sizes: productSizes, // Sizes with quantities
            };
        })
    );

    return shoesWithDetails;
}


export async function getShoesSizeDetail(id: number) {
    try {
        console.log("Fetching shoe sizes for ID:", id);

        const size = await db.product_size.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                product_id: true,
                size: true,
            },
        });

        const shoes_detail = await getShoesDetailById({ id: size.product_id });

        // console.log("123455", shoes_detail);


        return { ...shoes_detail, ...size };

        // return size;
    } catch (error) {
        console.error("Error fetching shoe sizes:", error);
        throw new Error("Failed to fetch shoe sizes");
    }

}

