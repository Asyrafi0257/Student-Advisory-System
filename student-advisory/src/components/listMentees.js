"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Users, BadgeCheck, ChevronRight } from "lucide-react";

export default function ListMentees() {
    const [dataMentees, setDataMentees] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/mentor/viewMentee");
            setDataMentees(res.data.rows);
            console.log(res.data.rows);
        } catch (err) {
            console.log(err);
        }
    }

    function getInitials(name = "") {
        return name
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase();
    }

    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 h-[300px] mt-2 bg-white shadow-md rounded-xl border border-gray-100 flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-green-600">
                <div className="flex items-center gap-2">
                    <div className="bg-green-200 p-1.5 rounded-lg">
                        <Users size={16} className="text-green-700" />
                    </div>
                    <h2 className="text-[14px] sm:text-[15px] font-semibold text-gray-800">
                        List Mentees
                    </h2>
                </div>

                <span className="text-[10px] sm:text-[11px] font-medium bg-green-200 text-green-700 px-2.5 py-0.5 rounded-full">
                    {dataMentees.length} mentee{dataMentees.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">

                {!dataMentees || dataMentees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                        <Users size={28} className="text-green-100" />
                        <p className="text-sm">No data Mentees</p>
                    </div>
                ) : (
                    <table className="w-full table-auto">

                        <thead className="sticky top-0 bg-green-700 z-10">
                            <tr>
                                <th className="text-left text-white text-[11px] sm:text-[12px] font-medium px-3 sm:px-4 py-2.5 w-[140px] sm:w-[160px]">
                                    <div className="flex items-center gap-1.5">
                                        <BadgeCheck size={13} />
                                        No. Matric
                                    </div>
                                </th>

                                <th className="text-left text-white text-[11px] sm:text-[12px] font-medium px-3 sm:px-4 py-2.5">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={13} />
                                        Mentees Name
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataMentees.map((data) => (
                                <tr
                                    key={data.stud_matric}
                                    className="border-b border-green-200 hover:bg-green-100 transition-colors group"
                                >

                                    {/* Matric */}
                                    <td className="px-3 sm:px-4 py-2.5">
                                        <span className="font-mono text-[11px] sm:text-[12px] bg-green-200 text-green-800 px-2 py-0.5 rounded">
                                            {data.stud_matric}
                                        </span>
                                    </td>

                                    {/* Name */}
                                    <td className="px-3 sm:px-4 py-2.5">
                                        <div className="flex items-center gap-2.5">

                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-200 text-green-800 text-[10px] sm:text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                                                {getInitials(data.stud_name)}
                                            </div>

                                            <span className="text-[12px] sm:text-[13px] text-gray-700">
                                                {data.stud_name}
                                            </span>

                                            <ChevronRight
                                                size={13}
                                                className="ml-auto text-green-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}

            </div>
        </div>
    )
}