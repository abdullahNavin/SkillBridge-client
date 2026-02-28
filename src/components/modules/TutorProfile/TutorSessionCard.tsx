"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { BookingType2 } from "@/app/(Dashboard)/@studentDashboard/student-dashboard/page"
import { Button } from "@/components/ui/button"
import { SelectStatus } from "./SelectStatus"
import { useEffect, useState } from "react"
import { updateBooking } from "@/actions/booking.action"
import { toast } from "sonner"



export function TutorSessionCard({ session }: { session: BookingType2 }) {
    const startTime = new Date(session.schedule_start)
    const [status, setStatus] = useState(session.status)

    useEffect(() => {
        if (status !== session.status) {
            updateBooking({ status }, session.id)
                .then((res) => res.data)
                .then((data) => {
                    if (data?.message) {
                        return toast.error(data.message)
                    }
                    toast.success(`Booking status change to ${data.status}`)
                })
        }
    }, [status, session.id, session.status])

    return (
        <Card className="transition duration-300 hover:shadow-lg bg-white dark:bg-zinc-900 
                 border border-zinc-200 dark:border-zinc-800 py-0">

            <CardContent className="p-4">

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image
                            src={session.tutorImg}
                            alt={session.tutorName}
                            height={50}
                            width={50}
                            className="rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        />
                        <div>
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                                {session.tutorName}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {session.tutorQualification}
                            </p>
                        </div>
                    </div>

                    <div className="text-sm hidden md:block space-y-1 text-zinc-600 dark:text-zinc-400">

                        <p>
                            <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                Start:
                            </span>{" "}
                            {format(startTime, "MMM d, yy h:mm a")}
                        </p>

                        <p>
                            <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                End:
                            </span>{" "}
                            {format(new Date(session.schedule_end), "MMM d, yy h:mm a")}
                        </p>

                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {
                            session.status !== "COMPLETED" && <Button>Join Now</Button>
                        }
                        <SelectStatus status={status} setStatus={setStatus} />
                    </div>
                </div>



            </CardContent>
        </Card>
    )
}