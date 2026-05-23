"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <motion.div
      className="relative flex flex-col justify-center items-center min-h-screen text-center px-4 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Image */}
      <Image
        src="/images/bg-homepage.jpeg"
        alt="bg-homepage.jpeg"
        fill
        unoptimized
        className="object-cover"
        priority
      />

      {/* Overlay hitam untuk gelapkan image */}
      <div className="absolute inset-0 bg-black/45 z-0"></div>

      <div className="relative z-10 info-page flex flex-col justify-center items-center mb-8 sm:mb-10 px-2">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[55px] leading-tight flex justify-center font-title text-white font-bold tracking-[2px] sm:tracking-[3px]">
          STUDENT ADVISORY SYSTEM
        </h1>

        <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl flex justify-center text-white mb-4 font-title tracking-[2px] sm:tracking-[3px] font-semibold">
          SCHOOL OF COMPUTING
        </h3>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg flex justify-center max-w-[950px] text-white font-title tracking-[1px] sm:tracking-[2px] px-2">
          This system serves as the official of the School of Computing for
          managing academic advisory record and interactions between student and
          advisors.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
        <button
          className="bg-sky-600 h-10 w-[130px] sm:w-32 rounded-full font-bold shadow-xl/20 cursor-pointer text-white hover:bg-white hover:text-black transition delay-100 sm:mr-4"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          className="bg-sky-600 h-10 w-[130px] sm:w-32 rounded-full font-bold shadow-xl/20 cursor-pointer text-white hover:bg-white hover:text-black transition delay-100"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </motion.div>
  );
}