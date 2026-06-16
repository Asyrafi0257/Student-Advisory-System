"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function HistoryMentor() {
    const [dataHistory, setDataHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await api.get("/api/mentee/history");

            setDataHistory(res.data.rows);

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gray-50 px-2 sm:px-4">

            {/* CENTER CONTAINER */}
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md mt-6 mb-6">

                {/* HEADER */}
                <div className="p-3 sm:p-4 border-b-2 border-[#02577A]">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#02577A]">
                        History Assignment
                    </h2>
                </div>

                {/* CONTENT */}
                <div className="p-2 sm:p-4 overflow-x-auto">

                    {loading ? (
                        <p className="text-gray-500 text-sm">Loading data...</p>
                    ) : dataHistory.length === 0 ? (
                        <p className="text-gray-500 text-sm">No history found</p>
                    ) : (
                        <table className="w-full min-w-[500px] sm:min-w-[600px] border border-gray-200 text-xs sm:text-sm">

                            <thead className="bg-[#02577A] text-white">
                                <tr>
                                    {/* <th className="p-2 text-left whitespace-nowrap">ID</th> */}
                                    <th className="p-2 text-left whitespace-nowrap">STAFF NO</th>
                                    <th className="p-2 text-left whitespace-nowrap">MENTOR NAME</th>
                                    <th className="p-2 text-left whitespace-nowrap">STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataHistory.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        {/* <td className="p-2 whitespace-nowrap">
                                            {item.stud_id}
                                        </td> */}

                                        <td className="p-2 whitespace-nowrap">
                                            {item.mentor_id}
                                        </td>

                                        <td className="p-2 whitespace-nowrap">
                                            {item.mentor_name || "-"}
                                        </td>

                                        <td className="p-2">
                                            <span className="bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded-lg uppercase inline-block">
                                                {item.mentor_active || "-"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}