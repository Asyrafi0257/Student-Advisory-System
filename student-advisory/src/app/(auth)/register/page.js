"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    User,
    Mail,
    Phone,
    CreditCard,
    Lock,
    BadgeCheck,
} from "lucide-react";

export default function RegisterPage() {
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [matric, setMatric] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [staffNo, setStaffNo] = useState("");

    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleRegister = async () => {
        try {
            if (role === "student") {
                const res = await axios.post("/api/auth/register/student", {
                    stud_email: email,
                    stud_matric: matric,
                    stud_password: password,
                    stud_confirmPassword: confirmPassword
                });
                if (res.data.success) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            } else {
                const res = await axios.post("/api/auth/register/mentor", {
                    mentor_email: email,
                    mentor_no: staffNo,
                    mentor_password: password,
                    mentor_confirmPassword: confirmPassword
                });

                if (res.data.success) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            }


        } catch (err) {
            console.log(err);
            alert("You failed to register")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">

            <Image
                src="/images/bg-login.jpg"
                alt="Background"
                fill
                priority
                className="object-cover"
            />

            <div className="relative w-full max-w-7xl min-h-[760px] md:min-h-[680px] bg-[#02577A] rounded-[35px] overflow-hidden shadow-2xl">

                {/* STUDENT INFO */}
                <div className={`absolute right-0 top-0 w-1/2 h-full hidden md:flex flex-col justify-center items-center px-10 transition-all duration-700
                ${role === "student" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <h1 className="text-5xl font-black text-white mb-5">
                        Student Registration
                    </h1>
                    <p className="text-gray-400 text-center max-w-md leading-relaxed">
                        Register as a student to connect with lecturers,
                        manage mentoring sessions and monitor your academic journey.
                    </p>
                </div>

                {/* LECTURER INFO */}
                <div className={`absolute left-0 top-0 w-1/2 h-full hidden md:flex flex-col justify-center items-center px-5 transition-all duration-700
                ${role === "lecturer" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <h1 className="text-5xl font-black text-white mb-5">
                        Lecturer Registration
                    </h1>
                    <p className="text-gray-400 text-center max-w-md leading-relaxed">
                        Create your lecturer account to manage mentees,
                        monitor student progress and guide students effectively.
                    </p>
                </div>

                {/* FORM */}
                <div className={`absolute top-0 z-20 bg-white rounded-[35px] w-full md:w-1/2 h-full transition-all duration-700
                ${role === "student" ? "left-0" : "left-0 md:left-1/2"}`}>

                    <div className="h-full flex flex-col justify-center px-6 md:px-12">

                        <div className="mb-6">
                            <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1 mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400">
                                    New Account
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                                Let's get<br />you started 👋
                            </h2>
                        </div>

                        {/* TOGGLE */}
                        <div className="bg-gray-200 rounded-full p-1 flex mb-8">
                            <button
                                onClick={() => setRole("student")}
                                className={`flex-1 py-3 rounded-full font-bold
                                ${role === "student" ? "bg-indigo-600 text-white" : ""}`}
                            >
                                STUDENT
                            </button>

                            <button
                                onClick={() => setRole("lecturer")}
                                className={`flex-1 py-3 rounded-full font-bold
                                ${role === "lecturer" ? "bg-indigo-600 text-white" : ""}`}
                            >
                                LECTURER
                            </button>
                        </div>

                        {/* STUDENT INPUT */}
                        {role === "student" ? (
                            <div>
                                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-300 mb-3">
                                    Personal Info
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
                                        <Mail size={20} />
                                        <input
                                            type="text"
                                            placeholder="Student Email"
                                            className="w-full bg-transparent outline-none"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
                                        <CreditCard size={20} />
                                        <input
                                            type="text"
                                            placeholder="Matric Number"
                                            className="w-full bg-transparent outline-none"
                                            value={matric}
                                            onChange={(e) => setMatric(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                        ) : (
                            <div>
                                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-300 mb-3">
                                    Personal Info
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
                                        <Mail size={20} />
                                        <input
                                            type="text"
                                            placeholder="Lecturer Email"
                                            className="w-full bg-transparent outline-none"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
                                        <CreditCard size={20} />
                                        <input
                                            type="text"
                                            placeholder="Staff Number"
                                            className="w-full bg-transparent outline-none"
                                            value={staffNo}
                                            onChange={(e) => setStaffNo(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                        )}

                        <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-300 mb-3 mt-2">
                            Security
                        </p>
                        {/* PASSWORD */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
                                <Lock size={20} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-transparent outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
                                <BadgeCheck size={20} />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full bg-transparent outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleRegister}
                            className="mt-10 w-full md:w-fit md:px-14 mx-auto bg-indigo-600 text-white font-bold py-3 rounded-full"
                        >
                            REGISTER
                        </button>

                        {/* LOGIN */}
                        <p className="text-center mt-6 text-sm">
                            Already have an account?{" "}
                            <span
                                onClick={handleLogin}
                                className="text-indigo-600 cursor-pointer"
                            >
                                Login
                            </span>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}