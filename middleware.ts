import { NextRequest, NextResponse } from "next/server"
import { apiMiddleware } from "./middlewares/api.middleware"
import { authMiddleware } from "./middlewares/auth.middleware"



export async function middleware(req: NextRequest) {
 
    const { nextUrl } = req;
    
    if (!nextUrl.pathname.startsWith('/api')) {
        const authResponse = await authMiddleware(req);
        if (authResponse) return authResponse;
    }

    

    if (nextUrl.pathname.startsWith('/api')) {
        const tokenResponse = await apiMiddleware(req);
        
        if (tokenResponse) return tokenResponse;
    }

    NextResponse.next();

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", '/api/:path*' ],
}