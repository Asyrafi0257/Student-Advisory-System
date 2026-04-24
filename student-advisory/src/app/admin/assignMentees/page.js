"use client"

import { motion } from "framer-motion";
import Assign from "@/components/assignMentee";

export default function AssignMentee() {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="flex flex-col max-w-7xl py-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Assign />
                </motion.div>
            </main>

        </div>
    )
}