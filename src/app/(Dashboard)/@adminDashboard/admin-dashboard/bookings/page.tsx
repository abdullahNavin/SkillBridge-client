import { BookingType2 } from "@/app/(Dashboard)/@studentDashboard/student-dashboard/page";
import { BookingCard } from "@/components/layout/BookingCard";
import { adminDashboardService } from "@/components/service/adminDashboard.service";

export default async function AllBookings() {
    const { data, error } = await adminDashboardService.getAllBookings()

    return (
        <div className="grid grid-cols-1 gap-2.5">
            {
                data?.map((booking: BookingType2) => (
                    <BookingCard key={booking.id} session={booking} isAdmin={true} />
                ))
            }
        </div>
    );
}