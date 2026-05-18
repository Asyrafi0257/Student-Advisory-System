"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, BookOpen, AlarmClock, ChevronRight, ChevronDown, Layers } from "lucide-react";

export default function SessionPage() {
    const [session, setSession] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/mentee/viewSession");
            setSession(res.data.session);
            console.log(res.data.session);
        } catch (err) {
            console.log(err);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="max-w-7xl bg-white shadow-md rounded-xl mx-8 mt-5 min-h-screen overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[#000075]/20 bg-gradient-to-r from-[#000075]/5 to-transparent">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#000075]/10">
                    <Layers size={18} className="text-[#000075]" />
                </div>
                <h2 className="font-bold text-[20px] text-[#000075] tracking-tight">View Sessions</h2>
            </div>

            {/* Body */}
            <div className="p-6">
                {!session || session.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                        <BookOpen size={40} strokeWidth={1.5} className="text-gray-300" />
                        <p className="text-sm font-medium">No session created by your mentor</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {session.map((data) => {
                            const isOpen = expandedId === data.session_id;
                            return (
                                <div
                                    key={data.session_id}
                                    className="rounded-xl border border-gray-100 hover:border-[#000075]/30 transition-all duration-200 overflow-hidden"
                                >
                                    {/* Card Row — click to toggle */}
                                    <div
                                        className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-[#000075]/[0.03] transition-all duration-200"
                                        onClick={() => toggleExpand(data.session_id)}
                                    >
                                        <div className={`w-1 self-stretch rounded-full transition-colors duration-200 ${isOpen ? "bg-[#000075]" : "bg-[#000075]/20 group-hover:bg-[#000075]"}`} />
                                        <div className="flex flex-col gap-1 flex-1">
                                            <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                                                {data.session_title}
                                            </h3>
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                                {data.session_description}
                                            </p>
                                        </div>
                                        {isOpen
                                            ? <ChevronDown size={16} className="text-[#000075] shrink-0 transition-all duration-200" />
                                            : <ChevronRight size={16} className="text-gray-300 group-hover:text-[#000075] group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                                        }
                                    </div>

                                    {/* Expanded Detail */}
                                    {isOpen && (
                                        <div className="flex items-center gap-6 px-6 py-3 bg-[#000075]/[0.04] border-t border-[#000075]/10">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Calendar size={13} className="text-[#000075]/70" />
                                                <span>{data.session_date.split("T")[0]}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Clock size={13} className="text-[#000075]/70" />
                                                <span>{data.session_start_time}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <AlarmClock size={13} className="text-[#000075]/70" />
                                                <span>{data.session_end_time}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}