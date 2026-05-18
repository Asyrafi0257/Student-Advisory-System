"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { sidebarMentor } from "@/lib/sidebar/mentorSidebar";
import { useState } from "react";

export default function Lecturer({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden bg-[#EAF2F6]">
            {/* untuk sidebar */}
            <Sidebar sidebarData={sidebarMentor} bgColor="bg-[#008000]" sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen} />
            {/* untuk container for content */}
            <div className="flex flex-col flex-1 overflow-auto">
                {/* kandungan yang ada pada body */}
                <div className="max-w-7xl mx-auto w-full">
                    <Header profileUrl={"/lecturer/profile"}
                        setSidebarOpen={setSidebarOpen} />
                    <main>{children}</main>
                </div>

            </div>
        </div>
    )
}