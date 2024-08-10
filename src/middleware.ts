import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE_KEY } from './const/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_KEY)?.value

  if (!session && !(request.nextUrl.pathname.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
      missing: [
        { type: 'header', key: 'next-action' }
      ]
    }
  ],
}

