"use server"

import { bookingService, BookingType } from "@/components/service/booking.service"

enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export const createBooking = async (bookingData: BookingType) => {
    return await bookingService.createBooking(bookingData)
}

export const updateBooking = async (BookingData: { status: BookingStatus }, id: string) => {
    return await bookingService.updateBookingStatus(BookingData, id)
}