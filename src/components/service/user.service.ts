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
            return { data: session, error: null }

        } catch (error) {
            return { data: null, error: "Failed to fetch session" }
        }
    }
}