"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/axios"
import { Pencil, Trash2, X } from "lucide-react";

export default function CreateSessionPage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

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
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        api.get("/api/mentor/session")
            .then(res => setData(res.data.rows))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/mentor/session", form);
            console.log(response.data);
            alert("Session created successfully");
            window.location.reload();
            setForm({
                session_title: "",
                session_description: "",
                session_date: "",
                session_start_time: "",
                session_end_time: "",
                session_location: "",
                session_type: "online",
            });
        } catch (error) {
            console.log(error);
            alert("Failed create session");
        }
    };

    const handleDelete = async (session_id) => {
        if (!confirm("Are you sure to delete this session?")) return;
        try {
            const response = await axios.delete(`/api/mentor/session/[id]?session_id=${session_id}`);
            console.log(response.data);
            alert("Deleted successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Failed to delete");
        }
    };

    const handleEdit = async (session_id) => {
        try {
            const res = await axios.get(`/api/mentor/session/${session_id}`);
            setSelectedSession({
                ...res.data,
                session_date: res.data.session_date?.split("T")[0],
            });
            setOpen(true);
        } catch (err) { }
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 
        sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 
        px-3 sm:px-4 lg:px-0 mb-5">

            {/* CREATE FORM */}
            <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-2 py-5 border-b-2 border-[#008000] mx-6">
                    <h1 className="text-xl font-medium text-gray-800 tracking-tight">
                        Create Session
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="px-4 sm:px-5 lg:px-6 py-4 sm:py-5 space-y-4">

                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Session Title
                        </label>
                        <input
                            type="text"
                            name="session_title"
                            value={form.session_title}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="session_description"
                            value={form.session_description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Session Date
                        </label>
                        <input
                            type="date"
                            name="session_date"
                            value={form.session_date}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                Start session
                            </label>
                            <input
                                type="time"
                                name="session_start_time"
                                value={form.session_start_time}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                End session
                            </label>
                            <input
                                type="time"
                                name="session_end_time"
                                value={form.session_end_time}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                required
                            />
                        </div>

                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Location
                        </label>
                        <input
                            type="text"
                            name="session_location"
                            value={form.session_location}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Session Type
                        </label>
                        <select
                            name="session_type"
                            value={form.session_type}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                        >
                            <option value="online">Online</option>
                            <option value="physical">Physical</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#008000] text-white py-2.5 rounded-lg text-sm"
                    >
                        Create Session
                    </button>
                </form>
            </div>

            {/* SESSION LIST */}
            <div className="bg-white w-full border border-gray-100 shadow-sm rounded-xl sm:rounded-2xl overflow-hidden flex flex-col">
                <div className="px-2 py-5 border-b-2 border-[#008000] mx-4">
                    <h1 className="text-xl font-medium text-gray-800 tracking-tight">
                        Session Details
                    </h1>
                </div>

                <div className="overflow-y-auto flex-1 px-3 sm:px-4 py-3 sm:py-4 space-y-3 max-h-[70vh] sm:max-h-[600px]">

                    {!data || data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <p className="text-sm">No session created</p>
                        </div>
                    ) : (
                        data.map((item) => (
                            <div
                                key={item.session_id}
                                className="border border-gray-100 border-l-4 border-l-emerald-500 
                                rounded-lg sm:rounded-xl p-3 sm:p-4"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-1.5">

                                    <h4 className="text-sm sm:text-[14px] font-medium text-gray-800">
                                        {item.session_title}
                                    </h4>

                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => handleDelete(item.session_id)}
                                            className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-md"
                                        >
                                            <Trash2 size={13} />
                                        </button>

                                        <button
                                            onClick={() => handleEdit(item.session_id)}
                                            className="w-7 h-7 flex items-center justify-center bg-blue-500 text-white rounded-md"
                                        >
                                            <Pencil size={13} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-[12px] text-gray-400 mb-3">
                                    {item.session_description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    <span className="text-[11px] bg-gray-50 px-2 py-1 rounded-md border">
                                        📍 {item.session_location}
                                    </span>
                                    <span className="text-[11px] bg-gray-50 px-2 py-1 rounded-md border">
                                        🕔 {item.session_type}
                                    </span>
                                    <span className="text-[11px] bg-gray-50 px-2 py-1 rounded-md border">
                                        🕐 {item.session_start_time}
                                    </span>
                                    <span className="text-[11px] bg-gray-50 px-2 py-1 rounded-md border">
                                        🕔 {item.session_end_time}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* MODAL */}
            {open && selectedSession && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl sm:rounded-2xl shadow-xl 
                        w-[95vw] sm:w-[90vw] md:w-[500px] 
                        max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between px-4 sm:px-6 py-4 border-b-2 border-[#008000]">
                            <h3>Edit Session</h3>
                            <button onClick={() => setOpen(false)}>
                                <X size={16} />
                            </button>
                        </div>

                        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4">
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session title
                                </label>
                                <input
                                    value={selectedSession.session_title}
                                    onChange={(e) =>
                                        setSelectedSession({ ...selectedSession, session_title: e.target.value })
                                    }
                                    className="w-full bg-gray-50 border rounded-lg px-3.5 py-2.5 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session Date
                                </label>
                                <input
                                    type="date"
                                    name="session_date"
                                    value={selectedSession.session_date}
                                    onChange={(e) =>
                                        setSelectedSession({ ...selectedSession, session_date: e.target.value })
                                    }
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                        Start session
                                    </label>
                                    <input
                                        type="time"
                                        name="session_start_time"
                                        value={selectedSession.session_start_time}
                                        onChange={(e) =>
                                            setSelectedSession({ ...selectedSession, session_start_time: e.target.value })
                                        }
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                        End session
                                    </label>
                                    <input
                                        type="time"
                                        name="session_end_time"
                                        value={selectedSession.session_end_time}
                                        onChange={(e) =>
                                            setSelectedSession({ ...selectedSession, session_end_time: e.target.value })
                                        }
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                        required
                                    />
                                </div>

                            </div>
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session location
                                </label>
                                <input
                                    type="text"
                                    name="session_location"
                                    value={selectedSession.session_location}
                                    onChange={(e) =>
                                        setSelectedSession({ ...selectedSession, session_location: e.target.value })
                                    }
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session Type
                                </label>
                                <select
                                    name="session_type"
                                    value={selectedSession.session_type}
                                    onChange={(e) =>
                                        setSelectedSession({ ...selectedSession, session_type: e.target.value })
                                    }
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm"
                                >
                                    <option value="online">Online</option>
                                    <option value="physical">Physical</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session Description
                                </label>
                                <textarea
                                    value={selectedSession.session_description}
                                    onChange={(e) =>
                                        setSelectedSession({ ...selectedSession, session_description: e.target.value })
                                    }
                                    className="w-full bg-gray-50 border rounded-lg px-3.5 py-2.5 text-sm"
                                />
                            </div>


                            <button
                                onClick={async () => {
                                    await axios.put(
                                        `/api/mentor/session/${selectedSession.session_id}`,
                                        selectedSession
                                    );
                                    setOpen(false);
                                    alert("Updated");
                                }}
                                className="w-full bg-[#008000] text-white py-2.5 rounded-lg text-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}