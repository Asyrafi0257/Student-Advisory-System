"use client";

import Image from "next/image";
import { useState } from "react";

export default function ForgotPassword(){

    const [resetEmail, setResetEmail] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        try{
            const req = await fetch("/api/auth/forgot-password", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({resetEmail})
            })

            const data = await req.json();
            
            if(data.success){
                alert("Please check your email for reset the password");
                setResetEmail("")
            } else {
                alert("This email not exist");
                setResetEmail("")
            }

        }catch(error){
            return alert(error.message);
        }
    }

    return (
        <div className="bg-violet-600 flex flex-row h-screen w-screen justify-center items-center">
            <div className="bg-white w-[300px] sm:w-md md:w-lg h-[400px] sm:w-md  rounded-xl flex flex-col items-center shadow-xl/30">
                <Image
                    src="/images/forgot-password.jpg"
                    alt="forgot-password.jpg"
                    width={140}
                    height={140}
                    className="rounded-sm "
                />
                <div className="flex flex-col">
                    <h2 className="text-blue-500 font-bold text-lg sm:text-xl md:text-2xl flex justify-center">Forgot your Password?</h2>
                    <p className="text-sm md:text-lg flex justify-center text-center w-[200px] md:w-[300px] mt-3 tracking-[1]">We'll send your an email with instruction to reset it</p>
                </div>
                <form onSubmit={handleReset} className="flex flex-col justify-center">
                    <input type="email" name="email" placeholder="your email" value={resetEmail} onChange={(e)=>{setResetEmail(e.target.value)}} className="mt-5 pl-3 w-[220px] md:w-[280px] h-[30px] rounded-sm outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 shadow-md " />
                    <div className="mt-5 flex justify-center ">
                        <button type="submit" className="bg-blue-400 w-40 h-[35px] p-1 rounded-md shadow-md font-bold text-white tracking-[1px] text-[15px]" >Send</button>
                    </div>
                </form>

            </div>
        </div>
    )
} 