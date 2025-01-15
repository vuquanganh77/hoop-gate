import { NextRequest, NextResponse } from "next/server";
import { setFav, getAllFav, deleteFav } from "@/model/products/fav";
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
        const favorites = await getAllFav({user_id: parseInt(user_id)});

        if (!favorites || favorites.length === 0) {
            return NextResponse.json({ message: 'No favorite products found.' }, { status: 404 });
        }

        return NextResponse.json(favorites, { status: 200 });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json({ error: 'Failed to fetch favorites.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { user_id, product_id } = body;

        if (!user_id || !product_id) {
            return NextResponse.json({ error: 'User ID and Product ID are required.' }, { status: 400 });
        }

        const newFavorite = await setFav({ user_id: parseInt(user_id), product_id: parseInt(product_id) });

        if (newFavorite === 'Already in favorites.') {
            return NextResponse.json({ error: 'Already in favorites.' }, { status: 400 });
        }

        return NextResponse.json(newFavorite, { status: 201 });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json({ error: 'Failed to add to favorites.' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest){
    try {
        const body = await request.json();
        const { id } = body;

        if (!id ) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const res = await deleteFav(id);

        return NextResponse.json(res, { status: 201 });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json({ error: 'Failed to add to favorites.' }, { status: 500 });
    }
}

