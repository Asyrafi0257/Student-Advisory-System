"use client";

import Image from "next/image";
import { useState } from "react";

export default function ForgotPassword() {

    const [resetEmail, setResetEmail] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const req = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resetEmail })
            })

            const data = await req.json();

            if (data.success) {
                alert("Please check your email for reset the password");
                setResetEmail("")
            } else {
                alert("This email not exist");
                setResetEmail("")
            }

        } catch (error) {
            return alert(error.message);
        }
    }

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-row h-screen w-screen justify-center items-center p-4">
            <div className="bg-white w-full sm:w-96 md:w-[420px] rounded-2xl flex flex-col items-center shadow-2xl">
                <div className="pt-8 sm:pt-10">
                    <Image
                        src="/images/forgot-password.jpg"
                        alt="forgot-password.jpg"
                        width={140}
                        height={140}
                        unoptimized
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-col px-6 sm:px-8">
                    <h2 className="text-slate-800 font-bold text-lg sm:text-xl md:text-2xl flex justify-center mt-6">Forgot your Password?</h2>
                    <p className="text-sm sm:text-base text-slate-600 flex justify-center text-center mt-3 leading-relaxed">We'll send you an email with instructions to reset it</p>
                </div>
                <form onSubmit={handleReset} className="flex flex-col justify-center w-full px-6 sm:px-8 pb-8 sm:pb-10">
                    <input
                        type="email"
                        name="email"
                        placeholder="your email"
                        value={resetEmail}
                        onChange={(e) => { setResetEmail(e.target.value) }}
                        className="mt-6 px-4 py-3 w-full rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-sm text-sm sm:text-base"
                        required
                    />
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 w-40 py-3 rounded-lg shadow-lg font-semibold text-white tracking-wide text-sm sm:text-base cursor-pointer transition-all duration-200 active:scale-95"
                        >
                            Send
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}