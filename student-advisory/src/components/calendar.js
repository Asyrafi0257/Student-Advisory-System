"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function MyCalendar() {
    const [sessions, setSessions] = useState([]);
    const [value, setValue] = useState(new Date());
    const [current, setCurrent] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/session");
            setSessions(res.data.rows);
        } catch (err) {
            console.log(err);
        }
    };

    const sessionDates = sessions.map((i) =>
        new Date(i.session_date).toDateString()
    );

    const hasEvent = (date) => sessionDates.includes(date.toDateString());

    const selectedSessions = sessions.filter(
        (i) => new Date(i.session_date).toDateString() === value.toDateString()
    );

    const yr = current.getFullYear();
    const mo = current.getMonth();
    const firstDay = new Date(yr, mo, 1).getDay();
    const daysInMonth = new Date(yr, mo + 1, 0).getDate();
    const prevMonthDays = new Date(yr, mo, 0).getDate();
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    const cells = Array.from({ length: totalCells }, (_, i) => {
        if (i < firstDay) return { date: new Date(yr, mo - 1, prevMonthDays - firstDay + i + 1), other: true };
        if (i >= firstDay + daysInMonth) return { date: new Date(yr, mo + 1, i - firstDay - daysInMonth + 1), other: true };
        return { date: new Date(yr, mo, i - firstDay + 1), other: false };
    });

    const today = new Date();
    const isSame = (a, b) => a.toDateString() === b.toDateString();

    return (
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 col-span-2 p-5 flex gap-4">

            {/* Custom Calendar */}
            <div className="w-[280px] shrink-0">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[15px] font-medium text-gray-800">
                        {MONTHS[mo]} {yr}
                    </span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrent(new Date(yr, mo - 1, 1))}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrent(new Date(yr, mo + 1, 1))}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Day names */}
                <div className="grid grid-cols-7 mb-1">
                    {DAYS.map((d) => (
                        <div key={d} className="text-center text-[11px] text-gray-300 pb-2">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-0.5">
                    {cells.map(({ date, other }, idx) => (
                        <button
                            key={idx}
                            onClick={() => setValue(date)}
                            className={`
                                aspect-square flex flex-col items-center justify-center rounded-lg text-[13px] gap-0.5 transition-colors
                                ${other ? "text-gray-200" : "text-gray-600 hover:bg-gray-50"}
                                ${isSame(date, today) && !other ? "text-blue-500 font-medium" : ""}
                                ${isSame(date, value) ? "!bg-blue-500 !text-white font-medium" : ""}
                            `}
                        >
                            <span>{date.getDate()}</span>
                            {hasEvent(date) && (
                                <span className={`w-1 h-1 rounded-full ${isSame(date, value) ? "bg-white/70" : "bg-blue-500"}`} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-100 self-stretch" />

            {/* Session detail */}
            <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                <span className="text-[12px] text-gray-400 bg-gray-50 rounded-lg px-3 py-1 self-start">
                    {value.toLocaleDateString("en-MY", {
                        weekday: "long", day: "numeric", month: "long", year: "numeric"
                    })}
                </span>

                {selectedSessions.length === 0 ? (
                    <p className="text-[13px] text-gray-300 mt-2">No sessions on this day.</p>
                ) : (
                    <>
                        <p className="text-[12px] font-medium text-gray-400">
                            {selectedSessions.length} session{selectedSessions.length > 1 ? "s" : ""}
                        </p>
                        {selectedSessions.map((s, idx) => (
                            <div
                                key={idx}
                                className="border-l-[3px] border-blue-500 rounded-r-xl border border-gray-100 p-3"
                            >
                                <p className="text-[13px] font-medium text-gray-800 mb-2">{s.session_title}</p>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        {s.session_location}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                                        <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                                        {new Date(s.session_date).toLocaleDateString("en-MY", {
                                            day: "numeric", month: "short", year: "numeric"
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </div>
    );
}