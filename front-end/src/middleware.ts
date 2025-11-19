import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtdecoder } from "./helpers/jwtdecoder";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const payload = await jwtdecoder(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (!payload.verified) {
      return NextResponse.redirect(new URL("/verify", request.url));
    }

    if (!payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/verify")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const payload = await jwtdecoder(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (payload.verified) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
