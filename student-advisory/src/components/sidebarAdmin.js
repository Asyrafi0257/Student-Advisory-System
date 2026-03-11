"use client"

import { sidebarAdmin } from "@/lib/adminSidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function SidebarAdmin(){
    const pathname = usePathname();
        
    return(
        <div className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-64">
            <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
                <nav className="mt-8 flex-grow">
                    {sidebarAdmin.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 text-white ${
                                    pathname === item.href ? "bg-[#2f2f2f]" : "" 
                                }`}>
                                <Icon size={20} style={{minWidth: "20px"}}/>
                                <span className="ml-4 whitespace-nowrap">{item.name}</span>
                            </div>
                            </Link>
                        )
                    })}
                </nav>

            </div>
        </div>
    )
}