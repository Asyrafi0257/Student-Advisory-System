"use client"

import {motion} from "framer-motion";
import UploadFile from "../uploadFiles/page";

export default function UploadMentor(){
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 md:py-8">
                <motion.div
                className=""
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1}}
                >  
                    <UploadFile/>
                </motion.div>
            </main>
        </div>
    )
}