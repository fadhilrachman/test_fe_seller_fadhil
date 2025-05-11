import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { url } from 'inspector';

export function middleware(req: NextRequest) {
  // const cookieStore = cookies().get(process?.env?.COOKIE_NAME as string)?.value;
  // const currentPathname = req?.nextUrl.pathname;
  // if (currentPathname == '/') {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }
  // const pathAllowedUnSignin = ['/signin', '/forgot-password'];
  // if (pathAllowedUnSignin.includes(currentPathname) && cookieStore) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }
  // const pathAfterSignin = ['/dashboard/*', '/master-data/*'];
  // if (pathAfterSignin.includes(currentPathname) && !cookieStore) {
  //   return NextResponse.redirect(new URL('/sign-in', req.url));
  // }
}
