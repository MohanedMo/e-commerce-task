import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Read the refresh token from HTTP-only cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = !!refreshToken;

  // Paths that are only for unauthenticated users
  const authPaths = ["/login", "/register"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // If user is authenticated and tries to visit login/register, redirect to products
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
