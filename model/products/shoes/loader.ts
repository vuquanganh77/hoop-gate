import { db } from "@/lib/db";

export async function getAllShoes() {
    const shoes = await db.products.findMany({
        where: {
            type: "shoes",
        },
    });

    const shoesWithQuantity = await Promise.all(
        shoes.map(async (shoe) => {
            const quantitySum = await db.product_size.aggregate({
                _sum: {
                    quantity: true, // Tính tổng quantity của sản phẩm từ bảng product_size
                },
                where: {
                    product_id: shoe.id, // Lọc các product_size có product_id khớp với id trong bảng products
                },
            });

            return {
                ...shoe, // Lấy tất cả các thông tin của sản phẩm
                quantity: quantitySum._sum.quantity || 0, // Thêm trường quantity tính từ bảng product_size
            };
        })
    );

    console.log("123", shoesWithQuantity);
    

    return shoesWithQuantity;
}


export async function getShoesById({ id }: { id: number }) {
    const shoes = await db.products.findUnique({ where: { id: id, type: "shoes" } });
    return shoes;
}