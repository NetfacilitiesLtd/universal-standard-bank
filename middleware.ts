import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loginToken = request.cookies.get("login_token");
  const authToken = request.cookies.get("auth_token");
  const adminToken = request.cookies.get("admin_token");

  const { pathname } = request.nextUrl;

  // Customer Dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Customer Verification
  if (pathname.startsWith("/verify")) {
    if (!loginToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Admin Dashboard
  if (pathname.startsWith("/admin")) {
    if (
      !adminToken &&
      !pathname.startsWith("/admin/login")
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/verify",
    "/admin/:path*",
  ],
};