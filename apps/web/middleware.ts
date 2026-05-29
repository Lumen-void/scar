import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  { prefix: "/admin", login: "/admin/login", role: "admin" },
  { prefix: "/guides", login: "/guides/login", role: "guide" },
  { prefix: "/drivers", login: "/drivers/login", role: "driver" },
  { prefix: "/vendors", login: "/vendors/login", role: "vendor" },
  { prefix: "/profile", login: "/login", role: "traveler" },
  { prefix: "/settings", login: "/login", role: "traveler" }
] as const;

const loginPaths = new Set([
  "/admin/login",
  "/guides/login",
  "/drivers/login",
  "/vendors/login",
  "/login",
  "/signup",
  "/operator-login"
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (loginPaths.has(pathname)) {
    return NextResponse.next();
  }

  const match = protectedRoutes.find((route) => pathname === route.prefix || pathname.startsWith(`${route.prefix}/`));

  if (!match) {
    return NextResponse.next();
  }

  const session = request.cookies.get("scar_session")?.value ?? request.cookies.get("scar_demo_session")?.value;
  const role = request.cookies.get("scar_role")?.value ?? request.cookies.get("scar_demo_role")?.value;

  if (!session) {
    return NextResponse.redirect(new URL(match.login, request.url));
  }

  if (match.role !== "traveler" && role !== match.role && role !== "admin") {
    return NextResponse.redirect(new URL("/operator-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/guides/:path*",
    "/drivers/:path*",
    "/vendors/:path*",
    "/profile/:path*",
    "/settings/:path*"
  ]
};
