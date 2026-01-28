import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        
        const token = req.nextauth.token
        
        const path = req.nextUrl.pathname;

        // If the user tries to go to login page and is already authenticated, it will be redirected to the map page
        if (token && path.startsWith("/auth/signin")) {
            return NextResponse.redirect(new URL("/map", req.url));
        }

        // If the user is NOT authenticated, and the path is NOT the login page, this redirects them to that page
        if (!token && !path.startsWith("/auth/signin")) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }

    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

// 2. Keep your matcher as is
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth/signin",
        "/map"
    ],
};