"use client";

import Image from "next/image";
import { Lock, ChevronDown, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/components/alert";

export default function Login() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectRole, setSelectRole] = useState("Options");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const roleOptions = ["Admin", "Student", "Lecturer"]; // guna untuk dropdown for select role
    const [alertData, setAlertData] = useState(null);

    const handleForgot = () => {
        router.push("/forgot-password")
    }

    const handleSignUp = () => {
        router.push("/register");
    }

    const handleSelected = () => {
        setOpen(!open);
    }

    const showAlert = (data, duration = 2000) => {
        setAlertData(data);

        if (duration) {
            setTimeout(() => {
                setAlertData(null);
            }, duration)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password || selectRole === "Options") {
            showAlert({
                type: "error",
                message: "Required Fields",
                describe: "All fields are required."
            });
            return;
        }

        try {

            const roleMap = {
                Admin: "admin",
                Student: "student",
                Lecturer: "mentor"
            };

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                    role: roleMap[selectRole]
                }),
            });

            const data = await res.json();

            if (data.success && data.role === "admin") {
                showAlert({
                    type: "success",
                    message: "Success!",
                    describe: "Admin login successful"
                });

                setTimeout(() => router.replace("/admin"), 2000);
            }

            else if (data.success && data.role === "student") {
                showAlert({
                    type: "success",
                    message: "Success!",
                    describe: "Student login successful"
                });

                setTimeout(() => router.replace("/student"), 2000);
            }

            else if (data.success && data.role === "mentor") {
                showAlert({
                    type: "success",
                    message: "Success!",
                    describe: "Lecturer login successful"
                });

                setTimeout(() => router.replace("/lecturer"), 2000);
            }

            else {
                showAlert({
                    type: "error",
                    message: "Failed!",
                    describe: "Email, password and role do not match"
                });
            }

        } catch (error) {
            showAlert({
                type: "error",
                message: "Server Error",
                describe: "Something went wrong on our end. Please try again later."
            });
        }
    };

    return (
        <div className="relative flex flex-col sm:flex-row min-h-screen w-full">
            {/* BACKGROUND IMAGE */}
            <Image
                src="/images/bg-login.jpg"
                alt="bg-login.jpg"
                fill
                unoptimized
                className="object-cover"
                priority
            />

            {/* MAIN CONTAINER */}
            <div className="relative w-full min-h-screen flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-0 p-4 sm:p-0">

                {/* HEADER SECTION - TEXT */}
                <div className="w-full flex flex-col justify-center items-center sm:items-start text-center sm:text-center px-4 sm:px-8 lg:px-12">
                    <h1 className="w-full text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold tracking-widest text-white mb-3 sm:mb-4 leading-tight">
                        WELCOME TO THE<br className="hidden sm:block" /> STUDENT ADVISORY<br className="hidden sm:block" /> SYSTEM
                    </h1>
                    <h3 className="w-full text-base sm:text-lg lg:text-xl text-gray-100 sm:text-center font-semibold tracking-widest">
                        SCHOOL OF COMPUTING
                    </h3>
                </div>

                {/* LOGIN FORM SECTION */}
                <div className="w-full sm:w-1/2 flex justify-center items-center px-4 sm:px-8 lg:px-12">
                    <div className="bg-white w-full max-w-sm sm:max-w-none sm:w-[320px] md:w-[380px] lg:w-[480px] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

                        {/* FORM HEADER */}
                        <div className="px-6 sm:px-8 py-6 sm:py-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
                                Login
                            </h1>
                        </div>

                        {/* FORM CONTENT */}
                        <form onSubmit={handleLogin} className="flex flex-col items-center px-5 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-5">

                            {/* EMAIL INPUT */}
                            <div className="w-full">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-11 sm:h-12 rounded-lg pl-10 pr-3 py-2.5 text-sm text-black sm:text-base border border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 outline-none transition-colors placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* PASSWORD INPUT */}
                            <div className="w-full">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-11 sm:h-12 rounded-lg pl-10 pr-10 py-2.5 text-sm text-black sm:text-base border border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 outline-none transition-colors placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                                    >
                                        {showPassword ?
                                            <EyeOff className="w-5 h-5 text-gray-400" /> :
                                            <Eye className="w-5 h-5 text-gray-400" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* FORGOT PASSWORD */}
                            <div className="w-full text-right">
                                <button
                                    type="button"
                                    onClick={handleForgot}
                                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* ROLE DROPDOWN */}
                            <div className="relative w-full">
                                <button
                                    type="button"
                                    onClick={handleSelected}
                                    className="flex items-center justify-between px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <span>{selectRole}</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </button>

                                {/* DROPDOWN MENU */}
                                {open && (
                                    <div className="absolute w-[110px] top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
                                        {roleOptions.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => {
                                                    setSelectRole(item)
                                                    setOpen(false)
                                                }}
                                                className=" w-full text-center flex flex col px-2 py-2.5 text-sm text-left text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-300 last:border-b-0"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* LOGIN BUTTON */}
                            <div className="w-full pt-2">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg transition-colors duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
                                >
                                    Login
                                </button>
                            </div>

                            {/* SIGN UP LINK */}
                            <div className="pt-4 text-center">
                                <p className="text-xs sm:text-sm text-gray-700">
                                    Don't have an account? {" "}
                                    <button
                                        type="button"
                                        onClick={handleSignUp}
                                        className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

            {/* ALERT COMPONENT */}
            {alertData && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    describe={alertData.describe}
                />
            )}
        </div>
    )
}