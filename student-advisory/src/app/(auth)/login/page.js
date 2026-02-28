"use client";

import Image from "next/image";
import {User, Lock, ChevronDown} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/components/alert";

export default function Login() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectRole, setSelectRole] = useState("Options");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRoles] = useState(["Admin", "Student", "Lecture"]);
    const [alertData, setAlertData] = useState(null);

    

    const handleForgot = () => {
        router.push("/forgot-password")
    }
    const handleSignUp = () => {
        router.push("/register");
    }
    const handleSelected = () => {
        setOpen(true);
    }

    //cara handle setTimeout
    const showAlert = (data, duration = 2000) => {
        setAlertData(data);

        if(duration){
            setTimeout(() => {
                setAlertData(null);
            }, duration)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // check error handling
        if(name === "" && password === "" && selectRole !== role[0]){
            showAlert({
                type : "error",
                message : "Required Fields",
                describe : "All fields are required."
            })
            return;
        }

        try{
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, password}),
            });
            const data = await res.json(); //wait response from server

            if(data.success && selectRole === role[0]){
                setAlertData({
                    type : "success",
                    message : "Success!",
                    describe: "You have successfully signed into Admin account."
                })
                setTimeout(() => {
                   router.replace("/admin") 
                }, 2000);
                
            } else{
                showAlert({
                    type : "error",
                    message : "Failed!",
                    describe : "Username, password and role do not match"
                })
            }
        } catch(error){
            showAlert({
                type : "error",
                message : "Server Error",
                describe : "Something went wrong on our end. Please try again later."
            })

        }
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

            <div className="relative scroll-smooth flex flex-col w-screen sm:flex-row h-screen justify-center sm:items-center">
                <div className="flex flex-col justify-center items-center w-full sm:w-1/2 text-center sm:text-center lg:text-start">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl/14  mt-3 font-bold tracking-[2px] text-white w-[350px] sm:w-[300px] md:w-[400px] lg:w-[500px]">WELCOME TO THE STUDENT ADVISORY SYSTEM</h1>
                    <h3 className="text-lg sm:text-[23px] text-white w-[350px] sm:w-[500px] mt-2 mb-5">SCHOOL OF COMPUTING</h3>
                </div>

                <div className="flex flex-col justify-center items-center w-full sm:w-1/2 text-center md:justify-center">
                    <div className="bg-white w-[300px] sm:w-[320px] md:w-[360px] lg:w-[480px] h-[430px] sm:h-[480px] md:h-[500px] lg:h-[540px] rounded-[15px] flex flex-col">
                        <h1 className="flex flex-row justify-center mt-3 sm:mt-10 text-[23px] sm:text-[25px] md:text-[30px] font-bold text-shadow-lg">Login</h1>

                        <form onSubmit={handleLogin} className="flex flex-col items-center mt-5 sm:mt-10">
                            <div className="relative shadow-md">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Username" name="username" value={name} className="sm:w-[270px] lg:w-[350px] h-[38px] rounded-md p-3 pl-10 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 " onChange={(e) => {setName(e.target.value)}}/> 
                            </div>
                            <div className="relative mt-5 shadow-md">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="password" placeholder="Password" name="password" value={password} className="sm:w-[270px] lg:w-[350px] h-[38px] rounded-md p-3 pl-10 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300" onChange={(e) => {setPassword(e.target.value)}} />
                            </div>
                            <div className="mt-3 w-[240px] sm:w-[270px] md:w-[350px] flex flex-row justify-end cursor-pointer">
                                <h3 className="text-blue-600 text-shadow-md text-[15px]" onClick={handleForgot}>Forgot password?</h3>
                            </div>

                            <div className="relative mt-5 flex flex-row justify-start w-[240px] sm:w-[260px] md:w-[300px] lg:w-[350px]">
                                <button type="button" className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 shadow-md" onClick={handleSelected}>{selectRole}
                                    <ChevronDown className="h-5 w-5"/>   
                                </button>
                                {open && (
                                    <div className="absolute w-32 border mt-1 rounded-md bg-white mt-10">
                                    {role.map((item) => (
                                        <div
                                        key={item}
                                        onClick={() => {
                                            setSelectRole(item)
                                            setOpen(false)
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                        >
                                        {item}
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-row justify-end w-[240px] sm:w-[260px] md:w-[300px] lg:w-[350px]">
                               <button type="submit" className="bg-blue-600 w-24 h-[35px] rounded-[20px] mt-8 text-white cursor-pointer shadow-md ">Login</button> 
                            </div>
                            
                            <div className="mt-10 sm:mt-11 md:mt-13">
                                <h3 className="font-bold">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={handleSignUp}>Sign Up</span></h3>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            {/* for popup message */}
            {alertData && (
                <Alert 
                    type = {alertData.type}
                    message = {alertData.message}
                    describe = {alertData.describe}
                />
            )}
        </div>
    )
}