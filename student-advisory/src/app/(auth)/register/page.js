"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10 relative">
            <Image
                src="/images/bg-login.jpg"
                alt="bg-login.jpg"
                fill
                className="object-cover"
                priority
            />

            <div className="relative w-full max-w-6xl min-h-[750px] md:min-h-[650px] bg-white/95 rounded-[30px] overflow-hidden shadow-2xl">

                {/* STUDENT SIDE */}
                <div
                    className={`
            absolute inset-0 md:w-1/2 p-8 md:p-12
            flex flex-col justify-center items-center text-center
            transition-all duration-700 ease-in-out
            ${role === "student"
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-full md:translate-x-0"
                        }
          `}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-indigo-600 mb-4">
                        Student Registration
                    </h1>

                    <p className="text-gray-500 max-w-md mb-8 text-sm md:text-base">
                        Register as a student to access your learning dashboard and connect
                        with lecturers.
                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                        alt="student"
                        className="w-40 md:w-72"
                    />
                </div>

                {/* LECTURER SIDE */}
                <div
                    className={`
            absolute inset-0 md:left-1/2 md:w-1/2 p-8 md:p-12
            flex flex-col justify-center items-center text-center
            transition-all duration-700 ease-in-out
            ${role === "lecturer"
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-full md:translate-x-0"
                        }
          `}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-purple-600 mb-4">
                        Lecturer Registration
                    </h1>

                    <p className="text-gray-500 max-w-md mb-8 text-sm md:text-base">
                        Create your lecturer account to manage mentees and monitor student
                        progress.
                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="lecturer"
                        className="w-40 md:w-72"
                    />
                </div>

                {/* FORM BOX */}
                <div
                    className={`
            absolute z-20 bg-white rounded-[30px]
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
            w-full md:w-1/2 h-full
            transition-all duration-700 ease-in-out
            ${role === "student"
                            ? "left-0"
                            : "left-0 md:left-1/2"
                        }
          `}
                >
                    <div className="h-full flex flex-col justify-center px-6 py-10 md:px-12">
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-50 rounded-full px-3 py-1 mb-3 ">
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
                        <div className="bg-gray-200 rounded-full p-1 flex w-full max-w-sm mx-auto mb-8">
                            <button
                                onClick={() => setRole("student")}
                                className={`
                  flex-1 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base
                  ${role === "student"
                                        ? "bg-indigo-600 text-white shadow-lg"
                                        : "text-black"
                                    }
                `}
                            >
                                STUDENT
                            </button>

                            <button
                                onClick={() => setRole("lecturer")}
                                className={`
                  flex-1 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base
                  ${role === "lecturer"
                                        ? "bg-indigo-600 text-white shadow-lg"
                                        : "text-black"
                                    }
                `}
                            >
                                LECTURER
                            </button>
                        </div>

                        {/* FORM */}
                        <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-300 mb-3">
                            Personal Info
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input icon={<User size={20} />} placeholder="Username" />

                            <Input icon={<Mail size={20} />} placeholder="Email" />

                            <Input icon={<Phone size={20} />} placeholder="Phone Number" />

                            <Input
                                icon={<CreditCard size={20} />}
                                placeholder={
                                    role === "student"
                                        ? "Matric Number"
                                        : "Staff Number"
                                }
                            />
                        </div>

                        <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-300 mb-3 mt-3">
                            Security
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                            <Input
                                icon={<Lock size={20} />}
                                placeholder="Password"
                                type="password"
                            />

                            <Input
                                icon={<BadgeCheck size={20} />}
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            className="mt-8 w-full md:w-fit md:px-12 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg"
                        >
                            REGISTER
                        </button>

                        <p className="text-center text-gray-500 mt-6 text-sm">
                            Already have an account?{" "}
                            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={handleLogin}>
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Input({ icon, placeholder, type = "text" }) {
    return (
        <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-2 focus-within:outline-black-300 rounded-xl">
            <div className="text-gray-600 shrink-0">{icon}</div>

            <input
                type={type}
                placeholder={placeholder}
                className="bg-transparent outline-none w-full placeholder:text-gray-500 text-sm md:text-base"
            />
        </div>
    );
}