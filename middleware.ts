import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.COOKIE_NAME as string)?.value;
  const url = req.nextUrl.pathname;

  if (url.startsWith('/api')) {
    return NextResponse.next();
  }

  const unprotectedRoutes = ['/login', '/register'];
  const protectedRoutes = ['/admin', '/article', '/profile'];

  const { pathname } = req.nextUrl;

  if (unprotectedRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/article', req.url));
    }

    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
