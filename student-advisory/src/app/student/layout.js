import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { sidebarStudent } from "@/lib/sidebar/studentSidebar";

export default function Lecturer({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#EAF2F6]">
            {/* untuk sidebar */}
            <Sidebar sidebarData={sidebarStudent} bgColor="bg-[#008000]" />
            {/* untuk container for content */}
            <div className="flex flex-col flex-1 overflow-auto">
                {/* kandungan yang ada pada body */}
                <div className="max-w-7xl mx-auto w-full">
                    <Header profileUrl={"/student/profile"} />
                    <main>{children}</main>
                </div>

            </div>
        </div>
    )
}