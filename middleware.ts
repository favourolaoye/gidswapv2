import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "sonner";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  toast.info(`token: ${token}`)
  const { pathname, searchParams } = request.nextUrl;

  // Protect anything under /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("auth", "required"); 
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
