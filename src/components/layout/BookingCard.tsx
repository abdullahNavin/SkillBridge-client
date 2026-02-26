import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { format, differenceInMinutes, isAfter } from "date-fns"
import { BookingType2 } from "@/app/(Dashboard)/@studentDashboard/student-dashboard/page"
import { Button } from "../ui/button"
import { Review } from "./Review"



enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}



const getStatusColor = (status: BookingStatus) => {
    switch (status) {
        case BookingStatus.PENDING:
            return "bg-yellow-100 text-yellow-700"
        case BookingStatus.CONFIRMED:
            return "bg-green-100 text-green-700"
        case BookingStatus.CANCELLED:
            return "bg-red-100 text-red-700"
        case BookingStatus.COMPLETED:
            return "bg-blue-100 text-blue-700"
        default:
            return ""
    }
}

export function BookingCard({ session }: { session: BookingType2 }) {
    const now = new Date()
    const startTime = new Date(session.schedule_start)

    const minutesToStart = differenceInMinutes(startTime, now)

    const isUpcomingSoon =
        minutesToStart > 0 &&
        minutesToStart <= 15 &&
        session.status !== BookingStatus.COMPLETED &&
        session.status !== BookingStatus.CANCELLED

    return (
        <Card className="transition duration-300 hover:shadow-lg 
                 bg-white dark:bg-zinc-900 
                 border border-zinc-200 dark:border-zinc-800 py-0">

            <CardContent className="p-4">

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image
                            src={session.tutorImg}
                            alt={session.tutorName}
                            height={50}
                            width={50}
                            className="rounded-full object-cover border 
                   border-zinc-200 dark:border-zinc-700"
                        />
                        <div>
                            <h3 className="font-semibold text-lg 
                       text-zinc-900 dark:text-zinc-100">
                                {session.tutorName}
                            </h3>
                            <p className="text-sm 
                      text-zinc-500 dark:text-zinc-400">
                                {session.tutorQualification}
                            </p>
                        </div>
                    </div>

                    {/* time */}
                    {
                        session.status === BookingStatus.COMPLETED ?

                            <Review session={session} />

                            :
                            <div className="text-sm space-y-1 
                    text-zinc-600 dark:text-zinc-400">

                                <p>
                                    <span className="font-medium 
                         text-zinc-800 dark:text-zinc-200">
                                        Start:
                                    </span>{" "}
                                    {format(startTime, "MMM d, yy h:mm a")}
                                </p>

                                <p>
                                    <span className="font-medium 
                         text-zinc-800 dark:text-zinc-200">
                                        End:
                                    </span>{" "}
                                    {/* {format(new Date(session.schedule_end), "PPP p")} */}
                                    {format(new Date(session.schedule_end), "MMM d, yy h:mm a")}
                                </p>

                            </div>
                    }
                </div>

                <div>
                    {isUpcomingSoon && (
                        <div className="flex items-center gap-3 mt-3">
                            <p className="text-sm font-medium 
                        text-green-600 dark:text-green-400">
                                Starts in {minutesToStart} min
                            </p>
                            <Button variant={'outline'}>Join Now</Button>
                        </div>

                    )}
                </div>

            </CardContent>
        </Card>
    )
}