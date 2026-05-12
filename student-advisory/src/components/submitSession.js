"use client";

import { useState } from "react";
import axios from "axios";

export default function SubmitSessionPage() {
    const [form, setForm] = useState({
        image: "",
        title: "",
        date: "",
        location: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("date", form.date);
            formData.append("location", form.location);

            if (image) {
                formData.append("image", image);
            }

            const res = await axios.post(
                "/api/report",
                formData
            );

            alert(res.data.message);

            setForm({
                title: "",
                date: "",
                location: "",
            });
            setImagePreview(null)
            setImage(null);
        } catch (error) {
            console.log(error);
            alert("Failed submit session");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-5">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-2xl font-bold mb-6 border-b-1 border-[#008000] pb-2">
                    Submit Session
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* image */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Upload Image
                        </label>

                        <label className={`group relative flex flex-col items-center justify-center w-full rounded-2xl border-2 cursor-pointer transition-all duration-200
        ${imagePreview
                                ? "border-violet-400 bg-violet-50"
                                : "border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50"
                            }`}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="hidden"
                                required
                            />

                            {imagePreview ? (
                                /* ── Preview state ── */
                                <div className="relative w-full">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-52 object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m-6 6l-1 4 4-1 6-6-3.536-3.536L9 13z" />
                                        </svg>
                                        <span className="text-white text-sm font-medium">Change image</span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4m0 0 4 4m-4-4v9m4-13h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
                                        </svg>
                                        <span className="text-xs text-gray-700 truncate">{image?.name}</span>
                                    </div>
                                </div>
                            ) : (
                                /* ── Empty state ── */
                                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-violet-100 group-hover:bg-violet-200 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a1 1 0 001 1h16a1 1 0 001-1v-2.5M16 8l-4-4-4 4M12 4v12" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-violet-600">Click to upload</span>
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">PNG, JPG, WEBP — max 10MB</p>
                                </div>
                            )}
                        </label>
                    </div>
                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Session Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter session title"
                            className="w-full border-1 border-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-gray-300"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block mb-2 font-medium">
                                Session Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border-1 border-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                className="w-full border-1 border-gray-400 rounded-xl p-3 outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#008000] text-white rounded-xl p-3 font-semibold transition"
                    >
                        {loading ? "Submitting..." : "Submit Session"}
                    </button>
                </form>
            </div >
        </div >
    );
}