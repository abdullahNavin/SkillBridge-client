import { RouteType } from "./studentRoutes";

export const adminRoutes: RouteType[] = [
    {
        title: "Admin Dashboard",
        url: "/tutor-dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/admin-dashboard",
            },
            {
                title: "All Bookings",
                url: "/admin-dashboard/bookings"
            },
            {
                title: "All Users",
                url: "/admin-dashboard/users",
            },
            {
                title: "Manage Categories",
                url: "/admin-dashboard/categories",
            },
            {
                title: "Home",
                url: "/",
            }
        ],
    },
]