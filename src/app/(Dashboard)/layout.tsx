import { AppSidebar } from "@/components/layout/app-sidebar";
import { userService } from "@/components/service/user.service";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserRole } from "@/constant/userRole";
import { redirect } from "next/navigation";

export default async function dashboardLayout({
    adminDashboard,
    studentDashboard,
    tutorDashboard
}: {
    adminDashboard: React.ReactNode;
    studentDashboard: React.ReactNode;
    tutorDashboard: React.ReactNode;
}) {

    const session = await userService.getSession()

    if (!session?.data?.user) {
        redirect("/login");
    }

    const role = session?.data?.user?.role
    const user = session.data.user

    let dashboard: React.ReactNode;
    switch (role) {
        case UserRole.student:
            dashboard = studentDashboard
            break;
        case UserRole.tutor:
            dashboard = tutorDashboard
            break;
        case UserRole.admin:
            dashboard = adminDashboard
            break;

        default:
            break;
    }

    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <div>
                        <h1 className="text-xl font-bold">Hello, {user.name}</h1>
                        <p className="text-xs">What would you like to learn today?</p>
                    </div>
                </header>
                <div className="flex flex-1 p-4">
                    <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-2.5" >
                        {dashboard}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}