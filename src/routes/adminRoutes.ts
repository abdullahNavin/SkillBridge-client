import { RouteType } from "./studentRoutes";

export const adminRoutes: RouteType[] = [
    {
        title: "Admin Dashboard",
        url: "/tutor-dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/tutor-dashboard",
            },
            {
                title: "All Session",
                url: "/tutor-dashboard/session",
                isActive: true,
            },
            {
                title: "All Tutor",
                url: "/tutor-dashboard/tutor",
            }
        ],
    },
]