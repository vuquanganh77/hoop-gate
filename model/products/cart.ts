import { db } from "@/lib/db";

export async function setCart({ user_id, product_id, size }: { user_id: number, product_id: number, size: number }) {
    console.log("chay vao set cart");

    // get product_size_id
    const product_size_id = await db.product_size.findFirst({
        where: {
            product_id: product_id,
            size: size,
        },
        select: {
            id: true, // Only fetch the `id`
        },
    });

    console.log("product_size_id", product_size_id.id);
    const size_id = parseInt(product_size_id.id);


    // Check if the cart already exists
    // const existingCart = await db.carts.findFirst({
    //     where: { user_id, product_size_id: size_id },
    // });

    // if (existingCart) {
    //     return 'Already in cart.';
    // }

    const createdAt = new Date();
    const updatedAt = new Date();

    // Add to cart
    const newCart = await db.carts.create({
        data: {
            user_id,
            product_size_id: size_id,
            quantity: 1,
            createdAt: createdAt.toString(),
            updatedAt: updatedAt.toString(),
        },
    });

    return newCart;
}


export async function getAllCart({ user_id }: { user_id: number }) {
    return db.carts.findMany({
        where: { user_id },
        select: { id: true, product_size_id: true, quantity: true },
    })
}


export async function updateCart({ id, quantity }: { id: number, quantity: number }) {
    // Update the cart item's quantity in the database
    const updatedCart = await db.carts.update({
        where: { id },
        data: { quantity },
    });

    return updatedCart;
}


export async function deleteCart(user_id: number) {

    const result = await db.carts.deleteMany({
        where: {
            user_id: user_id,
        },
    });
}


export async function deleteCartItem(id: number) {
    const result = await db.carts.delete({
        where: {
            id: id,
        },
    });

    return result;
}