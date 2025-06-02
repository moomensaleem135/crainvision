import { type NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/dashboard", "/preferences", "/survey", "/account-setting", "/super-admin"]
const publicRoutes = ["/", "/register", "/forgot-password", "/clear-localstorage"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the JWT token from cookies
  const token = request.cookies.get("jwt")?.value

  console.log("Middleware - Path:", pathname)
  console.log("Middleware - Token exists:", !!token)
  console.log(
    "Middleware - All cookies:",
    request.cookies.getAll().map((c) => c.name),
  )
  console.log({token});
  

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))

  console.log("Middleware - Is protected:", isProtectedRoute)
  console.log("Middleware - Is public:", isPublicRoute)

  // If trying to access a protected route without a token
  if (isProtectedRoute && !token) {
    console.log("Middleware - Redirecting to login (no token)")
    return NextResponse.redirect(new URL("/", request.nextUrl.origin))
  }

  // If trying to access register page while authenticated
  if (token && pathname === "/register") {
    console.log("Middleware - Redirecting to dashboard (already authenticated)")
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin))
  }

  // If accessing root path with token, redirect to dashboard
  if (token && pathname === "/") {
    console.log("Middleware - Redirecting to dashboard (authenticated user on root)")
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin))
  }

  console.log("Middleware - Allowing request to proceed")
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
