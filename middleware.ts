import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname === '/login'

    // If the user is on the login page and is already authenticated,
    // redirect them to the dashboard
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // If the user is not authenticated and trying to access a protected route,
    // redirect them to the login page
    if (!isAuth && !isAuthPage) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`, req.url)
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // This ensures the middleware function above handles all authorization
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/scheduling/:path*',
    '/login',
  ],
} 