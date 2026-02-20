"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  }
  const handleLogin = () => {
    router.push("/login");
  }

  return (
      <div className=" relative flex flex-col justify-center items-center h-screen text-center">
        {/* Background Image */}
      <Image
        src="/images/bg-homepage.jpeg"
        alt="bg-homepage.jpeg"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay hitam untuk gelapkan image */}
      <div className="absolute inset-0 bg-black/45 z-0"></div> 

        <div className="relative z-10 info-page flex flex-col justify-center mb-10">
          <h1 className="text-2xl lg:text-[55px] md:text-4xl sm:text-2xl flex justify-center font-title text-white font-bold tracking-[3px]">STUDENT ADVISORY SYSTEM</h1>
          <h3 className=" lg:text-2xl md:text-xl sm:text-lg flex justify-center text-white mb-4 font-title tracking-[3px] font-semibold ">SCHOOL OF COMPUTING</h3>
          <p className="text-sm sm:text-base md:text-lg flex justify-center max-w-[950px] text-white font-title tracking-[2px] mr-3 ml-3">This system serves as the official of the School of Computing for managing academic advisory record and interactions between student and advisors.</p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button className="bg-sky-600 h-10 w-32 rounded-full font-bold shadow-xl/20 cursor-pointer text-white  hover:bg-white hover:text-black transition delay-100 mr-10" onClick={handleLogin}>Login</button>
          <button className="bg-sky-600 h-10 w-32 rounded-full font-bold shadow-xl/20 cursor-pointer text-white  hover:bg-white hover:text-black transition delay-100" onClick={handleRegister}>Register</button>
        </div>
      </div>
  )
}


