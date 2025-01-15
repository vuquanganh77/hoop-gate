import { NextRequest, NextResponse } from "next/server";
import { getAccessoriesById } from "@/model/products/accessories/loader";

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
        const accessories = await getAccessoriesById({id: parseInt(id)});

        if (!accessories) {
            return NextResponse.json({ error: "Accessories not found" }, { status: 404 });
        }

        return NextResponse.json(accessories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch accessories" }, { status: 500 });
    }
}
