"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    Mail,
    CreditCard,
    Lock,
    BadgeCheck,
    Eye,
    EyeOff,
} from "lucide-react";

export default function RegisterPage() {
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [matric, setMatric] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [staffNo, setStaffNo] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleRegister = async () => {
        try {
            if (role === "student") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email.trim())) {
                    alert("Invalid email format");
                    return;
                }
                const res = await axios.post("/api/auth/register/student", {
                    stud_email: email,
                    stud_matric: matric,
                    stud_password: password,
                    stud_confirmPassword: confirmPassword
                });
                if (res.data.success) {
                    alert(res.data.message);
                    setEmail("");
                    setMatric("");
                    setConfirmPassword("");
                    setPassword("");
                } else {
                    alert(res.data.message);
                    setEmail("");
                    setMatric("");
                    setConfirmPassword("");
                    setPassword("");
                }
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email.trim())) {
                    alert("Invalid email format");
                    return;
                }
                const res = await axios.post("/api/auth/register/mentor", {
                    mentor_email: email,
                    mentor_no: staffNo,
                    mentor_password: password,
                    mentor_confirmPassword: confirmPassword
                });

                if (res.data.success) {
                    alert(res.data.message);
                    setEmail("");
                    setStaffNo("");
                    setConfirmPassword("");
                    setPassword("");
                } else {
                    alert(res.data.message);
                    setEmail("");
                    setStaffNo("");
                    setConfirmPassword("");
                    setPassword("");
                }
            }
        } catch (err) {
            console.log(err);
            alert("You failed to register")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10 relative overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <Image
                src="/images/bg-login.jpg"
                alt="Background"
                fill
                priority
                className="object-cover"
            />

            {/* MAIN CONTAINER */}
            <div className="relative w-full max-w-6xl min-h-[600px] sm:min-h-[680px] lg:min-h-[690px] bg-[#02577A] rounded-2xl sm:rounded-3xl lg:rounded-[35px] overflow-hidden shadow-2xl">

                {/* INFO PANELS - DESKTOP ONLY */}
                {/* STUDENT INFO */}
                <div className={`absolute right-0 top-0 w-0 lg:w-1/2 h-full hidden lg:flex flex-col justify-center items-center px-6 lg:px-8 transition-all duration-700
                ${role === "student" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className="">
                        <h1 className="text-xl lg:text-3xl font-black text-white mb-4 lg:mb-5 tracking-wide">
                            Student Registration
                        </h1>
                        <p className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-sm">
                            Register as a student to connect with lecturers, manage mentoring sessions and monitor your academic journey.
                        </p>
                        <div className="max-w-[350px] h-[60px] rounded-xl mt-5 flex items-center p-2 bg-white/30 shadow-sm">
                            <p className="text-white/70 text-[15px]">Create your account with your university matric number</p>
                        </div>
                    </div>
                </div>

                {/* LECTURER INFO */}
                <div className={`absolute left-0 top-0 w-0 lg:w-1/2 h-full hidden lg:flex flex-col justify-center items-center px-8 lg:px-10 transition-all duration-700
                ${role === "lecturer" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className="">
                        <h1 className="text-xl lg:text-3xl font-black text-white mb-4 lg:mb-5 tracking-wide">
                            Lecturer Registration
                        </h1>
                        <p className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-sm">
                            Create your lecturer account to manage mentees, monitor student progress and guide students effectively.
                        </p>
                        <div className="max-w-[350px] h-[60px] rounded-xl mt-5 flex items-center p-2 bg-white/30 shadow-sm">
                            <p className="text-white/70 text-[15px]">Create your account with your university staff number</p>
                        </div>
                    </div>
                </div>

                {/* FORM CONTAINER */}
                <div className={`absolute top-0 z-20 bg-white w-full lg:w-1/2 h-full rounded-2xl sm:rounded-3xl lg:rounded-[35px] transition-all duration-700
                ${role === "student" ? "left-0" : "left-0 lg:left-1/2"}`}>

                    <div className="h-full flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-8 sm:py-0">

                        {/* HEADER */}
                        <div className="mb-6 sm:mb-8">
                            <div className="inline-flex items-center gap-1.5 bg-gray-200/55 border border-gray-100 rounded-full px-3 py-1.5 mb-3 sm:mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] sm:text-[11px] font-bold tracking-[1.5px] sm:tracking-[2px] uppercase text-gray-400">
                                    New Account
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                                Let's get<br className="hidden sm:block" /> you started 👋
                            </h2>
                        </div>

                        {/* ROLE TOGGLE */}
                        <div className="bg-gray-200 rounded-full p-1 flex mb-6 sm:mb-8">
                            <button
                                onClick={() => setRole("student")}
                                className={`flex-1 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300
                                ${role === "student" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                STUDENT
                            </button>

                            <button
                                onClick={() => setRole("lecturer")}
                                className={`flex-1 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300
                                ${role === "lecturer" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                LECTURER
                            </button>
                        </div>

                        {/* PERSONAL INFO SECTION */}
                        {role === "student" ? (
                            <div>
                                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-300 mb-3 sm:mb-4">
                                    Personal Info
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                                    <div className="flex items-center gap-2 p-3 sm:p-3.5 transition-colors border-b-1 border-gray-300">
                                        <Mail size={20} className="text-gray-500 flex-shrink-0" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@gmail.com"
                                            className="w-full bg-transparent outline-none text-sm text-black sm:text-base placeholder-gray-400"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border-b-1 border-gray-300 p-3 sm:p-3.5 transition-colors">
                                        <CreditCard size={20} className="text-gray-500 flex-shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Matric Number"
                                            className="w-full bg-transparent outline-none text-sm text-black sm:text-base placeholder-gray-400"
                                            value={matric}
                                            onChange={(e) => setMatric(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                        ) : (
                            <div>
                                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-300 mb-3 sm:mb-4">
                                    Personal Info
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                                    <div className="flex items-center gap-2 border-b-1 border-gray-300 p-3 sm:p-3.5 transition-colors">
                                        <Mail size={20} className="text-gray-500 flex-shrink-0" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@gmail.com"
                                            className="w-full bg-transparent outline-none text-sm text-black sm:text-base placeholder-gray-400"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border-b-1 border-gray-300 p-3 sm:p-3.5 transition-colors">
                                        <CreditCard size={20} className="text-gray-500 flex-shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Staff Number"
                                            className="w-full bg-transparent outline-none text-sm text-black sm:text-base placeholder-gray-400"
                                            value={staffNo}
                                            onChange={(e) => setStaffNo(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                        )}

                        {/* SECURITY SECTION */}
                        <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-300 mb-3 sm:mb-4 mt-4 sm:mt-6">
                            Security
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                            <div className="flex items-center gap-2 border-b-1 border-gray-300 p-3 sm:p-3.5 transition-colors">
                                <Lock size={20} className="text-gray-500 flex-shrink-0" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-transparent outline-none text-sm text-black sm:text-base placeholder-gray-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                                >
                                    {showPassword ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
                                </button>
                            </div>

                            <div className="flex items-center gap-2 border-b-1 border-gray-300 p-3 sm:p-3.5 transition-colors">
                                <BadgeCheck size={20} className="text-gray-500 flex-shrink-0" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full bg-transparent outline-none text-sm text-black sm:text-base placeholder-gray-400"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
                                </button>
                            </div>

                        </div>

                        {/* REGISTER BUTTON */}
                        <button
                            onClick={handleRegister}
                            className="mt-8 sm:mt-10 w-full sm:w-auto sm:px-12 lg:px-14 mx-auto bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 sm:py-3 rounded-full transition-colors duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
                        >
                            REGISTER
                        </button>

                        {/* LOGIN LINK */}
                        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                                onClick={handleLogin}
                                className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition-colors"
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