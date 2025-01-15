import { NextRequest, NextResponse } from "next/server";
import { loadComment, postComment } from "@/model/comment/comment";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { comment, rating, user_id, product_id } = body;

        if (!user_id || !product_id) {
            return NextResponse.json({ error: 'User ID and Product ID are required.' }, { status: 400 });
        }

        console.log("chay vao api", comment, rating, user_id, product_id);
        
        const new_comment = await postComment(user_id, product_id, comment, rating);
        
        return NextResponse.json(new_comment, { status: 201 });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json({ error: 'Failed to add to favorites.' }, { status: 500 });
    }
}


export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url);
        const product_id = searchParams.get("product_id");


        console.log("chay vao api", product_id);

        const comments = await loadComment(parseInt(product_id));
        
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json({ error: 'Failed to add to favorites.' }, { status: 500 });
    }
}