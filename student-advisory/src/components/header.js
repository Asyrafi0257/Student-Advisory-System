"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Menu, UserCircle } from "lucide-react";
import api from "@/lib/axios";

export default function Header({ profileUrl, setSidebarOpen }) {
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/profile")
            .then(res => setProfile(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleEditProfile = () => {
        router.push(profileUrl);
        setOpen(false);
    }

    return (
        <header className="bg-white flex shadow-lg mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between w-full">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black">
                        Dashboard
                    </h1>
                </div>

                {/* PROFILE SECTION */}
                <div className="relative">
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-100 px-2 sm:px-3 py-2 rounded-lg transition"
                    >
                        {/* Image — responsive size */}
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-13 lg:h-13 flex-shrink-0">
                            <Image
                                src={profile?.image || "/images/logo-profile.png"}
                                alt="profile"
                                fill
                                sizes="50px"
                                unoptimized
                                className="rounded-full border border-gray-300 object-cover"
                            />
                        </div>

                        {/* Name & email — hidden on mobile */}
                        <div className="hidden sm:flex flex-col">
                            <span className="text-sm font-semibold text-black">
                                {profile?.name || "User"}
                            </span>
                            <span className="text-xs text-gray-500">
                                {profile?.email || "user@email.com"}
                            </span>
                        </div>
                    </div>

                    {/* DROPDOWN */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">

                            {/* Profile info on mobile (shown in dropdown) */}
                            <div className="sm:hidden px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-black truncate">
                                    {profile?.name || "User"}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {profile?.email || "user@email.com"}
                                </p>
                            </div>

                            <button
                                onClick={handleEditProfile}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                            >
                                <UserCircle size={15} className="text-gray-500" />
                                <span className="text-sm">Edit Profile</span>
                            </button>

                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}