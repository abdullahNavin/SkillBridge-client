"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tutor } from "../BrowsTutor/BrowsTutor";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TutorBookingTab({ tutorDetails }: { tutorDetails: Tutor }) {

    const [date, setDate] = React.useState<Date | undefined>(new Date())

    // const getDate = new Date(date)
    // console.log(getDate);
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
                                        <Button variant={"outline"} key={inx}>{new Date(slot).toLocaleTimeString("en-US", {
                                            hour: "2-digit"
                                        })}</Button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* duration */}
                        <div>
                            <h1 className="text-muted-foreground my-4 font-medium uppercase">2. select duration</h1>
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant={"outline"}>30 min</Button>
                                <Button variant={"outline"}>60 min</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}