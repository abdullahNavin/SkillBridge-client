"use server"

import { bookingService, BookingType } from "@/components/service/booking.service"

export const createBooking = async (bookingData: BookingType) => {
    return await bookingService.createBooking(bookingData)
}