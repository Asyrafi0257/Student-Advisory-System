"use client";

import ViewAssignment from "@/components/viewAssign";
import { motion } from "framer-motion";

export default function View() {
    return (
        <div className="flex-1 relative z-10">
            <main className="max-w-7xl mx-auto py-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <ViewAssignment />
                </motion.div>

            </main>

        </div>
    )
}