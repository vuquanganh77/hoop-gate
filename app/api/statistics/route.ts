// import { NextRequest, NextResponse } from "next/server";
// import { getStatistics } from "@/model/orders/orders";

// export async function GET(req: NextRequest) {
//     try {
//         // Fetch statistics using the getStatistics function
//         const statistics = await getStatistics();

//         if (!statistics) {
//             return NextResponse.json({ error: "Statistics not found" }, { status: 404 });
//         }

//         return NextResponse.json(statistics, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching statistics:", error);
//         return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
//     }
// }
