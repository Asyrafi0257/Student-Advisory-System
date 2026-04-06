"use client"

import { div, filter } from "framer-motion/client";
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ListMentors(){
    const [search, setSearch] = useState("");
    const [dataMentee, setDataMentee] = useState([]);

    useEffect(() => {
        featchData();
    }, [])

    const featchData = async () => {
        try{
            const res = await axios.get("/api/mentee");
            console.log(res.data.rows)
            setDataMentee(res.data.rows)
        } catch(err){
            console.log(err)
        }
    }

    const filterMentee = dataMentee.filter((data) => (
        data.mentee_id?.toString().includes(search.toString()) || data.mentee_name?.toLowerCase().includes(search.toLowerCase())
    ))

    return(
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0 h-auto mt-5">
            <div className="flex flex-row w-full border-b-1 border-gray-300 justify-between py-2">
                <div className="mb-2 w-full">
                    <h3 className="text-[20px] font-semibold">List Mentor</h3>
                </div>
                <div className="relative w-full flex justify-end">
                    <input type="text" placeholder="search Id or Name..." className="shadow-sm border-1 border-gray-300 rounded-md outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:ouline-offset-2 focus-within:outline-black-300 w-[350px] h-[35px] py-2 pl-2" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                    <Search className="absolute text-gray-400 top-1/2 -translate-y-1/2 right-3 cursor-pointer"/>
                </div>
            </div>

            <div className="mt-3">
                {!filterMentee || filterMentee.length === 0 ? (
                    <p>Not data mentee founded</p>
                ) : (
                    <div className="w-full mt-3"> 
                        <table className="w-full table-auto mb-2">
                            <thead className="bg-[#02577A]">
                                <tr className="text-white">
                                    <th className="p-1 text-[15px]">Mentee Id</th>
                                    <th className="p-1 text-[15px]">Mentee Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filterMentee.map((data) => (
                                <tr key={data.mentee_id} className="text-center border-b-1 border-gray-300 hover:bg-gray-100">
                                    <td>{data.mentee_id}</td>
                                    <td>{data.mentee_name}</td>
                                </tr>
                            ))}
                             </tbody> 
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}