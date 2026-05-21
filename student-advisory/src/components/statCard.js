"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";

export default function StatCard({ name, icon: Icon, value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {

        const controls = animate(0, Number(value) || 0, {
            duration: 2,
            onUpdate(latest) {
                setCount(Math.floor(latest));
            },
        });

        return () => controls.stop();

    }, [value]);
    return (
        <motion.div
            className="bg-[#ffffff] backdrop-blur-md overflow-hidden shadow-lg rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.5" }}
        >
            <div className="px-4 py-5 sm:p-6">
                <span className="flex items-center text-sm font-medium text-black">
                    <Icon size={20} className="mr-2" />
                    {name}
                </span>
                <p className="mt-1 text-3xl font-semibold text-black">{count}</p>
            </div>
        </motion.div>
    )
}