"use client";

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Chart() {

    const [summaryData, setSummaryData] = useState([]);
    const [mentorStatus, setMentorStatus] = useState([]);

    const COLORS = ["#22c55e", "#ef4444"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/dashboard");

            setSummaryData([
                { name: "Students", total: res.data.students },
                { name: "Mentors", total: res.data.mentors },
            ]);

            setMentorStatus([
                { name: "Active", value: Number(res.data.activeMentor || 0) },
                { name: "Inactive", value: Number(res.data.deactiveMentor || 0) },
            ]);

            console.log(mentorStatus)
        } catch (err) {
            console.log("Error to fetch data");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

            {/* BAR CHART */}
            <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-xl font-bold mb-4">
                    Total Students & Mentors
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={summaryData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* PIE CHART */}
            <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-xl font-bold mb-4">
                    Mentor Status
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={mentorStatus}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {mentorStatus.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}