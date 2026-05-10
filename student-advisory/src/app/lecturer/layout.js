import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { sidebarMentor } from "@/lib/sidebar/mentorSidebar";

export const metadata = {
    title: "Mentor",
    describe: "This page for lecturer to know their mentee and also create session for them"
}

export default function Lecturer({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#EAF2F6]">
            {/* untuk sidebar */}
            <Sidebar sidebarData={sidebarMentor} bgColor="bg-[#008000]" />
            {/* untuk container for content */}
            <div className="flex flex-col flex-1 overflow-auto">
                {/* kandungan yang ada pada body */}
                <div className="max-w-7xl mx-auto w-full">
                    <Header profileUrl={"/lecturer/profile"} />
                    <main>{children}</main>
                </div>

            </div>
        </div>
    )
}