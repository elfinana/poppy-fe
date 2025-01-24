// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 경로 정의
const protectedRoutes = ['/book'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // 쿠키에서 토큰 가져오기
  const { pathname } = request.nextUrl;

  // 보호된 경로에 접근하려고 하고, 토큰이 없는 경우
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', request.url); // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // 요청을 계속 처리
}

// Middleware가 적용될 경로
export const config = {
  matcher: ['/book/:path*'], // book 경로만 middleware 적용
};
