"use client"

import Image from "next/image";
import axios from "axios";
import { useState, useRef } from "react";
import { FileSpreadsheet } from "lucide-react";

export default function Upload({url}) {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const uploadFile = async (fileToUpload) => {

        //untuk simpan data seperti fail or form before send to server
        const formData = new FormData(); 

        //file => name file what server expect, while fileToUpload => file yang user input
        formData.append("file", fileToUpload);

        try{
            setIsUploading(true);

            //request to server
            const res = await axios.post(url, formData, { 
                //nak bagitahu server bahawa data yang dihantar adalah file
                headers:{"Content-Type": "multipart/form-data"},
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
        } catch(err){
            alert(err.response?.data?.error || "Upload failed");
        } finally{
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
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            setFile(e.dataTransfer.files[0]);
            uploadFile(e.dataTransfer.files[0]);

            //buang data drag untuk elak daripada duplicate
            e.dataTransfer.clearData();
        }
    };

    const handleFile = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            uploadFile(e.target.files[0]);
        }
    }
    const handleClick = () => {
        fileInputRef.current.click();
    }
    return(
        <div>
        <div className="bg-[#ffffff] rounded-xl shadow-md p-4 md:p-6">
            <div className="flex border-b border-gray-300 mb-5">
                <h2 className="font-semibold text-[24px]">Upload Files</h2>
            </div>
            <div 
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => {e.preventDefault()}}
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
                        <FileSpreadsheet className="w-8 h-8 text-green-500 mr-2"/>
                        <progress className="w-full" value={progress} max="100"/>
                    </div>
                    
                    
                </div>
            )}
            {file && !isUploading && (
                    <p className="mt-2 text-green-600">Selected: {file.name}</p>
            )}
        </div>
    )
}