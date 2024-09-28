import { NextResponse, type NextRequest } from 'next/server'

import * as featauth from '@/features/auth';
import * as featuser from '@/features/user/client';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(featauth.SESSION_COOKIE_KEY)?.value

  if (!session && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  if (session && request.nextUrl.pathname.startsWith('/login')) {
    const [_, userId] = featauth.parseSessionCookie(session);
    return NextResponse.redirect(new URL(featuser.profilePageHref(userId), request.url))
  }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|connect/ws|_next/static|_next/image|.*\\.png$).*)',
      missing: [
        { type: 'header', key: 'next-action' }
      ]
    },
  ],
}

