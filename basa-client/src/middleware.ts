import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  landlord: [/^\/landlord/, /^\/create-rental-house/],
  admin: [/^\/admin/],
  tenant:[/^\/tenant/,/^\/rental-request/,/^\/verifyOrder/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `https://basa-client.vercel.app/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: [
    "/create-rental-house",
    "/landlord/:path*",
    "/admin/:path*",
    "/tenant/:path*",
    "/rental-request/:path*",
    "/verifyOrder"
  ],
};