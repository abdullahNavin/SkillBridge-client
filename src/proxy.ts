import { NextRequest, NextResponse } from "next/server"
import { userService } from "./components/service/user.service"
import { UserRole } from "./constant/userRole";

export const proxy = async (request: NextRequest) => {
    const { data } = await userService.getSession()
    const pathName = request.nextUrl.pathname

    let isAuthenticated = false;
    let isAdmin = false;
    let isStudent = false;
    let isTutor = false;

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user?.role === UserRole.admin
        isStudent = data.user?.role === UserRole.student
        isTutor = data.user?.role === UserRole.tutor
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    if (isAdmin && (pathName.startsWith('/tutor-dashboard') || pathName.startsWith('/student-dashboard'))) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }

    if (isTutor && (pathName.startsWith('/admin-dashboard') || pathName.startsWith('/student-dashboard'))) {
        return NextResponse.redirect(new URL('/tutor-dashboard', request.url))
    }

    if (isStudent && (pathName.startsWith('/admin-dashboard') || pathName.startsWith('/tutor-dashboard'))) {
        return NextResponse.redirect(new URL('/student-dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/tutor-dashboard',
        '/student-dashboard',
        '/admin-dashboard',
        '/tutor-dashboard/:path*',
        '/student-dashboard/:path*',
        '/admin-dashboard/:path*'
    ]
}