"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tutor } from "../BrowsTutor/BrowsTutor";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BookingType } from "@/components/service/booking.service";
import { createBooking } from "@/actions/booking.action";
import { redirect } from "next/navigation";
import { User } from "better-auth";
import { toast } from "sonner";
import { UserRole } from "@/constant/userRole";

export default function TutorBookingTab({ tutorDetails, session }: { tutorDetails: Tutor, session: (User & { role: string }) | null }) {

    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [duration, setDuration] = useState('30 min')
    const [time, setTime] = useState(tutorDetails.availability[0])


    if (!date) return;
    const bookingDate = new Date(date);
    const t = new Date(time);

    bookingDate.setHours(t.getHours(), t.getMinutes(), 0, 0);

    const bookingEnd = new Date(bookingDate);

    bookingEnd.setMinutes(
        bookingEnd.getMinutes() + (duration === "30 min" ? 30 : 60)
    );

    const timeAndDate = bookingDate.toLocaleString('en-US', {
        month: "short",
        day: "2-digit",
        hour: '2-digit'
    })

    const start = bookingDate.toISOString()
    const end = bookingEnd.toISOString()

    const handleBooking = async () => {
        const bookingData: BookingType = {
            tutorImg: tutorDetails.image ?? '/profile.jpg',
            tutorQualification: tutorDetails.qualifications,
            tutorName: tutorDetails.name,
            tutorProfileId: tutorDetails.id,
            schedule_start: start,
            schedule_end: end
        }


        if (!session) {
            return redirect("/login")
        }

        const res = await createBooking(bookingData)

        if (res.error) {
            toast.error(res.error.message)
        }

        else if (res.data?.message) {
            toast.warning(res.data?.message)
        }

        else {
            toast.success("Booking created successfully")
            redirect("/browse-tutors")
        }
    }

    return (
        <div className="w-full md:w-87">
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <h1 className="font-medium text-xl text-muted-foreground">Starting from</h1>
                        <h1 className="text-2xl font-bold">${tutorDetails.hourlyRate}<span className="text-xs text-muted-foreground">/hr</span></h1>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col justify-center">
                        <div>
                            <h1 className="text-muted-foreground mb-4 font-medium uppercase">1. Select Date</h1>
                            <Calendar

                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border"
                                captionLayout="dropdown"
                            />
                        </div>

                        {/* button */}
                        <div>
                            <h1 className="text-muted-foreground my-4 font-medium uppercase">2. avaiable time</h1>
                            <div className="grid grid-cols-2 gap-2">
                                {
                                    tutorDetails.availability.map((slot, inx) => (
                                        <Button onClick={() => setTime(slot)}
                                            variant={time === slot ? "default" : "outline"}
                                            key={inx}>
                                            {new Date(slot).toLocaleTimeString("en-US", {
                                                hour: "2-digit"
                                            })}
                                        </Button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* duration */}
                        <div>
                            <h1 className="text-muted-foreground my-4 font-medium uppercase">2. select duration</h1>
                            <div className="grid grid-cols-2 gap-2">
                                <Button onClick={() => setDuration('30 min')} variant={duration === "30 min" ? "default" : "outline"}>30 min</Button>

                                <Button onClick={() => setDuration('60 min')} variant={duration === "60 min" ? "default" : "outline"}>60 min</Button>
                            </div>
                        </div>
                        <div className="my-5 w-full">
                            <Button disabled={session?.role === UserRole.tutor} onClick={handleBooking} className="w-full cursor-pointer">Book Now - {time && timeAndDate} <ArrowRight /></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}