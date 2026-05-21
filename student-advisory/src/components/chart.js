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

    const [mentorStudents, setMentorStudents] = useState([]);
    const [mentorStatus, setMentorStatus] = useState([]);
    const [mentees, setMentees] = useState([]);

    const [selectedMentor, setSelectedMentor] = useState(null);
    const [mentorMentees, setMentorMentees] = useState([]);

    // ✅ NEW STATE (dropdown control)
    const [selectedMentorIndex, setSelectedMentorIndex] = useState(0);

    const COLORS = ["#22c55e", "#ef4444"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/admin/dashboard");

            setMentorStudents(res.data.mentorStudents);
            setMentees(res.data.mentees);

            setMentorStatus([
                {
                    name: "Active",
                    value: Number(res.data.activeMentor || 0),
                },
                {
                    name: "Inactive",
                    value: Number(res.data.deactiveMentor || 0),
                },
            ]);

        } catch (err) {
            console.log(err);
        }
    };

    const handleBarClick = (data) => {

        const ids = data.mentorIds
            .split(",")
            .map(Number);

        const groupedMentors = ids.map((mentorId) => {

            const mentorName = data.mentors
                .split(", ")
                .find((_, index) => Number(ids[index]) === mentorId);

            const students = mentees.filter(
                (item) => item.mentor_id === mentorId
            );

            return {
                mentorId,
                mentorName,
                students,
            };

        });

        setMentorMentees(groupedMentors);

        // reset dropdown bila click bar baru
        setSelectedMentorIndex(0);

        setSelectedMentor({
            totalStudents: data.totalStudents,
        });
    };

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* BAR CHART */}
                <div className="bg-white rounded-2xl shadow-md p-5">

                    <h2 className="text-2xl font-bold mb-5 text-gray-800">
                        Bilangan Pelajar Mengikut Mentor
                    </h2>

                    <ResponsiveContainer width="100%" height={350}>

                        <BarChart data={mentorStudents}>

                            <XAxis dataKey="totalStudents" />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name, props) => [
                                    `${value} students`,
                                    props.payload.mentors
                                ]}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #e5e7eb",
                                }}
                            />

                            <Bar
                                dataKey="totalStudents"
                                fill="#3b82f6"
                                radius={[10, 10, 0, 0]}
                                cursor="pointer"
                                onClick={(data) => handleBarClick(data)}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                {/* PIE CHART */}
                <div className="bg-white rounded-2xl shadow-md p-5">

                    <h2 className="text-2xl font-bold mb-5 text-gray-800">
                        Mentor Status
                    </h2>

                    <ResponsiveContainer width="100%" height={350}>

                        <PieChart>

                            <Pie
                                data={mentorStatus}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                label={({ name, value }) =>
                                    `${name}: ${value}`
                                }
                            >
                                {mentorStatus.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* DISPLAY MENTEE */}
            <div className="bg-white rounded-2xl shadow-md p-5">

                <h2 className="text-2xl font-bold mb-5 text-gray-800">
                    Display Mentee
                </h2>

                {selectedMentor ? (

                    <div>

                        {/* INFO */}
                        <div className="mb-5">
                            <p className="text-gray-500 text-sm">
                                Total Students: {selectedMentor.totalStudents}
                            </p>
                        </div>

                        {/* ✅ DROPDOWN ADDED */}
                        {mentorMentees.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Select Mentor
                                </label>

                                <select
                                    className="border p-2 rounded-lg w-full"
                                    value={selectedMentorIndex}
                                    onChange={(e) =>
                                        setSelectedMentorIndex(Number(e.target.value))
                                    }
                                >
                                    {mentorMentees.map((m, index) => (
                                        <option key={index} value={index}>
                                            {m.mentorName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* DISPLAY SELECTED MENTOR ONLY */}
                        {mentorMentees.length > 0 ? (
                            <div className="border rounded-2xl p-5">

                                <h3 className="text-xl font-bold text-blue-600 mb-4">
                                    {mentorMentees[selectedMentorIndex]?.mentorName}
                                </h3>

                                {mentorMentees[selectedMentorIndex]?.students.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                                        {mentorMentees[selectedMentorIndex].students.map((student) => (
                                            <div
                                                key={student.stud_id}
                                                className="border border-gray-200 rounded-xl p-4"
                                            >
                                                <div className="flex items-center gap-3">

                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                        {student.stud_name?.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">
                                                            {student.stud_name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            Mentee
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                ) : (
                                    <div className="text-gray-500">
                                        No mentee found
                                    </div>
                                )}

                            </div>
                        ) : (
                            <div className="text-gray-500">
                                No mentee found
                            </div>
                        )}

                    </div>

                ) : (
                    <div className="text-gray-500">
                        Click any bar to display mentee
                    </div>
                )}

            </div>

        </div>
    );
}