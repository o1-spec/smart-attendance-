import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  let decoded = null;
  if (token) {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
    }
  }

  if (decoded) {
    const isLecturer = decoded.role === 'LECTURER';
    const dashboardPath = isLecturer ? '/dashboard/lecturer' : '/dashboard/student';

    if (pathname === '/' || pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (pathname.startsWith('/dashboard/lecturer') && !isLecturer) {
      return NextResponse.redirect(new URL('/dashboard/student', request.url));
    }

    if (pathname.startsWith('/dashboard/student') && isLecturer) {
      return NextResponse.redirect(new URL('/dashboard/lecturer', request.url));
    }

    if (pathname.startsWith('/attendance') && isLecturer) {
      return NextResponse.redirect(new URL('/dashboard/lecturer', request.url));
    }
  } else {
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/attendance');

    if (isProtectedRoute) {
      const loginUrl = new URL('/login', request.url);
      
      if (pathname.startsWith('/attendance/mark')) {
        const code = request.nextUrl.searchParams.get('code');
        if (code) {
          loginUrl.searchParams.set('callbackUrl', `/attendance/mark?code=${code}`);
        } else {
          loginUrl.searchParams.set('callbackUrl', pathname);
        }
      } else {
        loginUrl.searchParams.set('callbackUrl', pathname);
      }
      
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
