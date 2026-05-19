"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { FileSpreadsheet, Search, Trash2 } from "lucide-react";

export default function FileUpload({ url, type, delUrl }) {
    const [files, setFiles] = useState([]);
    const [searchFiles, setSearchFiles] = useState("");

    useEffect(() => {
        fetchFile();
    }, []);

    //format untuk convert bytes to mb
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const fetchFile = async () => {
        try {
            const res = await axios.get(url);
            console.log(res.data.rows);
            setFiles(res.data.rows);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        //confirmation before delete file
        if (!confirm("Are you sure to delete this file?")) return;

        try {
            if (type === "mentor") {
                await axios.delete(`${delUrl}?id=${id}`);
                fetchFile();
            } else if (type === "student") {
                await axios.delete(`${delUrl}?id=${id}`);
                fetchFile();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filterFiles = files.filter((file) =>
        file.file_name?.toLowerCase().includes(searchFiles.toLowerCase())
    );

    return (
        <div className="bg-[#ffffff] shadow-md rounded-xl p-4 mx-4 md:p-6">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-gray-300 pb-4 gap-3">

                <h3 className="font-bold text-[20px] sm:text-[22px] md:text-[24px]">
                    Attached Files
                </h3>

                <div className="relative w-full lg:w-[320px]">
                    <input
                        type="text"
                        placeholder="search..."
                        className="w-full h-[42px] shadow-sm rounded-lg border border-gray-200 px-3 pr-10 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 text-sm sm:text-base"
                        value={searchFiles}
                        onChange={(e) => {
                            setSearchFiles(e.target.value);
                        }}
                    />

                    <Search className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-400 w-5 h-5" />
                </div>
            </div>

            {/* TABLE */}
            <div className="w-full overflow-x-auto overflow-y-auto max-h-[400px] mt-4 rounded-lg">

                {!filterFiles || filterFiles.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        No Files found
                    </div>
                ) : (
                    <table className="w-full min-w-[700px] table-auto">

                        <thead className="bg-[#02577A] text-white sticky top-0 z-10">
                            <tr>
                                <th className="text-sm md:text-base lg:text-lg py-3 px-3">
                                    File Name
                                </th>

                                <th className="text-sm md:text-base lg:text-lg py-3 px-3">
                                    Size
                                </th>

                                <th className="text-sm md:text-base lg:text-lg py-3 px-3">
                                    Date
                                </th>

                                <th className="text-sm md:text-base lg:text-lg py-3 px-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterFiles.map((file) => (
                                <tr
                                    key={file.uploads_id}
                                    className="text-center border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    {/* FILE NAME */}
                                    <td className="text-sm md:text-base py-3 px-3">
                                        <div className="flex items-center gap-2 min-w-0">

                                            <FileSpreadsheet className="text-green-400 shrink-0 w-5 h-5" />

                                            <div className="truncate text-left">
                                                {file.file_name}
                                            </div>

                                        </div>
                                    </td>

                                    {/* SIZE */}
                                    <td className="text-sm md:text-base py-3 px-3 whitespace-nowrap">
                                        {formatFileSize(file.file_size)}
                                    </td>

                                    {/* DATE */}
                                    <td className="text-sm md:text-base py-3 px-3 whitespace-nowrap">
                                        {file.created_at}
                                    </td>

                                    {/* ACTION */}
                                    <td className="py-3 px-3">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() =>
                                                    handleDelete(file.uploads_id)
                                                }
                                                className="bg-[#ff0000] hover:bg-red-700 transition p-2 rounded-md cursor-pointer"
                                            >
                                                <Trash2 className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>

        </div>
    );
}