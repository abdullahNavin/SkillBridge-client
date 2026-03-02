import { env } from "@/env"
import { cookies } from "next/headers"

export const adminDashboardService = {
    getAdminDashboardData: async () => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${env.API_URL}/api/admin/users/admin-dashboard-data`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                next: {
                    revalidate: 60
                }
            })

            if (!res.ok) {
                return { data: null, error: "Failed to fetch Admin Dashboard Data" }
            }

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: "Failed to fetch Admin Dashboard Data" }
        }
    }
}