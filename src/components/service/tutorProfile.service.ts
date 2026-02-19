import { env } from "@/env"

export const tutorProfileService = {
    getTutorProfile: async (query: URLSearchParams) => {
        try {
            const res = await fetch(`${env.API_URL}/tutor?${query}`, {
                cache: "no-cache"
            })

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: "Failed to fetch tutor profile" }
        }
    }
}