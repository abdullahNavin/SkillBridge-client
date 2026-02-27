import { BookingCard } from "@/components/layout/BookingCard";
import { bookingService } from "@/components/service/booking.service";
import { BookingType2 } from "../page";

export default async function MySession() {
    const res = await bookingService.getBooking()

    if (!res?.data || res.data.length === 0) {
        return (
            <p className="text-center text-2xl font-bold">
                No Session Found
            </p>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold my-5">All Session</h1>
            <div className="grid grid-cols-1 gap-10">
                {
                    res.data?.map((session: BookingType2) => (
                        <BookingCard key={session.id} session={session} />
                    ))
                }
            </div>
        </div>
    );
}