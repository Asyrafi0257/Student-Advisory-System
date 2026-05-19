"use client"

import Image from "next/image";
import axios from "axios";
import { useState, useRef } from "react";
import { FileSpreadsheet } from "lucide-react";

export default function Upload({ url, role }) {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [mentorName, setMentorName] = useState("");
    const [mentorId, setMentorId] = useState("");
    const [mentorActive, setMentorActive] = useState("");

    const uploadFile = async (fileToUpload) => {

        //untuk simpan data seperti fail or form before send to server
        const formData = new FormData();

        //file => name file what server expect, while fileToUpload => file yang user input
        formData.append("file", fileToUpload);

        try {
            setIsUploading(true);

            //request to server
            const res = await axios.post(url, formData, {
                //nak bagitahu server bahawa data yang dihantar adalah file
                headers: { "Content-Type": "multipart/form-data" },
                //kita nk track progress in real time
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        //progressEvent.loaded => jumlah data yang dh upload
                        //progressEvent.total => jumlah keseluruhan data
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percent);
                }
            });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.error || "Upload failed");
        } finally {
            setIsUploading(false);
            setProgress(0);
            setFile(null);
        }

    }

    //function ni akan trigger bila event onDrop berlaku
    const handleDrop = (e) => {
        //nk pastikan browser tak buka file secara default
        e.preventDefault();

        //dataTransfer.file => senarai file yang user drag
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            uploadFile(e.dataTransfer.files[0]);

            //buang data drag untuk elak daripada duplicate
            e.dataTransfer.clearData();
        }
    };

    const handleFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            uploadFile(e.target.files[0]);
        }
    }

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleForm = () => {
        setShowForm(true)
    }

    const handleSubmit = async () => {

        try {
            await axios.post("/api/admin/addMentor", {
                mentor_id: mentorId,
                mentor_name: mentorName,
                mentor_active: mentorActive
            });

            setShowForm(false);
            alert("Mentor successfully add!");

        } catch (err) {
            alert("Mentor failed to upload!");
        }
    }

    return (
        <div className=" mx-4">
            <div className="bg-[#ffffff] rounded-xl shadow-md p-4 sm:p-5 md:p-6 w-full">

                {/* HEADER */}
                <div className="flex flex-row sm:items-center sm:justify-between border-b border-gray-300 mb-5 gap-3 pb-3">

                    <div className="w-full">
                        <h2 className="font-semibold text-[20px] sm:text-[22px] md:text-[24px]">
                            Upload Files
                        </h2>
                    </div>

                    {role === "mentor" &&
                        <div className=" sm:w-auto flex justifu-end sm:justify-end">
                            <button
                                className="w-[100px] md:w-[120px] sm:w-auto text-[11px] md:text-[15px] bg-[#02577A] p-2 text-white rounded-lg font-bold cursor-pointer"
                                onClick={handleForm}
                            >
                                + Add Mentor
                            </button>
                        </div>
                    }
                </div>

                {/* DROP ZONE */}
                <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault() }}
                    className="flex flex-col justify-center items-center min-h-[220px] sm:min-h-[250px] border-2 md:border-3 border-dashed border-blue-300 rounded-xl cursor-pointer px-4 text-center"
                >
                    <input
                        type="file"
                        onChange={handleFile}
                        ref={fileInputRef}
                        accept=".xlsx, .xls"
                        className="hidden"
                        id="fileInput"
                    />

                    <Image
                        src="/images/upload-file.png"
                        alt="upload-file.png"
                        width={90}
                        height={90}
                        priority
                        className="w-[70px] sm:w-[90px] md:w-[100px] h-auto"
                    />

                    <p className="mt-4 text-sm sm:text-base break-words">
                        <span className="text-blue-600 font-medium">
                            Click here
                        </span>{" "}
                        to upload your file or drag.
                    </p>

                    <p className="text-gray-400 mt-3 text-xs sm:text-sm text-center">
                        Supported Format : xlsx, xls (10 mb each)
                    </p>
                </div>

            </div>

            {/* PROGRESS */}
            {isUploading && (
                <div className="w-full bg-[#ffffff] rounded-xl mt-4 mb-4 px-3 sm:px-4 py-3 shadow-sm">

                    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                        <div className="text-sm sm:text-base break-all">
                            {file?.name}
                        </div>

                        <span className="text-sm font-medium">
                            {progress}%
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-7 h-7 sm:w-8 sm:h-8 text-green-500 shrink-0" />

                        <progress
                            className="w-full h-3"
                            value={progress}
                            max="100"
                        />
                    </div>

                </div>
            )}

            {/* FILE SELECTED */}
            {file && !isUploading && (
                <p className="mt-2 text-sm sm:text-base text-green-600 break-all">
                    Selected: {file.name}
                </p>
            )}

            {/* tempat admin nak add mentor manual */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

                    <div className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-[400px] relative">

                        <h2 className="text-lg sm:text-xl font-semibold mb-4">
                            Add Mentor
                        </h2>

                        {/* FORM */}
                        <input
                            value={mentorId}
                            onChange={(e) => { setMentorId(e.target.value) }}
                            type="text"
                            placeholder="Mentor Id"
                            className="w-full p-2.5 rounded mb-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 text-sm sm:text-base"
                        />

                        <input
                            value={mentorName}
                            onChange={(e) => { setMentorName(e.target.value) }}
                            type="text"
                            placeholder="Mentor Name"
                            className="w-full p-2.5 rounded mb-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 text-sm sm:text-base"
                        />

                        <input
                            value={mentorActive}
                            onChange={(e) => { setMentorActive(e.target.value) }}
                            type="email"
                            placeholder="Status"
                            className="w-full p-2.5 rounded mb-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 text-sm sm:text-base"
                        />

                        {/* BUTTON ACTION */}
                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">

                            <button
                                onClick={() => setShowForm(false)}
                                className="w-full sm:w-auto px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                className="w-full sm:w-auto px-4 py-2 bg-[#02577A] text-white rounded"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>

    )
}