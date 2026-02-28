import { env } from "@/env"
import { cookies } from "next/headers"

export const tutorProfileService = {
    getTutors: async (query: URLSearchParams) => {
        try {
            const res = await fetch(`${env.API_URL}/tutor?${query}`, {
                // cache: "no-cache"
                next: {
                    revalidate: 60
                }
            })

            if (!res.ok) {
                return { data: null, error: "Failed to fetch tutors" }
            }

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: error }
        }
    },

    getTutorById: async (id: string) => {
        try {
            const res = await fetch(`${env.API_URL}/tutor/profile/${id}`, {
                next: {
                    revalidate: 60
                }
            })

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: "Failed to fetch tutor profile" }
        }
    },
    getTutorDashboard: async () => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${env.API_URL}/tutor/dashboard`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-cache"
            })

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: "Failed to fetch tutor profile" }
        }
    }
}