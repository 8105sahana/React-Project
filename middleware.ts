import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login"];
const privateRoutes = ["/productDashboard", "/cart"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken")?.value;


  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/productDashboard", req.nextUrl));
  }

  if (!token && privateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/productDashboard", "/cart"],
};
