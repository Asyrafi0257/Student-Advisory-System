"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentView() {
    const [open, setOpen] = useState(false);
    const [studInfo, setStudInfo] = useState([]);

    useEffect(() => {
        featchData();
    }, []);

    const featchData = async () => {
        try {
            const res = await axios.get("/api/viewMentee");
            setStudInfo(res.data.rows);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const csStudent = studInfo.filter((item) => item.program === "Bachelor of Science Computer");
    const itStudent = studInfo.filter((item) => item.program === "Bachelor of Information Technology");

    const StudentCard = ({ data }) => (
        <div
            key={data.id}
            className="relative w-[180px] rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100 hover:border-green-200 overflow-hidden"
            onClick={() => setOpen(true)}
        >
            <div className="flex justify-center pt-5 pb-2">
                <div className="rounded-full border-[3px] border-green-200 overflow-hidden w-[80px] h-[80px]">
                    <Image
                        src={data.stud_imagePath || "/images/default-image.jpg"}
                        height={80}
                        width={80}
                        className="object-cover w-full h-full"
                        alt="Student"
                        loading="eager"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center px-3 pb-5 gap-1">
                <p className="text-[13px] font-semibold text-gray-800 tracking-wide text-center leading-tight line-clamp-2">{data.stud_name}</p>
                <p className="text-[11px] text-gray-400 tracking-widest font-medium">{data.stud_matric}</p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-2xl bg-green-900/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <span className="text-white text-[10px] font-semibold tracking-[0.15em] uppercase">Click for Details</span>
            </div>
        </div>
    );

    const SectionBlock = ({ badge, title, students, emptyMsg }) => (
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center flex-shrink-0 tracking-wide">
                    {badge}
                </span>
                <h3 className="text-[15px] font-semibold text-gray-800 leading-snug">{title}</h3>
            </div>

            {/* Cards */}
            {!students || students.length === 0 ? (
                <p className="text-center text-sm text-gray-400 italic py-10">{emptyMsg}</p>
            ) : (
                <div className="flex flex-wrap gap-4 px-6 py-6">
                    {students.map((data) => (
                        <StudentCard key={data.id} data={data} />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <>
            <div className="flex flex-col gap-5">

                <SectionBlock
                    badge="CS"
                    title="Bachelor of Computer Science with Honours [B.Comp.Sc. (Hons.)]"
                    students={csStudent}
                    emptyMsg="No mentee data from B.Comp.Sc. (Hons.)"
                />

                <SectionBlock
                    badge="IT"
                    title="Bachelor of Science with Honours (Information Technology) [BSc.(IT)]"
                    students={itStudent}
                    emptyMsg="No mentee data from BSc.(IT)"
                />

            </div>

            {/* ── Modal backdrop ── */}
            {/* {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                >
                    
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-md overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        
                        <div className="bg-[#008000] px-6 py-5 flex flex-col items-center gap-3">
                            <Image
                                src={""}
                                height={90}
                                width={90}
                                priority
                                className="rounded-full border-4 border-white shadow-md"
                                alt="Student"
                            />
                            <div className="text-center text-white">
                                <h2 className="text-lg font-bold tracking-wide">Name Student</h2>
                                <p className="text-green-100 text-sm">Matric Number</p>
                            </div>
                        </div>

                        
                        <div className="px-6 py-5 divide-y divide-gray-100">
                            {[
                                { label: "Programme", value: "B.Comp.Sc. (Hons.)" },
                                { label: "Faculty", value: "Computer Science & IT" },
                                { label: "Semester", value: "Semester 5" },
                                { label: "CGPA", value: "3.85 / 4.00" },
                                { label: "Status", value: "Full Time · Active" },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between py-3 text-sm">
                                    <span className="text-gray-400 font-medium">{label}</span>
                                    <span className="text-gray-800 font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>

                       
                        <div className="px-6 pb-5">
                            <button
                                onClick={() => setOpen(false)}
                                className="w-full py-2.5 rounded-lg bg-[#008000] text-white text-sm font-semibold tracking-wide hover:bg-green-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>

                        
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            )} */}
        </>
    );
}