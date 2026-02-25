import { RouteType } from "./studentRoutes";

export const tutorRoutes: RouteType[] = [
    {
        title: "Tutor Dashboard",
        url: "/tutor-dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/tutor-dashboard",
            },
            {
                title: "My Session",
                url: "/tutor-dashboard/session",
                isActive: true,
            },
            {
                title: "My Profile",
                url: "/tutor-dashboard/profile",
            },
            {
                title: 'Home',
                url: '/'
            }
        ],
    },
]