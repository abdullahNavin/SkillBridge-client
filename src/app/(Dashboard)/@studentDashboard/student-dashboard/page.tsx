import { BookingCard } from "@/components/layout/BookingCard";
import { bookingService } from "@/components/service/booking.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface BookingType2 {
    id: string
    tutorProfileId: string
    userId: string
    schedule_start: string
    schedule_end: string
    totalFee: string
    status: BookingStatus
    createdAt: string
    updatedAt: string
    tutorName: string
    tutorImg: string
    tutorQualification: string
}
enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export default async function studentDashboard() {
    const res = await bookingService.getBooking()
    const upcommingSession = res.data.filter((session: BookingType2) => session.status !== BookingStatus.COMPLETED)

    const completedSession = res.data.filter((session: BookingType2) => session.status === BookingStatus.COMPLETED)


    return (
        <div>
            <div className="grid grid-cols-2 gap-4 md:gap-10">

                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-[#151515] p-6 shadow-xl border border-slate-700/50">
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                                <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total Sessions</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{res.data.length}</p>
                        <p className="mt-1 text-xs text-slate-500">All time</p>
                    </div>
                </div>


                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-[#151515] p-6 shadow-xl border border-slate-700/50">
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Completed</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{completedSession.length}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                            <div className="h-1.5 flex-1 rounded-full bg-slate-700">
                                <div
                                    className="h-1.5 rounded-full bg-emerald-400 transition-all"
                                    style={{ width: `${res.data.length ? (completedSession.length / res.data.length) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="text-xs text-emerald-400 font-medium">
                                {res.data.length ? Math.round((completedSession.length / res.data.length) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-xl font-bold my-2 mb-8">Upcomming Sessions</h1>
            <div className="flex flex-col gap-3">
                {
                    upcommingSession.length > 0 ? upcommingSession.map((session: BookingType2) => (
                        <BookingCard key={session.id} session={session}></BookingCard>
                    ))
                        :
                        <p className="text-xl font-medium text-center my-2 mb-8">No session avilable</p>
                }
            </div>
            <h1 className="text-xl font-bold my-2 mb-8">Completed Sessions</h1>
            <div className="flex flex-col gap-3">
                {
                    completedSession.length > 0
                        ?
                        completedSession.slice(0, 2).map((session: BookingType2) => (
                            <BookingCard key={session.id} session={session}></BookingCard>
                        ))
                        // < Button > view History</Button>
                        :
                        <p className="text-xl font-medium text-center my-2 mb-8">No session avilable</p>
                }
            </div>
        </div >
    );
}