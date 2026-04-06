"use client"

import {motion} from "framer-motion";

export default function AssignMentee(){
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main>
                <motion.div
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{duration:1}}
                >

                </motion.div>
            </main>
                          
        </div>
    )
}