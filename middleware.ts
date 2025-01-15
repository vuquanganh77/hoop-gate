import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/jwt"; // Helper to verify JWT
import { cookies } from "next/headers";


export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token"); // Retrieve token from cookies
    const cookieStore = cookies();
    const tokenn = cookieStore.get("token")?.value;
    
    const { pathname } = request.nextUrl; // Extract the requested path

    // Allow access to public routes
    if (pathname === "/shoes" || pathname === "/clothes" || pathname ==="/accessories" ||pathname === "/auth/signin") {
        return NextResponse.next();
    }

    console.log("Requested pathname:", pathname);
    // Redirect unauthenticated users trying to access protected routes
    if (!token && (pathname.startsWith("/shoes/") || pathname.startsWith("/admin") || pathname.startsWith("/admin/") ||  pathname.startsWith("/clothes/") ||  pathname.startsWith("/accessories/") || pathname.startsWith("/orders") || pathname.startsWith("/fav") ||  pathname.startsWith("/cart"))) {
        const signinUrl = request.nextUrl.clone();
        signinUrl.pathname = "/auth/signin";
        signinUrl.searchParams.set("redirect", pathname); // Optional: pass redirect path
        return NextResponse.redirect(signinUrl);
    }

    // try {
    //     // Verify the token using the jose library
    //     const decodedToken = await verifyToken(token);
    //     console.log("Decoded token:", decodedToken);
    // } catch (error) {
    //     console.error("Error verifying token:", error.message);
    // }

    // console.log("Decoded token:", decodedToken);


    // console.log("zzzzz", token_value, decodedToken);
    

    // Allow authenticated users to access protected routes
    return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {

    matcher: [
        "/shoes/:path*",
        "/admin/:path*",
        "/clothes/:path*",
        "/accessories/:path*",
        "/orders",
        "/cart",
        "/fav",
    ], 
    runtime: 'nodejs',
};



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyToken } from "@/jwt"; // Helper to verify JWT

// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl; // Extract the requested path

//     // Define public routes that don't require authentication
//     const publicRoutes = ["/shoes", "/clothes", "/accessories", "/auth/signin"];
//     if (publicRoutes.includes(pathname)) {
//         return NextResponse.next(); // Allow access to public routes
//     }

//     console.log("Requested pathnameee:", request);

//     // For all other routes, check for the Authorization header
//     const authHeader = request.headers.get("Authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         console.error("Missing or invalid Authorization header.");
//         const signinUrl = request.nextUrl.clone();
//         signinUrl.pathname = "/auth/signin";
//         signinUrl.searchParams.set("redirect", pathname); // Optional: pass redirect path
//         return NextResponse.redirect(signinUrl);
//     }

//     // Extract the token from the Authorization header
//     const token = authHeader.split(" ")[1];

//     // Verify the token
//     try {
//         verifyToken(token); // Ensure the token is valid
//     } catch (error) {
//         console.error("Invalid or expired token:", error);
//         const signinUrl = request.nextUrl.clone();
//         signinUrl.pathname = "/auth/signin";
//         signinUrl.searchParams.set("redirect", pathname);
//         return NextResponse.redirect(signinUrl);
//     }

//     // Allow access if the token is valid
//     return NextResponse.next();
// }

// // Apply middleware only to specific routes
// export const config = {
//     matcher: [
//         "/shoes/:path*",
//         "/admin/:path*",
//         "/clothes/:path*",
//         "/accessories/:path*",
//         "/orders",
//         "/cart",
//         "/fav",
//     ],
// };

