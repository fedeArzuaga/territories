import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Topbar } from "@/components/Topbar/Topbar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col-reverse md:flex-row">
            <div className="fixed bottom-0 md:relative w-full md:w-auto lg:w-2/12 lg:min-w-[300px]">
                <Sidebar />
            </div>
            <div className="flex-1 md:h-auto w-full md:w-10/12">
                <div>
                    <Topbar />
                </div>
                <div className="p-6 md:p-8">
                    { children }
                </div>
            </div>
        </div>
    );
}