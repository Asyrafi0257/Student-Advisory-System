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
            const res = await axios.get("/api/admin/dashboard");

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-6 lg:px-0">

            {/* BAR CHART */}
            <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4 lg:p-5 overflow-hidden">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
                    Total Students & Mentors
                </h2>

                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={summaryData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            angle={0}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#f3f4f6",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px"
                            }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                            barSize={summaryData.length === 2 ? 60 : "auto"}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* PIE CHART */}
            <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4 lg:p-5 overflow-hidden">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
                    Mentor Status
                </h2>

                <ResponsiveContainer width="100%" height={250}>
                    <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                        <Pie
                            data={mentorStatus}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, value }) => `${name}: ${value}`}
                            labelLine={false}
                        >
                            {mentorStatus.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#f3f4f6",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px"
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}