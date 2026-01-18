import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.
  if (sessionCookie) {
    // If a session exists, redirect to the dashboard
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  } else {
    // If no session exists, redirect to the login page
    if (request.nextUrl.pathname.includes('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin/dashboard'],
};
