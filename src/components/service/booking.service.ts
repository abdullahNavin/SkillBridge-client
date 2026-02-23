import { env } from "@/env"
import { cookies } from "next/headers"

export interface BookingType {
    tutorProfileId: string
    schedule_start: string
    schedule_end: string
}

export const bookingService = {
    createBooking: async (bookingData: BookingType) => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${env.API_URL}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(bookingData)
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
    }
}
