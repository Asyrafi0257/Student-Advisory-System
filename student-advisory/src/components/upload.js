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
            await axios.post("/api/addMentor", {
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
        <div>
            <div className="bg-[#ffffff] rounded-xl shadow-md p-4 md:p-6">
                <div className="flex border-b border-gray-300 mb-5 w-full flex justify-between">
                    <div className="w-full ">
                        <h2 className="font-semibold text-[24px]">Upload Files</h2>
                    </div>

                    {role === "mentor" &&
                        <div className="w-[250px] flex justify-end mr-5 mb-2">
                            <button className="text-[15px] bg-[#02577A] p-2 text-white rounded-lg font-bold cursor-pointer" onClick={handleForm}> + Add Mentor</button>
                        </div>
                    }
                </div>
                <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault() }}
                    className="flex flex-col justify-center items-center h-[200px] border-3 border-dashed border-blue-300 rounded-xl cursor-pointer">
                    <input type="file" onChange={handleFile} ref={fileInputRef} accept=".xlsx, .xls" className="hidden" id="fileInput" />
                    <Image
                        src="/images/upload-file.png"
                        alt="upload-file.png"
                        width={100}
                        height={100}
                        priority
                    />
                    <p className="mt-3"> <span className="text-blue-600">Click here</span> to upload your file or drag.</p>
                    <p className="text-gray-400 mt-3">Supported Format : xlsx, xls (10 mb each)</p>
                </div>

            </div>
            {isUploading && (
                <div className="w-full h-[80px] bg-[#ffffff] rounded-xl mt-4 mb-4 px-3 pt-1">
                    <div className="w-full flex justify-between">
                        <div className="ml-10">{file?.name}</div>
                        <span>{progress}%</span>
                    </div>

                    <div className="flex items-center">
                        <FileSpreadsheet className="w-8 h-8 text-green-500 mr-2" />
                        <progress className="w-full" value={progress} max="100" />
                    </div>


                </div>
            )}
            {file && !isUploading && (
                <p className="mt-2 text-green-600">Selected: {file.name}</p>
            )}


            {/* tempat admin nak add mentor manual */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-[400px] relative">
                        <h2 className="text-xl font-semibold mb-4">
                            Add Mentor
                        </h2>
                        {/* FORM */}
                        <input
                            value={mentorId}
                            onChange={(e) => { setMentorId(e.target.value) }}
                            type="text"
                            placeholder="Mentor Id"
                            className="w-full p-2 rounded mb-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300"
                        />
                        <input
                            value={mentorName}
                            onChange={(e) => { setMentorName(e.target.value) }}
                            type="text"
                            placeholder="Mentor Name"
                            className="w-full p-2 rounded mb-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300"
                        />

                        <input
                            value={mentorActive}
                            onChange={(e) => { setMentorActive(e.target.value) }}
                            type="email"
                            placeholder="Status"
                            className="w-full p-2 rounded mb-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300"
                        />

                        {/* BUTTON ACTION */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-3 py-1 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                className="px-3 py-1 bg-[#02577A] text-white rounded"
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