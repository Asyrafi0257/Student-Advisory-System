"use client";

//import axios from "axios";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User, Mail, Hash, GraduationCap } from "lucide-react";

export default function ViewMentee() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get("/api/mentee/dashboard");
            setData(res.data.mentor);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-2xl col-span-1 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 px-5 py-3 border-b border-[#000075]/20 bg-[#000075]/5">
                <GraduationCap size={16} className="text-[#000075]" />
                <h2 className="text-sm font-semibold tracking-wide text-[#000075] uppercase">Mentor Details</h2>
            </div>

            {/* Body */}
            <div className="flex flex-col sm:flex-row items-center px-4 py-4 gap-4">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <Image
                        src={data.mentor_imagePath || "/images/logo-profile.png"}
                        width={120}
                        height={120}
                        priority
                        unoptimized
                        className="rounded-xl object-cover border-2 border-[#000075]/20 w-20 h-20 sm:w-24 sm:h-24 lg:w-[110px] lg:h-[110px] shadow-sm"
                        alt="studImage"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-white rounded-full w-4 h-4" />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 w-full min-w-0">

                    {/* Mentor Name */}
                    <div className="flex flex-col gap-1">
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                            Mentor Name
                        </label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                            <User size={14} className="text-[#000075] flex-shrink-0" />
                            <h2 className="text-sm font-semibold text-gray-800 truncate">{data.mentor_name}</h2>
                        </div>
                    </div>

                    {/* Mentor ID */}
                    <div className="flex flex-col gap-1">
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                            Mentor ID
                        </label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                            <Hash size={14} className="text-[#000075] flex-shrink-0" />
                            <h4 className="text-sm text-gray-600 truncate">{data.mentor_id}</h4>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                            Email
                        </label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                            <Mail size={14} className="text-[#000075] flex-shrink-0" />
                            <p className="text-sm text-gray-600 truncate">{data.mentor_email}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}