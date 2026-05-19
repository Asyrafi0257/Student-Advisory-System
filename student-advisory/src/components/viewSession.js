"use client";

import { useEffect, useState } from "react"
import axios from "axios";
import Image from "next/image";

export default function SessionView() {
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/mentor/report");
            setReport(res.data.rows);
            console.log(res.data.rows);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden mx-4 sm:mx-5">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1D9E75] inline-block"></span>
                    <h2 className="font-medium text-sm sm:text-[15px] text-gray-900">View session</h2>
                </div>
                <span className="text-[11px] sm:text-[12px] text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-2 sm:px-3 py-0.5 w-fit">
                    {report.length} records
                </span>
            </div>

            {/* List */}
            <div className="flex flex-col divide-y divide-gray-100 px-2 sm:px-4 py-2 sm:py-3">
                {!report || report.length === 0 ? (
                    <p className="text-center text-gray-400 text-xs sm:text-sm py-8 sm:py-10">No Report Available</p>
                ) : (
                    report.map((item) => (
                        <div
                            key={item.report_id}
                            className="flex items-center gap-2 sm:gap-4 py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            {/* Image */}
                            <div className="w-10 sm:w-[52px] h-10 sm:h-[52px] rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                                <Image
                                    src={item.report_imagePath}
                                    alt="report"
                                    width={52}
                                    height={52}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs sm:text-[14px] font-medium text-gray-900 truncate">
                                    {item.report_title}
                                </span>
                                <span className="text-[11px] sm:text-[12px] text-gray-400 mt-0.5">
                                    {item.report_date.split("T")[0]}
                                </span>
                            </div>

                            {/* Meta */}
                            <div className="text-right flex-shrink-0 hidden sm:block">
                                <span className="text-[11px] sm:text-[12px] text-gray-400">
                                    {new Date(item.created_at).toLocaleString("en-MY", {
                                        timeZone: "Asia/Kuala_Lumpur",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}