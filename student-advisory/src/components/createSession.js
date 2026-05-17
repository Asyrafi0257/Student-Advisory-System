"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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
        axios.get("/api/mentor/session").then(res => setData(res.data.rows)).catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/mentor/session", form);
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
            console.log(res.data);
            console.log(selectedSession);
            setSelectedSession({
                ...res.data,
                session_date: res.data.session_date?.split("T")[0],
            });
            setOpen(true);
        } catch (err) { }
    };

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-5">

            {/* ── Create Form Panel ── */}
            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-2 py-5 border-b-2 border-[#008000] mx-6">
                    <h1 className="text-xl font-medium text-gray-800 tracking-tight">Create Session</h1>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                    {/* Session Title */}
                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Session Title
                        </label>
                        <input
                            type="text"
                            name="session_title"
                            value={form.session_title}
                            onChange={handleChange}
                            placeholder="Enter session title"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="session_description"
                            value={form.session_description}
                            onChange={handleChange}
                            placeholder="Enter session description"
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors resize-none"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Session Date
                        </label>
                        <input
                            type="date"
                            name="session_date"
                            value={form.session_date}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                            required
                        />
                    </div>

                    {/* Start + End Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                Start Time
                            </label>
                            <input
                                type="time"
                                name="session_start_time"
                                value={form.session_start_time}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                End Time
                            </label>
                            <input
                                type="time"
                                name="session_end_time"
                                value={form.session_end_time}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Location / Meeting Link
                        </label>
                        <input
                            type="text"
                            name="session_location"
                            value={form.session_location}
                            onChange={handleChange}
                            placeholder="Enter location or Google Meet link"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                            required
                        />
                    </div>

                    {/* Session Type */}
                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                            Session Type
                        </label>
                        <select
                            name="session_type"
                            value={form.session_type}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                        >
                            <option value="online">Online</option>
                            <option value="physical">Physical</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#008000] active:scale-[0.98] transition text-white py-2.5 rounded-lg font-medium text-sm mt-2"
                    >
                        Create Session
                    </button>
                </form>
            </div>

            {/* ── Session Details Panel ── */}
            <div className="bg-white w-full border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex flex-col">
                <div className="px-2 py-5 border-b-2 border-[#008000] mx-4">
                    <h1 className="text-xl font-medium text-gray-800 tracking-tight">Session Details</h1>
                </div>

                <div className="overflow-y-auto flex-1 px-4 py-4 space-y-3 max-h-[600px]">
                    {!data || data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400 mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">No session created</p>
                        </div>
                    ) : (
                        data.map((item) => (
                            <div
                                key={item.session_id}
                                className="bg-white border border-gray-100 border-l-[3px] border-l-emerald-500 rounded-xl p-4 hover:border-gray-200 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-1.5">
                                    <h4 className="text-[14px] font-medium text-gray-800 leading-snug pr-2">
                                        {item.session_title}
                                    </h4>
                                    <div className="flex gap-1.5 shrink-0">
                                        <button
                                            onClick={() => handleDelete(item.session_id)}
                                            className="w-7 h-7 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(item.session_id)}
                                            className="w-7 h-7 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                                        >
                                            <Pencil size={13} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
                                    {item.session_description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    <span className="inline-flex items-center gap-1 text-[11px] bg-gray-50 text-gray-500 border border-gray-200 rounded-md px-2 py-1">
                                        📍 {item.session_location}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[11px] bg-gray-50 text-gray-500 border border-gray-200 rounded-md px-2 py-1">
                                        🕐 {item.session_start_time}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[11px] bg-gray-50 text-gray-500 border border-gray-200 rounded-md px-2 py-1">
                                        🕔 {item.session_end_time}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 text-[11px] rounded-md px-2 py-1 font-medium border border-gray-200
                                        ${item?.session_type === "online"
                                            ? "bg-blue-50 text-blue-600"
                                            : "bg-emerald-50 text-emerald-600"
                                        }`}>
                                        {item?.session_type === "online" ? "💻 Online" : "🏢 Physical"}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ── Edit Modal ── */}
            {open && selectedSession && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl w-[500px] max-w-[95vw] max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#008000]">
                            <h3 className="text-base font-medium text-gray-800">Edit Session</h3>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-5 space-y-4">

                            {/* Session Title */}
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session Title
                                </label>
                                <input
                                    type="text"
                                    name="session_title"
                                    value={selectedSession.session_title}
                                    onChange={(e) => setSelectedSession({ ...selectedSession, session_title: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    name="session_description"
                                    value={selectedSession.session_description}
                                    onChange={(e) => setSelectedSession({ ...selectedSession, session_description: e.target.value })}
                                    rows={4}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors resize-none"
                                    required
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session Date
                                </label>
                                <input
                                    type="date"
                                    name="session_date"
                                    value={selectedSession.session_date}
                                    onChange={(e) => setSelectedSession({ ...selectedSession, session_date: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                    required
                                />
                            </div>

                            {/* Start + End Time */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        name="session_start_time"
                                        value={selectedSession.session_start_time}
                                        onChange={(e) => setSelectedSession({ ...selectedSession, session_start_time: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        name="session_end_time"
                                        value={selectedSession.session_end_time}
                                        onChange={(e) => setSelectedSession({ ...selectedSession, session_end_time: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Location / Meeting Link
                                </label>
                                <input
                                    type="text"
                                    name="session_location"
                                    value={selectedSession.session_location}
                                    onChange={(e) => setSelectedSession({ ...selectedSession, session_location: e.target.value })}
                                    placeholder="Enter location or Google Meet link"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                    required
                                />
                            </div>

                            {/* Session Type */}
                            <div>
                                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                                    Session Type
                                </label>
                                <select
                                    name="session_type"
                                    value={selectedSession.session_type}
                                    onChange={(e) => setSelectedSession({ ...selectedSession, session_type: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#008000]/20 focus:border-[#008000] transition-colors"
                                >
                                    <option value="online">Online</option>
                                    <option value="physical">Physical</option>
                                </select>
                            </div>

                            <button
                                onClick={async () => {
                                    try {
                                        await axios.put(`/api/mentor/session/${selectedSession.session_id}`, selectedSession);
                                        setOpen(false);
                                        alert("Edit Session successful");
                                    } catch (err) {
                                        console.log(err);
                                        alert("Session not successful edit!");
                                    }
                                }}
                                type="button"
                                className="w-full bg-[#008000] active:scale-[0.98] transition text-white py-2.5 rounded-lg font-medium text-sm"
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