"use client";

import ViewMentor from "@/components/viewMentor";
import { Sun, Coffee, Moon, Sparkles, Calendar, Clock, User, ChevronRight, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function Dashboard() {
    const [user, setUser] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const router = useRouter();

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) {
            return { text: "Good Morning", Icon: Coffee };
        } else if (hour < 18) {
            return { text: "Good Afternoon", Icon: Sun };
        } else {
            return { text: "Good Evening", Icon: Moon };
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await api.get("/api/profile");
            const session = await api.get("/api/mentee/viewSession");
            setUser(res.data);
            setSessionData(session.data.session)
            console.log(sessionData)
            console.log(user)
        } catch (err) {
            console.log(err);
        }
    }

    const handleView = (e) => {
        e.preventDefault();
        router.push("/student/viewSession")
    }

    const { text, Icon } = getGreeting();

    return (
        <div className="flex-1 overflow-auto relative z-10 mt-2">

            {/* Hero banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#000075] via-[#0a0090] to-[#1a00a0] shadow-lg rounded-2xl flex flex-row justify-start mx-4 sm:mx-6 lg:mx-8 h-[140px] sm:h-[160px] lg:h-[180px] mt-5">

                {/* Decorative blurred circles */}
                <div className="absolute top-[-30px] left-[-30px] w-40 h-40 bg-white opacity-5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-[-20px] left-[200px] w-24 h-24 bg-indigo-300 opacity-10 rounded-full blur-xl pointer-events-none" />

                {/* Left: Text content */}
                <div className="flex flex-col p-4 sm:p-5 lg:p-6 justify-center gap-1.5 sm:gap-2 z-10 w-full lg:w-[700px]">

                    {/* Greeting badge */}
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full w-fit backdrop-blur-sm">
                        <Sparkles size={12} className="text-yellow-300" />
                        Welcome back
                    </div>

                    {/* Greeting heading */}
                    <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-white flex items-center gap-2">
                        <Icon size={22} className="text-yellow-300 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        <span className="truncate">{text}, {user.name}</span>
                    </h2>

                    <p className="text-blue-200 text-xs sm:text-sm">
                        Welcome back to your mentee dashboard.
                    </p>
                </div>
            </div>

            {/* Grid — stack on mobile, side-by-side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-4 sm:mx-6 lg:mx-4 p-4">
                <ViewMentor />

                {/* Mentor session */}
                <div className="bg-white shadow-lg rounded-2xl col-span-1 border border-gray-100 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-[#000075]">
                        <div className="flex items-center gap-2">
                            <div className="bg-white p-1.5 rounded-lg">
                                <Calendar className="w-4 h-4 text-[#000075]" />
                            </div>
                            <h3 className="font-semibold text-white text-sm">Upcoming Session</h3>
                        </div>
                        <span
                            className="text-xs text-white font-medium cursor-pointer hover:underline"
                            onClick={handleView}
                        >
                            View all
                        </span>
                    </div>

                    {/* Body */}
                    <div className="px-4 sm:px-5 py-3 sm:py-4">
                        {!sessionData || sessionData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <Video className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-400 font-medium">No upcoming sessions</p>
                                <p className="text-xs text-gray-400">Your scheduled sessions will appear here</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {sessionData.map((item) => (
                                    <div
                                        key={item.session_id}
                                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-200 transition-colors flex-shrink-0">
                                                <Video className="w-4 h-4 text-indigo-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-800 leading-tight truncate">{item.session_title}</h3>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                    <p className="text-xs text-gray-400">{item.session_date.split("T")[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}