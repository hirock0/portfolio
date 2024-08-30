import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/my/login") ||
      url.pathname.startsWith("/my/signup"))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (
    token?.email !== "hirockdutta0@gmail.com" &&
    url.pathname.startsWith("/admin")
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  if (
    !token &&
    (url.pathname.startsWith("/my/profile") ||
      url.pathname.startsWith("/my/informations"))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/my/login/:path*",
    "/my/signup/:path*",
    "/admin/:path*",
    "/my/profile/:path*",
    "/my/informations/:path*",
  ],
};
