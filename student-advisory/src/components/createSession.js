"use client";

import { useState } from "react";

export default function CreateSessionPage() {

    const [form, setForm] = useState({
        session_title: "",
        session_description: "",
        session_date: "",
        session_start_time: "",
        session_end_time: "",
        session_location: "",
        session_type: "online",
        session_capacity: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form);

        // API POST
        // await axios.post("/api/session/create", form)
    };

    return (


        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Create Mentor Session
                </h1>

                <p className="text-sm sm:text-base text-gray-500 mt-2">
                    Fill in the session details below
                </p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                    <div>
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
                    </div>
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

    );
}