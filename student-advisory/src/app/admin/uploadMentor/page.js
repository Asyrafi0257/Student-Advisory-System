"use client"

import { motion } from "framer-motion";
import UploadFile from "@/components/upload";
import AttachFile from "@/components/fileUpload";

export default function UploadMentor() {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-4 md:px-8">
                <motion.div
                    className=""
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <UploadFile url="/api/admin/uploadMentor" role="mentor" />
                </motion.div>

                <motion.div
                    className="mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <AttachFile url="/api/admin/fileMentor" type="mentor" delUrl="/api/admin/delFileMentor" />
                </motion.div>
            </main>
        </div>
    )
}