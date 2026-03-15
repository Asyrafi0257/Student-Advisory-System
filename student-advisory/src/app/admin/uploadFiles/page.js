"use client"

import Upload from "@/components/upload";
import {motion} from "framer-motion";

export default function UploadFile() {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 lg:py-8">
                <motion.div
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1}}
                
                >
                <Upload/>
                </motion.div>
            </main>

        </div>
    )
}