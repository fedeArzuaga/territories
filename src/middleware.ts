import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // Custom logic can be added here if needed in the future
    },
    {
        // Ensures that only authenticated users can access the matched routes
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

// 2. Keep your matcher as is
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/signin|assets/territories).*)"],
};