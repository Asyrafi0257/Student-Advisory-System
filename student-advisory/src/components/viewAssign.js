"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function viewAssign() {
    const [dataAssign, setDataAssign] = useState([]);

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
            const res = await axios.get("/api/viewAssign");
            setDataAssign(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const grouped = groupData(dataAssign);
    return (
        <div className="bg-[#ffffff] shadow-lg rounded-xl p-4 mt-5">
            <div className="w-full border-b border-gray-300 flex flex-row">
                <div className="w-full">
                    <h2 className="text-[20px] font-semibold">
                        List Mentor Mentee
                    </h2>
                </div>
                <div className="w-[300px] flex justify-end relative">
                    <input
                        type="text"
                        placeholder="Search mentor..."
                        className="outline outline-gray-300 rounded-sm h-[30px] p-2 mb-2"
                    />
                    <Search className="absolute text-gray-400 top-1/2 -translate-y-1/2 right-2" />
                </div>
            </div>

            {/* HEADER */}
            <div className="flex flex-row bg-[#02577A] w-full mt-5">
                <div className="w-full flex justify-center p-2">
                    <h2 className="text-white font-semibold">Mentor</h2>
                </div>
                <div className="w-full flex justify-center p-2">
                    <h2 className="text-white font-semibold">Mentee</h2>
                </div>
            </div>

            {/* DATA */}
            <div className="w-full mt-2">
                {dataAssign.length === 0 ? (
                    <p className="text-center">No data mentor mentee</p>
                ) : (
                    Object.keys(grouped).map((mentor, index) => (
                        <div
                            key={index}
                            className="flex flex-row border-b border-gray-300 items-center"
                        >
                            {/* Mentor */}
                            <div className="w-full text-center p-2">
                                {mentor}
                            </div>

                            {/* Mentee (grouped) */}
                            <div className="w-full text-center m-2">
                                <ul className="list-disc text-left inline-block w-[480px]">
                                    {grouped[mentor].map((mentee, i) => (
                                        <li className="border-b-1 border-gray-300 mt-2 mb-2" key={i}>{mentee}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}