import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('nosebook_session')?.value

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

