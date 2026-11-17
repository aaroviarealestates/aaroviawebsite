import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "aarovia_admin_session";
const secret = () => {
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET must be set before using admin authentication.");
  return new TextEncoder().encode(process.env.AUTH_SECRET);
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
    try {
      await jwtVerify(token, secret());
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
