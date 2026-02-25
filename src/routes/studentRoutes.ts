
export interface RouteType {
    title: string
    url: string
    items: {
        title: string
        url: string
        isActive?: boolean
    }[]
}

export const studentRoutes: RouteType[] = [
    {
        title: "Student Dashboard",
        url: "/student-dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/student-dashboard",
            },
            {
                title: "My Session",
                url: "/student-dashboard/session",
                isActive: true,
            },
            {
                title: "My Profile",
                url: "/student-dashboard/profile",
            },
            {
                title: 'Home',
                url: '/'
            }
        ],
    },
]