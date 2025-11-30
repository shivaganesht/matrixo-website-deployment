import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Handle team-auth.matrixo.in subdomain
  // Only allow /employee-portal routes on this subdomain
  if (hostname === 'team-auth.matrixo.in' || hostname === 'www.team-auth.matrixo.in') {
    // If accessing root on team-auth subdomain, redirect to employee-portal
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/employee-portal', request.url))
    }
    
    // Only allow employee-portal routes on this subdomain
    if (!pathname.startsWith('/employee-portal') && 
        !pathname.startsWith('/_next') && 
        !pathname.startsWith('/api') &&
        !pathname.startsWith('/logos') &&
        !pathname.startsWith('/team') &&
        !pathname.includes('.')) {
      return NextResponse.redirect(new URL('/employee-portal', request.url))
    }
  }

  // Block employee-portal access from main domain (optional - uncomment if needed)
  // if ((hostname === 'matrixo.in' || hostname === 'www.matrixo.in') && 
  //     pathname.startsWith('/employee-portal')) {
  //   return NextResponse.redirect(new URL('https://team-auth.matrixo.in/employee-portal', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
