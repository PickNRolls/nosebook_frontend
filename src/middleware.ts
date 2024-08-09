import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_KEY } from './const/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_KEY)?.value

  if (!session && !(request.nextUrl.pathname.startsWith('/login'))) {
    return Response.redirect(new URL('/login', request.url))
  }

  if (session && !request.nextUrl.pathname.startsWith('/users')) {
    return Response.redirect(new URL('/users', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

