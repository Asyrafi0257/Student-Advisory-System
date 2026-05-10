"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Lecturerprofile() {
    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        axios.get("/api/profile").then((res) => {
            setForm(res.data);
            setPreview(res.data.image);
        });
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        const img = e.target.files[0];
        if (!img) return;
        setFile(img);
        setPreview(URL.createObjectURL(img));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("mentor_id", form.id);
        data.append("mentor_name", form.name);
        data.append("mentor_email", form.email);
        if (file) data.append("profile", file);

        await axios.put("/api/profile", data);

        setLoading(false);
        setToast(true);
        setTimeout(() => setToast(false), 2500);
    };

    const inputClass =
        "w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150";

    const labelClass =
        "block text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1.5";

    return (
        <>
            {/* Toast */}
            <div
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full whitespace-nowrap pointer-events-none transition-all duration-200 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
            >
                ✓ Profile updated
            </div>

            <div className="max-w-lg mx-auto mt-10 px-4">
                <div className="bg-white border border-gray-200 rounded-2xl px-8 pt-8 pb-6 shadow-sm">

                    {/* Title */}
                    <p className="text-xs font-medium tracking-widest uppercase text-gray-400 text-center mb-6">
                        Edit Profile
                    </p>

                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-1.5">
                        <img
                            src={preview || "/images/logo-profile.png"}
                            alt="Profile photo"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 block"
                        />
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            title="Change photo"
                            className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors duration-150"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        </button>
                    </div>

                    <span
                        onClick={() => fileRef.current?.click()}
                        className="block text-xs text-gray-400 text-center mb-7 cursor-pointer hover:text-gray-500 transition-colors"
                    >
                        change photo
                    </span>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="hidden"
                    />

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name + Username */}
                        <div className="grid grid-cols-1">
                            <div>
                                <label className={labelClass}>User ID</label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8" />
                                    </svg>
                                    <input
                                        name="mentor_id"
                                        value={form.id || ""}
                                        onChange={handleChange}
                                        placeholder="Your ID"
                                        className={inputClass}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* <div>
                                <label className={labelClass}>Username</label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                                    </svg>
                                    <input
                                        name="username"
                                        value={form.username || ""}
                                        onChange={handleChange}
                                        placeholder="username"
                                        className={inputClass}
                                    />
                                </div>
                            </div> */}
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name || ""}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-t border-gray-100" />

                        {/* Password */}
                        <div>
                            <label className={labelClass}>
                                Email

                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email || ""}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 text-sm font-medium bg-[#02577A] text-white rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-150"
                        >
                            {loading ? "Saving…" : "Save Changes"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}