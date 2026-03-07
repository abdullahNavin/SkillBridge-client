import { tutorProfileService } from "@/components/service/tutorProfile.service";
import { BookingType2 } from "../page";
import { TutorSessionCard } from "@/components/modules/TutorProfile/TutorSessionCard";

export default async function page() {
    const res = await tutorProfileService.getTutorDashboard()

    if (res.error) {
        return <div className="text-red-500">{res.error}</div>
    }

    if (res.data?.message) {
        return <div className="text-yellow-500">{res.data?.message}</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold my-5">All Sessions</h1>
            <div className="flex flex-col gap-6">
                {
                    res.data.bookings.map((session: BookingType2) => (
                        <TutorSessionCard key={session.id} session={session} />
                    ))
                }
            </div>
        </div>
    );
}