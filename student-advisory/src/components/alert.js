import Image from "next/image";

export default function Alert({type, message, onClose}){
    const styles = {
        success : "text-green-600 border-green-500",
        error : "text-red-600 border-red-600",
    }
    const image = {
        success : "/images/logo-right2.png",
        error : "/images/logo-error2.png",
    }
    return (
        <div className="absolute inset-0 bg-black/45 z-10 flex justify-center items-center">
            <div className={`bg-white flex flex-col w-[270px] sm:w-md h-[280px] sm:h-md rounded-2xl border-4 ${styles[type]} transition duration-700 ease-in-out`}>
                <div className="flex justify-center mt-10">
                    <Image
                    src={image[type]}
                    alt="logo-right2.png"
                    width={110}
                    height={110}
                    className="flex items-center"
                />
                </div>
                <div className="flex justify-center mt-10">
                    <h2 className="font-bold text-2xl">{message}</h2>
                </div>
               
            </div>
        </div>
    )
}