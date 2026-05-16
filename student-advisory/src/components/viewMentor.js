"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ViewMentee() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("api/viewMentee");
            setData(res.data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="bg-white shadow-md rounded-lg mt-5 mx-8 col-span-1 max-w-lg h-[300px]">
            <div className="flex justify-center p-2 border-b-1 border-[#000075] mx-3">
                <h2>Mentor & Mentee</h2>
            </div>
            <div className="flex flex-row justify-around items-center h-[250px]">
                <div className="border-2 border-black rounded-xl">
                    <Image
                        src={data.stud_imagePath || "/images/logo-profile.png"}
                        width={130}
                        height={130}
                        priority
                        className="rounded-sm cover"
                        alt="studImage"
                    />
                </div>

                <div className="border-2 border-black rounded-xl">
                    <Image
                        src={data.mentor_imagePath || "/images/logo-profile.png"}
                        width={130}
                        height={130}
                        priority
                        alt="mentorImage"
                    />
                </div>

            </div>
        </div>
    )
}