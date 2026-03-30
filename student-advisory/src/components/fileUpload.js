"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { FileSpreadsheet, Search } from "lucide-react";


export default function FileUpload() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFile();
    },[])

    const fetchFile = async () => {
        try{
            const res = await axios.get("/api/files");
            console.log(res.data.rows)
            setFiles(res.data.rows);
        }catch(err){
            console.error(err);
        }
    }
    return (
        <div className="bg-[#ffffff] shadow-md rounded-xl h-[300px] p-4 md:p-6">
            <div className="flex flex-row border-b border-gray-300 pb-3 justify-between">
              <h3 className="font-bold text-[24px]">Attached Files</h3>
              <div className="relative w-sm">
                <input type="text" placeholder="search..." className="w-full h-[40px] shadow-sm rounded-lg border-1 border-gray-200 px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300"/>
                <button className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer">
                    <Search className="text-gray-400"/>
                </button>
              </div>
            </div>

            <div>
                {files.length === 0 ? ( 
                    <p>No Files found</p>
                ) : (
                    files.map((file) => (
                        <div key={file.uploads_id} className="mb-5 mt-5 pb-4 flex flex-row border-b-1 border-gray-300">
                            {/* icon file excel */}
                            <FileSpreadsheet className="w-[30px] h-[30px] text-green-400"/>
                            {/* display file name */}
                            <p>{file.file_name}</p>
                            <a
                                href={file.file_path}
                                target="_blank"
                                className="ml-4 text-blue-500 underline"
                            >
                                Open
                            </a>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}