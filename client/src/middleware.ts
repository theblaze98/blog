import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const authToken = request.cookies.get('token')?.value

	if (!authToken && request.nextUrl.pathname.startsWith('/post/create')) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (
		authToken &&
		(request.nextUrl.pathname.startsWith('/login') ||
			request.nextUrl.pathname.startsWith('/register'))
	) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: ['/login', '/register', '/post/create'],
}
