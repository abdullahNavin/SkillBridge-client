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
    },
    updateCategory: async (categoryId: string, name: string, description: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${Api_url}/category`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ id: categoryId, name, description })
            })
            if (!res.ok) {
                return { data: null, error: "Failed to update category" }
            }
            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error: "Failed to update category" }
        }
    },

    createCategory: async (name: string, description: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${Api_url}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ name, description })
            })
            if (!res.ok) {
                return { data: null, error: "Failed to create category" }
            }
            const data = await res.json()
            return { data, error: null }
        } catch (error) {
            return { data: null, error: "Failed to create category" }
        }
    }
}