import { db } from "@/lib/db";

export async function postComment(user_id: number, product_id: number, comment: string, rating: number){
    const createdAt = new Date();
    const updatedAt = new Date();

    const order = await db.comments.create({
        data: {
            user_id: user_id,
            product_id: product_id,
            content: comment,
            star: rating,
            createAt: createdAt.toString(),
            updatedAt: updatedAt.toString(),
        },
    });

    return order;
}


export async function loadComment(product_id: any){
    const comments = await db.comments.findMany({
        where: {product_id: product_id}
    })

    return comments;
}