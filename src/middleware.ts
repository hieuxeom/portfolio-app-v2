import { getCookie, getCookies } from "cookies-next";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/auth")) {
		if (request.cookies.get("refresh_token")) {
			return NextResponse.redirect(new URL("/me", request.url));
		}
	}

	if (request.nextUrl.pathname.startsWith("/me")) {
		if (!request.cookies.get("refresh_token")) {
			return NextResponse.redirect(new URL("/auth", request.url));
		}
	}
}
