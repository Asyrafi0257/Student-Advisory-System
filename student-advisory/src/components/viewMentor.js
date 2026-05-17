"use client";

import axios from "axios";
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
            const res = await axios.get("/api/mentee/dashboard");
            setData(res.data.mentor);
            console.log(data);
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="bg-white shadow-lg rounded-2xl mt-5 mx-8 col-span-1 max-w-lg h-[250px] border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 px-5 py-3 border-b border-[#000075]/20 bg-[#000075]/5">
                <GraduationCap size={16} className="text-[#000075]" />
                <h2 className="text-sm font-semibold tracking-wide text-[#000075] uppercase">Mentor Details</h2>
            </div>

            {/* Body */}
            <div className="flex flex-row items-center h-[200px] px-4 gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <Image
                        src={data.mentor_imagePath || "/images/logo-profile.png"}
                        width={120}
                        height={120}
                        priority
                        className="rounded-xl object-cover border-2 border-[#000075]/20 w-[110px] h-[110px] shadow-sm"
                        alt="studImage"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-white rounded-full w-4 h-4" />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <User size={14} className="text-[#000075] flex-shrink-0" />
                        <h2 className="text-sm font-semibold text-gray-800">{data.mentor_name}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Hash size={14} className="text-[#000075] flex-shrink-0" />
                        <h4 className="text-sm text-gray-600">{data.mentor_id}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#000075] flex-shrink-0" />
                        <p className="text-sm text-gray-600 truncate">{data.mentor_email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}