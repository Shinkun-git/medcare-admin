import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    console.log("Middleware in admin portal ran, token ----->",token?.slice(-5));

    if (!token && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ "/doctor/:path*", "/booking-request/:path*"] // Protect admin routes
};
