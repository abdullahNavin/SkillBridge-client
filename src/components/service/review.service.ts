import { env } from "@/env";
import { cookies } from "next/headers";

export interface ReviewDataType {
    tutorProfileId: string
    comment: string
    rating: number
}

export const reviewService = {
    createReview: async (ReviewData: ReviewDataType) => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${env.API_URL}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(ReviewData)
            })

            const data = await res.json()

            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: Post not created." },
                };
            }
            return { data: data, error: null };

        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
}