"use client"

import ListStudent from "@/components/listStudent";
import { motion } from "framer-motion";

export default function Student(){
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl m-auto py-4 lg:px-8">
                <motion.div
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1}}
                >
                    <ListStudent/>
                </motion.div>
            </main>
        </div>
    )
}