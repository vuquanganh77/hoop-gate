import { NextRequest, NextResponse } from "next/server";
import { getAccessoriesSizeDetail } from "@/model/products/accessories/loader"; 

export async function GET(req: NextRequest, { params }: { params: { size_id: string } }) {
    try {
        
        const { size_id } = params;

        // Validate ID
        const accessoriesId = parseInt(size_id);
        if (isNaN(accessoriesId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Fetch accessories details
        const accessories = await getAccessoriesSizeDetail(accessoriesId);
        

        if (!accessories) {
            return NextResponse.json({ error: "Accessories not found" }, { status: 404 });
        }

        return NextResponse.json(accessories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch accessories" }, { status: 500 });
    }
}
