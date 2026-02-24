import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function dashboardLayout({
    children,
    adminDashboard,
    studentDashboard,
    tutorDashboard
}: {
    children: React.ReactNode;
    adminDashboard: React.ReactNode;
    studentDashboard: React.ReactNode;
    tutorDashboard: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />

                </header>
                <div className="flex flex-1 p-4">
                    <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" >
                        {studentDashboard}
                        {tutorDashboard}
                        {adminDashboard}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}