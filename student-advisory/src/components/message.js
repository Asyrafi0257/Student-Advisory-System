import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function Message() {

    const [isOpen, setIsOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get("/api/profile");
            setDataUpdate(res.data);

            if (!res.data.program) {
                setIsOpen(true);
            }
        } catch (e) {
            alert(e);
        }

    }

    //handle function close
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div>
            {isOpen && (
                <div className="max-w-7xl h-[38px] bg-amber-400 mx-4 sm:mx-6 lg:mx-8 px-3 flex flex-row justify-between items-center mt-1 rounded-md border border-amber-300 shadow-sm overflow-hidden">
                    <div className="flex-1 relative overflow-hidden h-full">
                        <motion.div
                            className="absolute flex flex-row items-center justify-start whitespace-nowrap mt-2"
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 10,
                                ease: "linear",
                            }}
                        >
                            <span className="mr-2 text-base">📣</span>
                            <p className="text-sm font-medium text-amber-950 w-[550px] tracking-[2px]">
                                Please update your profile first so that your mentor can access your latest information and records.
                            </p>
                        </motion.div>
                    </div>

                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-amber-500 transition-colors duration-150" onClick={handleClose}>
                        <X className="w-[12px] h-[12px] text-amber-900 cursor-pointer" />
                    </button>
                </div>
            )}
        </div>

    );
}