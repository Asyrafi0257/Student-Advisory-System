"use client"

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import * as Icons from "lucide-react";

export default function Sidebar({ sidebarData, bgColor, sidebarOpen, setSidebarOpen }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {

        try {
            await axios.post("/api/logout");

            router.replace("/login");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className={`
            fixed lg:static top-0 left-0 z-50
            h-screen w-64
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
        `}>
                <div className={`h-full ${bgColor} backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]`}>

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


                    <nav className="mt-5 flex flex-col justify-between h-full">
                        <div>
                            {sidebarData.filter((item) => item.name !== "Logout").map((item, index) => {
                                //title section
                                if (item.section) {
                                    return (
                                        <p
                                            key={index}
                                            className="text-gray-400 text-sm mt-4 mb-1 px-1"
                                        >
                                            {item.section}
                                        </p>
                                    );
                                }
                                const Icon = Icons[item.icon]
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`flex items-center gap-3 mb-2 px-3 py-2 rounded-lg transition-all duration-200
                                            ${pathname.startsWith(item.href)
                                                ? "bg-white text-black"
                                                : "hover:bg-white hover:text-black text-white"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                        <div>
                            {sidebarData
                                .filter((item) => item.name === "Logout")
                                .map((item, index) => {
                                    const Icon = Icons[item.icon];
                                    return (


                                        <button
                                            key={index}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition-all text-white"
                                            onClick={handleLogout}
                                        >
                                            <Icon size={18} />
                                            <span>{item.name}</span>
                                        </button>
                                    );
                                })}
                        </div>
                    </nav>


                </div>
            </div>
        </>
    )
}