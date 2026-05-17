"use client";

import Image from "next/image";
import ViewMentor from "@/components/viewMentor";
import { Sun, Coffee, Moon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState([]);
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) {
            return { text: "Good Morning", Icon: Coffee };
        } else if (hour < 18) {
            return { text: "Good Afternoon", Icon: Sun };
        } else {
            return { text: "Good Evening", Icon: Moon };
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/profile");
            setUser(res.data);
            console.log(user)
        } catch (err) {
            console.log(err);
        }

    }

    const { text, Icon } = getGreeting();

    return (
        <div className="flex-1 overflow-auto relative z-10 mt-2">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#000075] via-[#0a0090] to-[#1a00a0] shadow-lg rounded-2xl flex flex-row justify-start max-w-7xl mx-8 h-[180px] mt-5">

                {/* Decorative blurred circles */}
                <div className="absolute top-[-30px] left-[-30px] w-40 h-40 bg-white opacity-5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-[-20px] left-[200px] w-24 h-24 bg-indigo-300 opacity-10 rounded-full blur-xl pointer-events-none" />

                {/* Left: Text content */}
                <div className="flex flex-col p-6 justify-center gap-2 z-10 w-[700px]">

                    {/* Greeting badge */}
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full w-fit backdrop-blur-sm">
                        <Sparkles size={12} className="text-yellow-300" />
                        Welcome back
                    </div>

                    {/* Greeting heading */}
                    <h2 className="font-bold text-2xl text-white flex items-center gap-2">
                        <Icon size={28} className="text-yellow-300" />
                        {text}, {user.name}
                    </h2>

                    <p className="text-blue-200 text-sm">
                        Welcome back to your mentee dashboard.
                    </p>
                </div>

                {/* Right: Background image panel */}
                {/* <div className="relative w-[480px] flex-shrink-0 rounded-r-2xl overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center border-none"
                    style={{ backgroundImage: "url('/images/bg-homepage.jpeg')" }}
                />
                
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #000075 0%, #000075 30%, transparent 70%)" }} />
            </div> */}

            </div>
            <div className="grid grid-col-2">
                <ViewMentor />
            </div>
        </div>
    );
}