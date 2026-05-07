"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
    const [admin, setAdmin] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/profile")
            .then(res => setAdmin(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleEditProfile = () => {
        router.push("/admin/profile");
        setOpen(false);
    }

    return (
        <header className="bg-white flex shadow-lg mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between w-full">

                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black">
                    Dashboard
                </h1>

                {/* PROFILE SECTION */}
                <div className="relative">

                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >
                        <Image
                            src={admin?.admin_imagePath || "/images/logo-profile.png"}
                            alt="profile"
                            width={40}
                            height={40}
                            className="rounded-full border-1 border-gray-300"
                        />

                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-black">
                                {admin?.admin_name || "Admin"}
                            </span>
                            <span className="text-xs text-gray-500">
                                {admin?.admin_email || "admin@email.com"}
                            </span>
                        </div>
                    </div>

                    {/* DROPDOWN */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">

                            <button
                                onClick={handleEditProfile}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                Edit Profile
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </header>
    );
}