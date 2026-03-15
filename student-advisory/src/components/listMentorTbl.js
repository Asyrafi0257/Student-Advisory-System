"use client";

import { useState } from "react";
import { ChevronDown} from "lucide-react";

export default function ListMentor() {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("Status");

    const lectStatus = ["Active", "Deactive"];

    const handleStatus = () => {
        setOpen(true);
    }

    return (
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0 h-[430px]">
            <div className="flex flex-row justify-between mb-2 border-b border-gray-300">
                <h2 className="font-bold text-[25px] tracking-[1px]">List Mentor</h2>
                <div className="relative flex items-center">
                    <button type="button" onClick={handleStatus} className="flex flex-row w-24 justify-around shadow-sm rounded-md px-2 cursor-pointer">
                        {status}
                        <ChevronDown className="text-sm "/>
                    </button>
                    {open && (
                        <div className="absolute w-24 mt-10 bg-[#ffffff] rounded-md">
                            {lectStatus.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        setOpen(false),
                                        setStatus(item)
                                    }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                >
                                {item}
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <table className="w-full overflow-auto">
                <thead className="bg-gray-100 text-gray-600">
                  <tr className="mb-2">
                    <th className="px-2 py-2">No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Office</th>
                    <th className="px-4 py-2">Status</th>
                </tr>  
                </thead>
                <tbody>
                   <tr className="border-b border-gray-300">
                    <td className="px-4 py-2">1.</td>
                    <td className="px-4 py-2">Muhammad Alif Asyrafi bin Mohd sani</td>
                    <td className="px-4 py-2">Computer Science</td>
                    <td className="px-4 py-2">asyrafi0257@gmail.com</td>
                    <td className="px-4 py-2">Room 302, Admin Building</td>
                    <td className="px-4 py-2">Active</td>
                   </tr> 
                
                </tbody>
                
            </table>
        </div>
    )
}