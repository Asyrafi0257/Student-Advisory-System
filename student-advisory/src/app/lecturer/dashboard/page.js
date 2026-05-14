"use client";

import StatCard from "@/components/statCard";
import Calendar from "@/components/calendar";
import { motion } from "framer-motion";
import { User, ClipboardMinus } from "lucide-react";
import Progress from "@/components/progress";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
    const [data, setData] = useState([]);
    const [totalMentee, setTotalMentee] = useState(0);
    const [totalStudCs, setTotalStudCs] = useState(0);
    const [totalStudIt, setTotalStudIt] = useState(0);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/viewMentee");
            setData(res.data);
            setTotalMentee(res.data.totalMentee);
            setTotalStudCs(res.data.totalCs);
            setTotalStudIt(res.data.totalIt),
                console.log(res.data.totalMentee)

        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
                    initial={{ opacity: 0, y: 20 }} //start dari bawah
                    animate={{ opacity: 1, y: 0 }} //animasi ke posisi awal
                    transition={{ duration: 1 }} //tempoh animasi
                >
                    <StatCard name="Total Mentee" icon={User} value={totalMentee} />
                    <StatCard name="Total B.Comp.Sc. (Hons.)" icon={User} value={totalStudCs} />
                    <StatCard name="Total BSc.(IT)" icon={User} value={totalStudIt} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }} //start dari bawah
                    animate={{ opacity: 1, y: 0 }} //animasi ke posisi awal
                    transition={{ duration: 1 }} //tempoh animasi
                    className="grid grid-cols-4 gap-4"

                >
                    <Progress mentees={totalMentee} CS={totalStudCs} IT={totalStudIt} />
                    <Calendar />
                </motion.div>

            </main>
        </div>
    )
}