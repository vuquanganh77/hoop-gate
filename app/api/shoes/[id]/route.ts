import { NextRequest, NextResponse } from "next/server";
import { getShoesById } from "@/model/products/shoes/loader"; // Ensure this function is implemented

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        console.log("chay vao dayyy", id);
        
        // Validate ID
        const size_id = parseInt(id);
        if (isNaN(size_id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Fetch shoe details
        const shoe = await getShoesById({id: parseInt(id)});

        if (!shoe) {
            return NextResponse.json({ error: "Shoe not found" }, { status: 404 });
        }

        return NextResponse.json(shoe, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch shoe" }, { status: 500 });
    }
}
