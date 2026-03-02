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
                title: "All Bookings",
                url: "/tutor-dashboard/bookings"
            },
            {
                title: "All Users",
                url: "/tutor-dashboard/users",
            },
            {
                title: "Manage Categories",
                url: "/tutor-dashboard/categories",
            },
            {
                title: "Home",
                url: "/",
            }
        ],
    },
]