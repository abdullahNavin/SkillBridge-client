import { env } from "@/env"

export const tutorProfileService = {
    getTutors: async (query: URLSearchParams) => {
        try {
            const res = await fetch(`${env.API_URL}/tutor?${query}`, {
                cache: "no-cache"
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
                    revalidate: 300
                }
            })

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: "Failed to fetch tutor profile" }
        }
    }
}