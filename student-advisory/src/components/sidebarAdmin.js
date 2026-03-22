"use client"

import { sidebarAdmin } from "@/lib//sidebar/adminSidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";


export default function SidebarAdmin(){
    const pathname = usePathname();
        
    return(
        <div className="relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-64">
            <div className="h-full bg-[#02577A] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">

                <div className="flex flex-row h-[100px] w-full">
                    <div className="flex items-center transition-all duration-300">
                      <Image
                        src="/images/logo-uum.png"
                        alt="logo-uum.png"
                        width={180}
                        height={100}
                        className="object-cover w-[80px] h-[80px]"
                        priority
                        
                    />
                    </div>
                    <span className="flex flex-col justify-center"> 
                        <h3 className="text-white uppercase font-semibold text-[13px] tracking-[0.6px]">Student Advisory</h3>
                        <p className="text-gray-400 text-[10px] tracking-[1px] capitalize">School Of Computing</p>
                    </span>    
                </div>
                

                <nav className="mt-5 flex-grow">
                    {sidebarAdmin.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center p-4 text-md font-bold tracking-[1.5px] rounded-lg transition-colors mb-2 ${pathname === item.href ? "bg-white" : "text-white hover:bg-white hover:text-black"}`}>
                                <Icon size={23} className="min-w-[23px]"/>
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