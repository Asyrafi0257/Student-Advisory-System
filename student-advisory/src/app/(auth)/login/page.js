"use client";

import Image from "next/image";
import {User, Lock, ChevronDown} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();

    const handleForgot = () => {
        router.push("/forgot-password")
    }

    return(
        <div className="relative flex flex-row h-screen">
            <Image
                src="/images/bg-login.jpg"
                alt="bg-login.jpg"
                fill
                className="object-cover"
                priority
            />

            <div className="relative flex flex-row w-screen">
                <div className="flex flex-col justify-center items-center w-[50%]">
                    <h1 className="text-[45px] font-bold tracking-[2px] text-white w-[500]">WELCOME TO THE STUDENT ADVISORY SYSTEM</h1>
                    <h3 className="text-[25px] text-white w-[500] mt-3">SCHOOL OF COMPUTING</h3>
                </div>

                <div className="flex flex-row justify-center items-center w-[50%]">
                    <div className="bg-white w-[450px] h-[600px] rounded-[15px] flex flex-col">
                        <h1 className="flex flex-row justify-center mt-8 text-[30px] font-bold text-shadow-lg">Login</h1>

                        <form action="" className="flex flex-col items-center mt-10">
                            <div className="relative shadow-md">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Username" name="username" className="w-[350px] h-[38px] rounded-md p-3 pl-10 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 "/> 
                            </div>
                            <div className="relative mt-5 shadow-md">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="password" placeholder="Password" name="password" className="w-[350px] h-[38px] rounded-md p-3 pl-10 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300" />
                            </div>
                            <div className="mt-3 w-[350px] flex flex-row justify-end cursor-pointer">
                                <h3 className="text-blue-600 text-shadow-md" onClick={handleForgot}>Forgot password?</h3>
                            </div>
                            <div className="mt-5 flex flex-row justify-start w-[350px]">
                                <button type="button" className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 shadow-md">Options
                                    <ChevronDown className="h-5 w-5"/>    
                                </button> 
                            </div>
                            
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}