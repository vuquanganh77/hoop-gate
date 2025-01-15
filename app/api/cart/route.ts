import { NextRequest, NextResponse } from "next/server";
import { setCart, getAllCart } from "@/model/products/cart";
import { parse } from "path";

export async function GET(request: NextRequest) {
    try {
        // Get the user_id from query parameters
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get("user_id");

        if (!user_id) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
        }

        // Fetch favorite products from the database
        const carts = await getAllCart({user_id: parseInt(user_id)});

        if (!carts || carts.length === 0) {
            return NextResponse.json({ message: 'No cart products found.' }, { status: 404 });
        }

        return NextResponse.json(carts, { status: 200 });
    } catch (error) {
        console.error('Error fetching carts:', error);
        return NextResponse.json({ error: 'Failed to fetch carts.' }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user_id, product_id, size } = body;

        if (!user_id || !product_id) {
            return NextResponse.json({ error: 'User ID and Product ID are required.' }, { status: 400 });
        }

        const newCart = await setCart({ user_id: parseInt(user_id), product_id: parseInt(product_id), size: parseInt(size) });

        // if (newFavorite === 'Already in favorites.') {
        //     return NextResponse.json({ error: 'Already in favorites.' }, { status: 400 });
        // }

        return NextResponse.json(newCart, { status: 201 });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json({ error: 'Failed to add to cart.' }, { status: 500 });
    }
}