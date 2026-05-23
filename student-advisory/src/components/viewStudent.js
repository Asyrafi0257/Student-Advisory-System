"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { GraduationCap, Home, Phone, Mail, X } from "lucide-react";

export default function StudentView() {
    const [open, setOpen] = useState(false);
    const [studInfo, setStudInfo] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        featchData();
    }, []);

    const featchData = async () => {
        try {
            const res = await api.get("/api/mentor/viewMentee");
            setStudInfo(res.data.rows);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const csStudent = studInfo.filter(
        (item) => item.program === "Bachelor of Science Computer"
    );

    const itStudent = studInfo.filter(
        (item) => item.program === "Bachelor of Information Technology"
    );

    const StudentCard = ({ data }) => (
        <div
            className="relative w-[150px] sm:w-[170px] md:w-[180px] rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100 hover:border-green-200 overflow-hidden"
            onClick={() => {
                setSelectedStudent(data);
                setOpen(true);
            }}
        >
            <div className="flex justify-center pt-5 pb-2">
                <div className="rounded-full border-[3px] border-green-200 overflow-hidden w-[70px] h-[70px] sm:w-[80px] sm:h-[80px]">
                    <Image
                        src={
                            data?.stud_imagePath && data.stud_imagePath.trim() !== ""
                                ? data.stud_imagePath
                                : "/images/default-image.jpg"
                        }
                        height={80}
                        width={80}
                        className="object-cover w-full h-full"
                        alt="Student"
                        loading="eager"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center px-2 sm:px-3 pb-5 gap-1">
                <p className="text-[12px] sm:text-[13px] font-semibold text-gray-800 tracking-wide text-center leading-tight line-clamp-2">
                    {data.stud_name}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-widest font-medium">
                    {data.stud_matric}
                </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-2xl bg-green-900/85 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <span className="text-white text-[10px] font-semibold tracking-[0.15em] uppercase">
                    Click for Details
                </span>
            </div>
        </div>
    );

    const SectionBlock = ({ badge, title, students, emptyMsg }) => (
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-100">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center flex-shrink-0 tracking-wide">
                    {badge}
                </span>
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-800 leading-snug">
                    {title}
                </h3>
            </div>

            {!students || students.length === 0 ? (
                <p className="text-center text-sm text-gray-400 italic py-10">
                    {emptyMsg}
                </p>
            ) : (
                <div className="flex flex-wrap gap-3 sm:gap-4 px-4 sm:px-6 py-6 justify-center sm:justify-start">
                    {students.map((data) => (
                        <StudentCard key={data.id} data={data} />
                    ))}
                </div>
            )}
        </div>
    );

    const infoRows = selectedStudent ? [
        { icon: <GraduationCap size={15} />, label: "Programme", value: selectedStudent.program },
        { icon: <Home size={15} />, label: "Inasis", value: selectedStudent.inasis },
        { icon: <Phone size={15} />, label: "Phone Number", value: selectedStudent.no_phone },
        { icon: <Mail size={15} />, label: "Email", value: selectedStudent.email_alternatif },
    ] : [];

    return (
        <>
            <div className="flex flex-col gap-5 mb-5 px-3 sm:px-4 lg:px-0">

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

            {/* MODAL */}
            {open && selectedStudent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                    onClick={() => { setOpen(false); setSelectedStudent(null); }}
                >
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close */}
                        <button
                            onClick={() => { setOpen(false); setSelectedStudent(null); }}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                        >
                            <X size={16} stroke="white" />
                        </button>

                        {/* Header */}
                        <div className="bg-gradient-to-br from-green-800 to-green-600 px-4 sm:px-6 pt-10 pb-8 flex flex-col items-center gap-3">

                            <div className="rounded-full border-4 border-white/80 shadow-lg overflow-hidden w-[90px] h-[90px] sm:w-[100px] sm:h-[100px]">
                                <Image
                                    src={
                                        selectedStudent?.stud_imagePath && selectedStudent.stud_imagePath.trim() !== ""
                                            ? selectedStudent.stud_imagePath
                                            : "/images/default-image.jpg"
                                    }
                                    height={100}
                                    width={100}
                                    className="object-cover w-full h-full"
                                    alt="Student"
                                    unoptimized
                                />
                            </div>

                            <div className="text-center">
                                <h2 className="text-lg sm:text-xl font-bold text-white">
                                    {selectedStudent.stud_name}
                                </h2>

                                <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white/90 text-[10px] sm:text-xs font-medium tracking-widest">
                                    {selectedStudent.stud_matric}
                                </span>
                            </div>

                        </div>

                        {/* BODY */}
                        <div className="px-4 sm:px-6 py-2 divide-y divide-gray-100">

                            {infoRows.map(({ icon, label, value }) => (
                                <div key={label} className="flex items-center justify-between py-3.5 text-sm gap-3">
                                    <div className="flex items-center gap-2 text-gray-400 font-medium shrink-0">
                                        <span className="text-green-600">{icon}</span>
                                        {label}
                                    </div>

                                    <span className="text-gray-800 font-semibold text-right truncate max-w-[55%]">
                                        {value}
                                    </span>
                                </div>
                            ))}

                        </div>

                        {/* FOOTER */}
                        <div className="px-4 sm:px-6 pt-2 pb-6">
                            <button
                                onClick={() => { setOpen(false); setSelectedStudent(null); }}
                                className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}