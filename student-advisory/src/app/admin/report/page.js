"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Report() {
    const [dataReport, setDataReport] = useState([]);
    const [openMentor, setOpenMentor] = useState({});
    const [expandedCard, setExpandedCard] = useState(null);

    useEffect(() => {
        fethData();
    }, [])

    const fethData = async () => {
        try {
            const res = await axios.get("/api/admin/report");
            setDataReport(res.data);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    const groupedReport = dataReport.reduce((acc, item) => {
        if (!acc[item.mentor_id]) {
            acc[item.mentor_id] = [];
        }

        acc[item.mentor_id].push(item);
        return acc;
    }, {});


    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-5 w-full bg-white shadow-md rounded-xl mt-2 pb-5 min-h-screen"
                >
                    <div className="mx-4 md:mx-6 pt-3 py-1 border-b-2 border-[#02577A]">
                        <h3 className="text-base md:text-lg">View Report</h3>
                    </div>

                    <div className="mt-5 mx-4 md:mx-6">
                        {!dataReport || dataReport.length === 0 ? (
                            <p className="text-center text-sm md:text-base">No report submitted by mentor</p>
                        ) : (
                            Object.values(groupedReport).map((mentorReports, mentorIndex) => {
                                const mentor = mentorReports[0];
                                const reportCount = mentorReports.length;
                                return (
                                    <motion.div
                                        key={mentor.mentor_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: mentorIndex * 0.1 }}
                                        className="group mb-4"
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenMentor((prev) => ({
                                                    ...prev,
                                                    [mentor.mentor_id]: !prev[mentor.mentor_id]
                                                }))
                                            }
                                            className="w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-md p-3 md:p-5 flex justify-between items-center rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#02577A] focus:ring-offset-2 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm md:text-lg shadow-md flex-shrink-0">
                                                    {mentor.mentor_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="text-left min-w-0">
                                                    <h2 className="text-sm md:text-lg font-semibold text-slate-900 truncate">{mentor.mentor_name}</h2>
                                                    <p className="text-xs md:text-sm text-slate-500 truncate">{mentor.mentor_id}</p>
                                                </div>
                                            </div>

                                            <span className="flex-shrink-0">
                                                <div className="flex flex-row items-center gap-2">
                                                    <p className="text-xs md:text-sm text-slate-500">{reportCount} {reportCount === 1 ? 'report' : 'reports'}</p>
                                                    {openMentor[mentor.mentor_id] ? <ChevronUp size={18} className="md:w-5 md:h-5" /> : <ChevronDown size={18} className="md:w-5 md:h-5" />}
                                                </div>

                                            </span>
                                        </button>

                                        {/* bila button click */}
                                        {openMentor[mentor.mentor_id] && (
                                            <div className="flex flex-row gap-2 md:gap-4 p-3 md:p-4 overflow-x-auto whitespace-nowrap">
                                                {mentorReports.map((items) => (
                                                    <div
                                                        key={items.report_id}
                                                        onClick={() =>
                                                            setExpandedCard(
                                                                expandedCard === items.report_id
                                                                    ? null
                                                                    : items.report_id
                                                            )
                                                        }
                                                        className={`flex-shrink-0 flex flex-row h-[150px] md:h-[200px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200 hover:border-blue-300 ${expandedCard === items.report_id
                                                            ? "w-full md:w-[380px] shadow-xl border-blue-400 bg-white"
                                                            : "w-[100px] md:w-[140px] hover:scale-105 hover:shadow-md"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col h-full w-full">
                                                            <div className="relative w-full h-full">
                                                                <Image
                                                                    src={items.report_imagePath}
                                                                    alt="imageReport"
                                                                    fill
                                                                    priority
                                                                    className="object-cover"
                                                                />
                                                            </div>

                                                            <p className="text-xs md:text-sm text-center p-1 bg-white flex-shrink-0">
                                                                {new Date(items.created_at).toLocaleDateString("en-GB", {
                                                                    timeZone: "Asia/Kuala_Lumpur",
                                                                })}
                                                            </p>
                                                        </div>

                                                        {expandedCard === items.report_id && (
                                                            <div className="flex flex-col ml-1 md:ml-2 my-1 md:my-2 border-l-2 border-[#02577A] w-[80px] md:w-[140px] p-1 md:p-2">
                                                                <div className="p-1 border-b border-gray-700">
                                                                    <h3 className="text-[10px] md:text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Title</h3>
                                                                    <span className="text-[11px] md:text-[13px] font-medium block line-clamp-2">{items.report_title}</span>

                                                                </div>
                                                                <div className="p-1 border-b border-gray-700">
                                                                    <h3 className="text-[10px] md:text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Location</h3>
                                                                    <span className="text-[11px] md:text-[13px] font-medium block line-clamp-2">{items.report_location}</span>
                                                                </div>
                                                                <div className="p-1">
                                                                    <h3 className="text-[10px] md:text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Date</h3>
                                                                    <span className="text-[11px] md:text-[13px] font-medium block">{items.report_date.split("T")[0]}</span>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )
                            })
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    )
}