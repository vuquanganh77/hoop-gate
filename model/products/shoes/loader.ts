import { db } from "@/lib/db";

export async function getAllShoes() {

    const shoes = await db.products.findMany({
        where: {
            type: "shoes",
        },
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
                },
            });

            return {
                ...shoe, 
                quantity: quantitySum._sum.quantity || 0, // Thêm trường tổng quantity
                main_url: image?.main_url || null, // Thêm trường `main_url` từ bảng `product_image`
            };
        })
    );

    return shoesWithDetails;
}



export async function getShoesById({ id }: { id: number }) {
    const shoes = await db.products.findUnique({ where: { id: id, type: "shoes" } });
    return shoes;
}

export async function getMainImageById({ id }: { id: any }) {
    const image = await db.product_image.findUnique({ where: { id: id} });
    return image;
}