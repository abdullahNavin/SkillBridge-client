import { adminDashboardService } from "@/components/service/adminDashboard.service";

export default async function AdminDashboard() {
    const { data, error } = await adminDashboardService.getAdminDashboardData();

    const totalBookings = data?.totalBookings?._count?.tutorProfileId ?? 0;
    const totalStudents = data?.totalStudent ?? 0;
    const totalTutors = data?.totalTutor ?? 0;
    const totalCompleted = data?.totalCompletedSession ?? 0;
    const totalEarnings = parseFloat(data?.totalEarnings?._sum?.totalFee ?? "0");
    const completionRate = totalBookings ? Math.round((totalCompleted / totalBookings) * 100) : 0;

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
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total Bookings</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalBookings}</p>
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
                        <p className="text-4xl font-bold text-white">{totalCompleted}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                            <div className="h-1.5 flex-1 rounded-full bg-slate-700">
                                <div
                                    className="h-1.5 rounded-full bg-emerald-400 transition-all"
                                    style={{ width: `${completionRate}%` }}
                                />
                            </div>
                            <span className="text-xs text-emerald-400 font-medium">{completionRate}%</span>
                        </div>
                    </div>
                </div>


                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-[#151515] p-6 shadow-xl border border-slate-700/50">
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-sky-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20">
                                <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 2.485-.806 4.785-2.166 6.618L12 21l-6.834-2.382A12.083 12.083 0 013 12c0-.54.036-1.072.105-1.59L12 14z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total Students</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalStudents}</p>
                        <p className="mt-1 text-xs text-slate-500">Registered</p>
                    </div>
                </div>


                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-[#151515] p-6 shadow-xl border border-slate-700/50">
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
                                <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total Tutors</span>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalTutors}</p>
                        <p className="mt-1 text-xs text-slate-500">Active on platform</p>
                    </div>
                </div>


                <div className="col-span-2 relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-[#151515] p-6 shadow-xl border border-slate-700/50">
                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
                                <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total Earnings</span>
                        </div>
                        <p className="text-4xl font-bold text-white">
                            ${totalEarnings.toFixed(2)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">All time revenue</p>
                    </div>
                </div>

            </div>
        </div>
    );
}