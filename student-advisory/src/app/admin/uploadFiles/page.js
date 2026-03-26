"use client"

import Upload from "@/components/upload";
import AttachFiles from "@/components/fileUpload";
import {motion} from "framer-motion";

export default function UploadFile() {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 lg:px-8">
                <motion.div
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1}}
                className="mb-5"
                >
                    <Upload/>
                </motion.div>
                
                <motion.div 
                className="mt-4"
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1}}
                >
                    <AttachFiles/>
                </motion.div>
            </main>

        </div>
    )
}