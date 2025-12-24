import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for auth cookie
    const token = request.cookies.get("auth_token");
    const hasAuth = !!token;

    // Define public paths
    const isLoginPage = pathname === "/login";
    const isStaticAsset = pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname === "/favicon.ico" ||
        pathname.includes("."); // Catch-all for other static files (like robots.txt, etc)

    // Case 1: Trying to access public asset -> Allow
    if (isStaticAsset) {
        return NextResponse.next();
    }

    // Case 2: User is NOT authenticated
    if (!hasAuth) {
        // If they are strictly on the login page, allow it
        if (isLoginPage) {
            return NextResponse.next();
        }
        // Otherwise, redirect to login
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Case 3: User IS authenticated
    if (hasAuth) {
        // If they try to go to login page, redirect to home
        if (isLoginPage) {
            const url = request.nextUrl.clone();
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
        // Otherwise, allow access
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
