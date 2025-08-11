import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const regStatus = request.cookies.get("regstatus")?.value === "true"
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ["/dashboard"]

  // Check if the current path is a protected route
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      // If no token, redirect to home page
      // The client-side Header component will then determine whether to show Register or Sign In
      const redirectUrl = new URL("/", request.url)
      return NextResponse.redirect(redirectUrl)
    }
    // If token exists, allow access
    return NextResponse.next()
  }

  // Allow access to all other routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard"], 
}
