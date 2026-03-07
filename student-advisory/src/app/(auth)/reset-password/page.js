"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword(){
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const searchParams = useSearchParams();
    //ambil token dari url
    const token = searchParams.get("token"); 

    const handleChange = async (e) => {
        e.preventDefault();

        //check error handling
        if(newPass === "" || confirmPass === ""){
            alert("Please fill the field!");

        } else if(newPass !== confirmPass){
            alert("Your password not matched!");
        } else {
            try{
                const res = await fetch("/api/auth/reset-password", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({newPass, token}),
                })
                const data = await res.json();

                if(data.success){
                    alert("Your password already changed")
                } else {
                    alert("Invalid or expired token");
                }
            }catch(error){
                alert(error.message);
            }
        }

    }
    return(
        <div className="flex flex-row bg-black h-screen w-screen justify-center items-center">
            <div className="bg-white flex flex-col items-center w-[300px] md:w-[380px] h-[330px] md:h-[380px] rounded-xl ">
                <div className="flex rounded-full shadow-md bg-white w-[100px] md:w-[130px] h-[100px] md:h-[130px] mt-[-55px]">
                    <Image 
                        src="/images/logo-resetPass.png"
                        alt="/logo-resetPass.png"
                        width={150}
                        height={150}   
                    />
                </div>
                <div className="flex justify-center">
                    <h2 className="mt-3 font-bold text-lg md:text-2xl tracking-[2px]">Change Password</h2>
                </div>
                <form onSubmit={handleChange} className="flex flex-col justify-start w-70 mt-3">
                    <label className="text-sm md:text-base tracking-[1px] mx-[5px] ">New Password <span className="text-red-600">*</span></label>
                    <input type="password" name="password" placeholder="password" value={newPass} className="mt-2 w-full shadow-sm h-[40px] rounded-lg p-2 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gray-300" onChange={(e) => {setNewPass(e.target.value)}}/>

                    <label className="mt-3 text-sm md:text-base tracking-[1px] mx-[5px]">Re-enter New Password <span className="text-red-600">*</span></label>
                    <input type="password" name="password" placeholder="Re-enter password" value={confirmPass} className="mt-2 w-full shadow-sm h-[40px] rounded-lg p-2 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gray-300" onChange={(e) => {setConfirmPass(e.target.value)}}/>
                    <div className="flex w-full mt-5 justify-center">
                        <button type="submit" className="bg-blue-500 w-[150px] h-[35px] shadow-sm text-white rounded-2xl tracking-[1px] text-sm">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}