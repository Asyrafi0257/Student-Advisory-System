"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { sidebarAdmin } from "@/lib/sidebar/adminSidebar";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (

        <div className="flex h-screen overflow-hidden bg-[#EAF2F6]">
            {/* untuk sidebar */}
            <Sidebar sidebarData={sidebarAdmin} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} bgColor="bg-[#02577A]" />
            {/* untuk container for content */}
            <div className="flex flex-col flex-1 overflow-auto">
                {/* kandungan yang ada pada body */}
                <div className="max-w-7xl mx-auto w-full">
                    <Header profileUrl={"/admin/profile"} setSidebarOpen={setSidebarOpen} />
                    <main>{children}</main>
                </div>

            </div>
        </div>

    )
}