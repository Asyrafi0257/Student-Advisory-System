"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function viewAssign() {
    const [dataAssign, setDataAssign] = useState([]);
    const [search, setSearch] = useState("");

    //kita nak group kan mentee yang sama mentor
    const groupData = (data) => {
        const grouped = {};

        data.forEach(item => {
            if (!grouped[item.mentor]) {
                grouped[item.mentor] = [];
            }
            grouped[item.mentor].push(item.mentee);
        });

        return grouped;
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/admin/viewAssign");
            setDataAssign(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filterAssign = dataAssign.filter((data) => (
        data.mentor?.toLowerCase().includes(search.toLowerCase())
    ));

    const grouped = groupData(filterAssign);

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 mx-4">
            {/* HEADER & SEARCH */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 border-b border-gray-200 pb-4 sm:pb-5 mb-5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                    Mentor-Mentee Assignments
                </h2>

                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search mentor..."
                        className="w-full sm:w-[280px] lg:w-[320px] px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* TABLE HEADER - HIDDEN ON MOBILE */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 bg-[#02577A] rounded-t-lg overflow-hidden">
                <div className="p-4 sm:p-4 lg:p-5">
                    <h3 className="text-white font-semibold text-sm sm:text-base">Mentor</h3>
                </div>
                <div className="p-4 sm:p-4 lg:p-5">
                    <h3 className="text-white font-semibold text-sm sm:text-base">Mentees</h3>
                </div>
            </div>

            {/* DATA SECTION */}
            <div className="w-full">
                {!filterAssign || filterAssign.length === 0 ? (
                    <div className="flex justify-center items-center py-12 sm:py-16">
                        <p className="text-gray-500 text-sm sm:text-base">No mentor-mentee data found</p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-0">
                        {/* DESKTOP/TABLET VIEW */}
                        {Object.keys(grouped).map((mentor, index) => (
                            <div
                                key={index}
                                className="hidden sm:grid sm:grid-cols-2 gap-4 border-b border-gray-200 hover:bg-blue-50 transition-colors"
                            >
                                {/* MENTOR */}
                                <div className="p-4 sm:p-4 lg:p-5 flex items-center justify-center">
                                    <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900">
                                        {mentor}
                                    </span>
                                </div>

                                {/* MENTEES */}
                                <div className="p-4 sm:p-4 lg:p-5">
                                    <ul className="space-y-1.5 sm:space-y-2">
                                        {grouped[mentor].map((mentee, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center text-xs sm:text-sm lg:text-base text-gray-700 px-2 py-1 hover:bg-white rounded transition-colors"
                                            >
                                                <span className="inline-block w-1.5 h-1.5 bg-[#02577A] rounded-full mr-2.5 flex-shrink-0"></span>
                                                <span>{mentee}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        {/* MOBILE VIEW - CARDS */}
                        <div className="sm:hidden space-y-3">
                            {Object.keys(grouped).map((mentor, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
                                >
                                    {/* Mentor Name */}
                                    <div className="mb-3 pb-3 border-b-2 border-[#02577A]">
                                        <h4 className="text-sm font-bold text-[#02577A]">
                                            {mentor}
                                        </h4>
                                    </div>

                                    {/* Mentees Count & List */}
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-2.5 uppercase tracking-wide">
                                            Mentees ({grouped[mentor].length})
                                        </p>
                                        <ul className="space-y-1.5">
                                            {grouped[mentor].map((mentee, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center text-xs text-gray-700 px-2 py-1.5 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                    <span className="inline-block w-1 h-1 bg-[#02577A] rounded-full mr-2 flex-shrink-0"></span>
                                                    {mentee}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}