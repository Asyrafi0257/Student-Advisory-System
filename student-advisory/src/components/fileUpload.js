"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { FileSpreadsheet, Search, Trash2 } from "lucide-react";


export default function FileUpload() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFile();
    },[])

    //format untuk convert bytes to mb
    const formatFileSize = (bytes) => {
        if(bytes < 1024) return bytes + " B";
        if(bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }

    const fetchFile = async () => {
        try{
            const res = await axios.get("/api/files");
            console.log(res.data.rows)
            setFiles(res.data.rows);
        }catch(err){
            console.error(err);
            alert(err.message)
        }
    }
    const handleDelete = async (id) =>  {
        //confirmation before delete file
        if(!confirm("Are you sure to delete this file?")) return;

        try{
            const res = await axios.delete(`/api/delete?id=${id}`);
            //refresh file
            fetchFile()
            console.log(res.data);
        }catch(err){
            console.log(err);
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

            <div className="w-full">
                {files.length === 0 ? ( 
                    <p>No Files found</p>
                ) : (
                    <table className="w-full mt-3">
                        <thead className="bg-gray-200 w-full">
                            <tr className="w-full justify-around">
                                <th className="text-lg">File Name</th>
                                <th className="text-lg">Size</th>
                                <th className="text-lg">Date</th>
                                <th className="text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {files.map((file) => (
                            <tr key={file.uploads_id} className="text-center border-b-1 border-gray-200">
                                <td className="text-base py-2 flex flex-row">
                                    <FileSpreadsheet className="text-green-400 ml-2"/>
                                    <div className="pl-2">
                                       {file.file_name}
                                    </div>
                                    </td> 
                                <td className="text-base py-2">{formatFileSize(file.file_size)}</td>
                                <td className="text-base py-2">{file.created_at}</td>
                                <td className="text-base py-2 flex justify-center cursor-pointer" onClick={() => handleDelete(file.uploads_id)}>
                                    <Trash2 className="text-red-400"/>
                                </td>
                            </tr>
                        ))} 
                        </tbody>
                        
                    </table>
                 )}
            </div>

        </div>
    )
}