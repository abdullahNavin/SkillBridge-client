import { env } from "@/env"
import { cookies } from "next/headers"

export interface BookingType {
    tutorProfileId: string
    schedule_start: string
    schedule_end: string
    tutorName: string
    tutorImg: string | null
    tutorQualification: string
}

enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
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
    },
    getBooking: async () => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${env.API_URL}/booking/student-bookings`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-cache"
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

    updateBookingStatus: async (Bookingdata: { status: BookingStatus }, id: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${env.API_URL}/booking/update-bookings/${id}`, {
                method: "PUT",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Bookingdata)
            })
            const data = await res.json()

            if (data.error) {
                return {
                    data: null,
                    error: { message: data.error },
                };
            }
            return { data: data, error: null };

        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    }
}
