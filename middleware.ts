import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const hostname = req.headers.get('host') || ''
    const subdomain = hostname.split('.')[0]
    
    // Check if accessing admin subdomain (skip in localhost for development)
    const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
    const isAdminSubdomain = (subdomain === 'admin' || hostname.includes('admin.')) && !isLocalhost
    
    // If accessing admin subdomain in production, rewrite to /admin routes
    if (isAdminSubdomain && !req.nextUrl.pathname.startsWith('/admin')) {
      const url = req.nextUrl.clone()
      url.pathname = `/admin${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}`
      return NextResponse.rewrite(url)
    }
    
    // If accessing main domain but trying to access /admin in production, redirect to admin subdomain
    if (!isLocalhost && !isAdminSubdomain && req.nextUrl.pathname.startsWith('/admin')) {
      const protocol = req.headers.get('x-forwarded-proto') || 'https'
      const mainDomain = hostname.replace(/^admin\./, '')
      const adminUrl = `${protocol}://admin.${mainDomain}${req.nextUrl.pathname}`
      return NextResponse.redirect(adminUrl)
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const hostname = req.headers.get('host') || ''
        const subdomain = hostname.split('.')[0]
        const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
        const isAdminSubdomain = (subdomain === 'admin' || hostname.includes('admin.')) && !isLocalhost
        
        // Only protect admin routes/subdomain
        if (isAdminSubdomain || req.nextUrl.pathname.startsWith('/admin')) {
          // Allow login page
          if (req.nextUrl.pathname.startsWith('/admin/login')) {
            return true
          }
          return !!token
        }
        return true
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
