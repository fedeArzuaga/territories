import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Topbar } from "@/components/Topbar/Topbar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col-reverse md:flex-row">
            <div className="fixed bottom-0 md:left-0 md:top-0 w-full md:w-auto lg:w-[300px]">
                <Sidebar />
            </div>
            <div className="flex-1 md:h-auto w-full md:w-10/12">
                <div className="fixed left-0 md:left-[89px] lg:left-[300px] top-0 right-0">
                    <Topbar />
                </div>
                <div className="p-6 pb-[73px] md:p-8 ml-0 md:ml-[89px] lg:ml-[300px] mt-[54px] md:mt-[72px]">
                    { children }
                </div>
            </div>
        </div>
    );
}