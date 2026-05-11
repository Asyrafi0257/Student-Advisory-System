"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

export default function CreateSessionPage() {
    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        session_title: "",
        session_description: "",
        session_date: "",
        session_start_time: "",
        session_end_time: "",
        session_location: "",
        session_type: "online",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        axios.get("/api/session").then(res => setData(res.data.rows)).catch(err => console.log(err));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                "/api/session",
                form
            );

            console.log(response.data);

            alert("Session created successfully");

            //bila data dh masuk dlm db then kita set balik kepada empty field
            setForm({
                session_title: "",
                session_description: "",
                session_date: "",
                session_start_time: "",
                session_end_time: "",
                session_location: "",
                session_type: "online",
            })

        } catch (error) {

            console.log(error);
            alert("Failed create session");
        }
    };

    return (

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 mb-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8 ">

                {/* Header */}
                <div className="mb-8 border-b-1 border-[#008000]">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 p-1">
                        Create Session
                    </h1>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Session Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Title
                        </label>

                        <input
                            type="text"
                            name="session_title"
                            value={form.session_title}
                            onChange={handleChange}
                            placeholder="Enter session title"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="session_description"
                            value={form.session_description}
                            onChange={handleChange}
                            placeholder="Enter session description"
                            rows={5}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                            required
                        />
                    </div>

                    {/* Date + Capacity */}
                    <div className="grid grid-cols-1 gap-5">

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Session Date
                            </label>

                            <input
                                type="date"
                                name="session_date"
                                value={form.session_date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        {/* Capacity */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Session Capacity
                            </label>

                            <input
                                type="number"
                                name="session_capacity"
                                value={form.session_capacity}
                                onChange={handleChange}
                                placeholder="Max mentee"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div> */}
                    </div>

                    {/* Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Start Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                            </label>

                            <input
                                type="time"
                                name="session_start_time"
                                value={form.session_start_time}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        {/* End Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time
                            </label>

                            <input
                                type="time"
                                name="session_end_time"
                                value={form.session_end_time}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location / Meeting Link
                        </label>

                        <input
                            type="text"
                            name="session_location"
                            value={form.session_location}
                            onChange={handleChange}
                            placeholder="Enter location or Google Meet link"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                            required
                        />
                    </div>

                    {/* Session Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Type
                        </label>

                        <select
                            name="session_type"
                            value={form.session_type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            <option value="online">
                                Online
                            </option>

                            <option value="physical">
                                Physical
                            </option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#008000] active:scale-[0.98] transition text-white py-3 rounded-xl font-semibold text-sm sm:text-base">
                        Create Session
                    </button>
                </form>
            </div>

            <div className="bg-[#ffffff] w-full shadow-xl max-w-2xl rounded-xl h-[580px] shadow-md p-5 sm:p-8">
                <div className="flex justify-start mb-3 border-b-1 border-[#008000]">
                    <h1 className="font-bold text-xl sm:text-3xl p-1">Session Details</h1>
                </div>
                <div className="overflow-auto h-[460px]">
                    {!data || data.length === 0 ? (
                        <p>No session created</p>
                    ) : (
                        <div className="mt-3 flex flex-col gap-3">
                            {data.map((item) => (
                                <div
                                    key={item.session_id}
                                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 border-l-[3px] border-l-emerald-500 rounded-xl p-4 hover:border-zinc-300 transition-colors"
                                >
                                    <div className="flex flex-row justify-between">
                                        <h4 className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100 mb-1.5">
                                            {item.session_title}
                                        </h4>
                                        <div className="flex flex-row justify-between w-[50px] mb-2">
                                            <Trash2 className="text-white bg-red-600 p-1 rounded-sm cursor-pointer" />
                                            <Pencil className="text-white bg-blue-600 p-1 rounded-sm cursor-pointer" />
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                                        {item.session_description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-1.5 text-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1">
                                            📍 {item.session_location}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1">
                                            🕐 {item.session_start_time}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1">
                                            🕔 {item.session_end_time}
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 text-[12px] rounded-md px-2.5 py-1 font-medium
                                            ${item?.session_type === "online"
                                                ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                                            } border border-zinc-200 dark:border-zinc-700`}>
                                            {item?.session_type === "online" ? "💻 Online" : "🏢 Physical"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>

        </div>

    );
}