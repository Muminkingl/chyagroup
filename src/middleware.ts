import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin and its subroutes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const payload = await decrypt(session);
      // Check if session is still valid (jose's jwtVerify already checks expiration if set)
      if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Config to match only the admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
