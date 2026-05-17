"use client";

import StatCard from "@/components/statCard";
import Chart from "@/components/chart";
import { Activity, ShieldMinus, User } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [countData, setCountData] = useState(0);

    useEffect(() => {
        axios.get("/api/admin/dashboard").then(res => { setCountData(res.data) });

    }, []);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }} //start dari bawah
                    animate={{ opacity: 1, y: 0 }} //animasi ke posisi awal
                    transition={{ duration: 1 }} //tempoh animasi
                >
                    <StatCard name="Total Mentee" icon={User} value={countData?.students} />
                    <StatCard name="Total Mentor" icon={User} value={countData?.mentors} />
                    <StatCard name="Total Mentor Active" icon={Activity} value={countData?.activeMentor} />
                    <StatCard name="Total Mentor Deactive" icon={ShieldMinus} value={countData?.deactiveMentor} />
                </motion.div>

                <motion.div
                    className="grid grid-cols-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Chart />
                </motion.div>
            </main>
        </div>
    )
}