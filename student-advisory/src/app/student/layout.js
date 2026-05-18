"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { sidebarStudent } from "@/lib/sidebar/studentSidebar";

export default function Lecturer({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[#EAF2F6]">

            {/* SIDEBAR */}
            <Sidebar
                sidebarData={sidebarStudent}
                bgColor="bg-[#000075]"
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* CONTENT */}
            <div className="flex flex-col flex-1 overflow-auto">

                <div className="max-w-7xl mx-auto w-full">

                    <Header
                        profileUrl={"/student/profile"}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main>
                        {children}
                    </main>

                </div>

            </div>
        </div>
    );
}