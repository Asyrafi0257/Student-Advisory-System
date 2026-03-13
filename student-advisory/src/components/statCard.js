"use client";

import {motion} from "framer-motion";

export default function StatCard({name, icon:Icon, value}) {
    return (
        <motion.div 
            className="bg-[#ffffff] backdrop-blur-md overflow-hidden shadow-lg rounded-xl"
            whileHover={{y: -5, boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.5"}}
            >
            <div className="px-4 py-5 sm:p-6">
                <span className="flex items-center text-sm font-medium text-black">
                    <Icon size={20} className="mr-2"/>
                    {name}
                </span>
                <p className="mt-1 text-3xl font-semibold text-black">{value}</p>
            </div>
        </motion.div>
    )
}