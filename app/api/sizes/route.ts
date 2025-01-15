import { getProductSizesByProductId } from "@/model/products/shoes/loader";
import { NextRequest, NextResponse } from "next/server";
import { addSize } from "@/model/products/shoes/shoes"

export async function POST(req: NextRequest){
    try {
        const body = await req.json();

        if (body.action == 'fetch') {
            const id  = body.id;
            const sizes = await getProductSizesByProductId(parseInt(id));
            return NextResponse.json(sizes);
        }

        else if (body.action == 'add'){
            const id = body.id;
            const size = body.size;
            const quantity = body.quantity;
            const newShoesSize = await addSize({ id, size, quantity });

            return NextResponse.json(newShoesSize);
        }
    } catch(erorr) {
        return NextResponse.json({ error: 'Failed to fetch sizes' }, { status: 500 });
    }
}