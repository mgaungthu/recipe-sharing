import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './utils/routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;


  // 🚫 Protect recipe creation
  if (pathname.startsWith('/recipe/create') && !token) {
    const loginUrl = new URL(ROUTES.AUTH.LOGIN, req.url);
    loginUrl.searchParams.set('redirect', pathname);
    const res = NextResponse.redirect(loginUrl);
    if (res?.cookies?.set) {
      res.cookies.set('auth_notice', 'login_required', {
        path: '/',
        maxAge: 1,
      });
    }
    return res;
  }

  // 🚫 Redirect logged-in users away from auth pages
  if (
    (pathname.startsWith(ROUTES.AUTH.LOGIN) ||
      pathname.startsWith(ROUTES.AUTH.REGISTER)) &&
    token
  ) {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/recipe/:path*', '/login', '/register'],
};
