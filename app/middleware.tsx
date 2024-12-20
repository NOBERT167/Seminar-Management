import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const role = request.cookies.get("role")?.value;

  if (!role) {
    // Redirect to login if not authenticated
    if (url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (role === "guest") {
    // Restrict admin-only routes for guests
    const adminRoutes = ["/dashboard", "/seminars", "/rooms"];
    if (adminRoutes.includes(url.pathname)) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/dashboard",
    "/seminars",
    "/rooms",
    "/my-registrations",
    "/seminar-details",
  ],
};
