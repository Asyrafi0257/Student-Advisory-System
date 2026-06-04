"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import {
    Hash,
    User,
    Mail,
    BookOpen,
    Users,
    Code,
    GraduationCap,
    CalendarDays,
    Languages,
    Accessibility,
    Home,
    Phone,
    AtSign,
    MapPin,
    Map,
    Banknote,
    HeartHandshake,
    Camera,
} from "lucide-react";

export default function StudentProfile() {
    const [form, setForm] = useState({
        matric: "",
        name: "",
        email: "",
        program: "",
        gender: "",
        code_uum: "",
        academic_qualifications: "",
        pmk_masuk: "",
        band_muet: "",
        status_oku: "",
        disability: "",
        inasis: "",
        no_phone: "",
        email_uum: "",
        stud_address: "",
        state: "",
        parent_income: ""
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);
    const fileRef = useRef(null);
    const programs = ["Bachelor of Science Computer", "Bachelor of Science IT"];

    useEffect(() => {
        try {
            api.get("/api/profile").then((res) => {
                setForm(res.data);
                setPreview(res.data?.image);
                console.log(form)
                console.log("successfully")
            });
        } catch (err) {
            console.log(err);
        }
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
        try {
            e.preventDefault();
            setLoading(true);

            const data = new FormData();
            data.append("stud_name", form.name);
            data.append("stud_email", form.email);
            data.append("program", form.program);
            data.append("gender", form.gender);
            data.append("code_uum", form.code_uum);
            data.append("academic_qualifications", form.academic_qualifications);
            data.append("pmk_masuk", form.pmk_masuk);
            data.append("band_muet", form.band_muet);
            data.append("status_oku", form.status_oku);
            data.append("inasis", form.inasis);
            data.append("no_phone", form.no_phone);
            data.append("email_uum", form.email_uum);
            data.append("student_address", form.stud_address);
            data.append("state", form.state);
            data.append("parent_income", form.parent_income);
            data.append("disability", form.disability);

            if (file) data.append("profile", file);

            await api.put("/api/profile", data);

            setLoading(false);
            setToast(true);
            setTimeout(() => setToast(false), 2500)
        } catch (err) {
            console.log(err);
        }
    };

    const inputClass =
        "w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-300 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150";

    const labelClass =
        "block text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1.5";

    const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none";

    return (
        <>
            {/* Toast */}
            <div
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full whitespace-nowrap pointer-events-none transition-all duration-200 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
            >
                ✓ Profile updated
            </div>

            <div className="max-w-6xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6 lg:px-4 pb-10">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 shadow-sm">

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
                            <Camera size={14} />
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

                        {/* User ID, Full Name, Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            <div className="sm:col-span-1 lg:col-span-1">
                                <label className={labelClass}>User ID</label>
                                <div className="relative">
                                    <Hash size={15} className={iconClass} />
                                    <input
                                        name="stud_id"
                                        value={form.matric || ""}
                                        placeholder="Your ID"
                                        className={inputClass}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1 lg:col-span-2">
                                <label className={labelClass}>Full Name</label>
                                <div className="relative">
                                    <User size={15} className={iconClass} />
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
                            <div className="sm:col-span-2 lg:col-span-2">
                                <label className={labelClass}>Email</label>
                                <div className="relative">
                                    <Mail size={15} className={iconClass} />
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
                        </div>

                        {/* Program, Gender, Code UUM, Academic Qualifications */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            <div className="sm:col-span-2 lg:col-span-2">
                                <label className={labelClass}>Program</label>
                                <div className="relative">
                                    <BookOpen size={15} className={iconClass} />
                                    <select name="program" value={form.program} onChange={handleChange} className={inputClass}>
                                        <option value="">Select</option>
                                        {programs.map((p, i) => (
                                            <option key={i} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-1 lg:col-span-1">
                                <label className={labelClass}>Gender</label>
                                <div className="relative">
                                    <Users size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="gender"
                                        value={form.gender || ""}
                                        onChange={handleChange}
                                        placeholder="Gender"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1 lg:col-span-1">
                                <label className={labelClass}>Code UUM</label>
                                <div className="relative">
                                    <Code size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="code_uum"
                                        value={form.code_uum || ""}
                                        onChange={handleChange}
                                        placeholder="Code UUM"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className={labelClass}>Academic Qualifications</label>
                                <div className="relative">
                                    <GraduationCap size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="academic_qualifications"
                                        value={form.academic_qualifications || ""}
                                        onChange={handleChange}
                                        placeholder="Qualifications"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PMK, Band MUET, Status OKU, Inasis, Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            <div>
                                <label className={labelClass}>Pmk Masuk</label>
                                <div className="relative">
                                    <CalendarDays size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="pmk_masuk"
                                        value={form.pmk_masuk || ""}
                                        onChange={handleChange}
                                        placeholder="Pmk"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Band Muet</label>
                                <div className="relative">
                                    <Languages size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="band_muet"
                                        value={form.band_muet || ""}
                                        onChange={handleChange}
                                        placeholder="Band Muet"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Status OKU</label>
                                <div className="relative">
                                    <Accessibility size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="status_oku"
                                        value={form.status_oku || ""}
                                        onChange={handleChange}
                                        placeholder="Status OKU"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Inasis</label>
                                <div className="relative">
                                    <Home size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="inasis"
                                        value={form.inasis || ""}
                                        onChange={handleChange}
                                        placeholder="Inasis"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>No. Phone</label>
                                <div className="relative">
                                    <Phone size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="no_phone"
                                        value={form.no_phone || ""}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email UUM, Address, State, Parent Income */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div>
                                <label className={labelClass}>Email UUM</label>
                                <div className="relative">
                                    <AtSign size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="email_uum"
                                        value={form.email_uum || ""}
                                        onChange={handleChange}
                                        placeholder="Email UUM"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Address</label>
                                <div className="relative">
                                    <MapPin size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="stud_address"
                                        value={form.stud_address || ""}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>State</label>
                                <div className="relative">
                                    <Map size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state || ""}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Parent Income</label>
                                <div className="relative">
                                    <Banknote size={15} className={iconClass} />
                                    <input
                                        type="text"
                                        name="parent_income"
                                        value={form.parent_income || ""}
                                        onChange={handleChange}
                                        placeholder="Parent Income"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Disability */}
                        <div>
                            <label className={labelClass}>Disability</label>
                            <div className="relative">
                                <HeartHandshake size={15} className={iconClass} />
                                <textarea
                                    name="disability"
                                    value={form.disability || ""}
                                    onChange={handleChange}
                                    placeholder="Disability Description"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 text-sm font-medium bg-[#000075] text-white rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-150"
                        >
                            {loading ? "Saving…" : "Save Changes"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}