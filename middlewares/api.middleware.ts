import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function apiMiddleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.AUTH_SECRET});
    // console.log("Chay vao API middleware", token);
    

    if(!token) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    return NextResponse.next();
}

