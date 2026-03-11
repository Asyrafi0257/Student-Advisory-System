"use client"

import { sidebarAdmin } from "@/lib/adminSidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";


export default function SidebarAdmin(){
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
        
    return(
        <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-21"}`}>
            <div className="h-full bg-[#02577A] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
                <div className="flex flex-col">
                    <div className="flex w-full justify-center">
                      <Image
                        src="/images/logo-uum.png"
                        alt="/images/logo-uum.png"
                        width={80}
                        height={80}
                        className={` ${isSidebarOpen? "w-[180px] h-[100px]" : "w-[100px] h-[60px] "}`}
                        priority
                    />
                    <button onClick={handleOpen} className="p-2 rounded-md w-10 h-10 transition-colors max-w-fit cursor-pointer mr-[-30px] bg-white shadow-md text-black">
                        <Menu 
                        size={20}
                        
                        />
                    </button>  
                    </div>
                    <span className="flex justify-center mt-3 mb-10"> 
                        {isSidebarOpen ? <h3 className="uppercase text-white font-bold tracking-[2px] text-center">School of Computing</h3> : <h3 className="uppercase text-white font-bold tracking-[2px] text-center">Soc</h3>}
                    </span>    
                </div>
                

                <nav className="mt-8 flex-grow">
                    {sidebarAdmin.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center p-4 text-md font-bold tracking-[1.5px] rounded-lg hover:bg-[#ffffff] hover:text-black transition-colors mb-2 text-white ${
                                    pathname === item.href ? "bg-white" : "" 
                                }`}>
                                <Icon size={23} style={{minWidth: "23px"}}/>
                                {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.name}</span>}
                            </div>
                            </Link>
                        )
                    })}
                </nav>

            </div>
        </div>
    )
}