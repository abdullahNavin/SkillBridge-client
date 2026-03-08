import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL

export const userService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    cookie: cookieStore.toString()
                },
                cache: 'no-store'
            })
            const session = await res.json()
            console.log("session:", session);
            return { data: session, error: null }

        } catch (_error) {
            return { data: null, error: "Failed to fetch session" }
        }
    },
    updateStudentProfile: async (name: string, image: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${env.API_URL}/api/admin/user-update`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString()
                },
                body: JSON.stringify({ name, image })
            })
            const data = await res.json()
            return { data, error: null }
        } catch (_error) {
            return { data: null, error: "Failed to update profile" }
        }
    }
}