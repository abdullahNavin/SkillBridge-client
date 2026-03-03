import { env } from "@/env"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const Api_url = env.API_URL

export const categoryService = {
    getCategories: async () => {
        try {
            const res = await fetch(`${Api_url}/category`, {
                // cache: 'no-store',
                next: {
                    tags: ['categories']
                }
            })
            if (!res.ok) {
                return { data: null, error: "Failed to fetch categories" }
            }
            const data = await res.json()
            return { data, error: null }
        } catch (error) {
            return { data: null, error: "Failed to fetch categories" }
        }
    },

    deleteCategory: async (categoryId: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${Api_url}/category/${categoryId}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString()
                }
            })
            if (!res.ok) {
                return { data: null, error: "Failed to delete category" }
            }

            const data = await res.json()
            return { data, error: null }
        } catch (error) {
            return { data: null, error: "Failed to delete category" }
        }
    }
}