import { env } from "@/env"

const Api_url = env.API_URL

export const categoryService = {
    getCategories: async () => {
        try {
            const res = await fetch(`${Api_url}/category`, {
                // cache: 'no-store',
                next: {
                    revalidate: 30,
                    tags: ['categories']
                }
            })
            if (!res.ok) {
                throw new Error("Failed to fetch categories")
            }
            const data = await res.json()
            return { data, error: null }
        } catch (error) {
            return { data: null, error: "Failed to fetch categories" }
        }
    }
}