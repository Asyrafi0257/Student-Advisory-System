import Image from "next/image";

export default function Alert({type, message, describe}){
    const styles = {
        success : "text-green-600 border-green-500",
        error : "text-red-600 border-red-600 text-xl m-5",
    }
    const image = {
        success : "/images/logo-right2.png",
        error : "/images/x-cross2.png",
    }
    
    return (
        <div className="absolute inset-0 bg-black/45 z-10 flex justify-center items-start">
            <div className={`bg-white flex flex-row mt-3 w-[300px] sm:w-md h-[80px] sm:h-[100px]  rounded-2xl border-3 ${styles[type]} transition duration-700 ease-in-out`}>
                <div className="flex items-center justify-center w-24">
                    <Image
                    src={image[type]}
                    alt="logo-right2.png"
                    width={100}
                    height={20}
                    className="flex items-center w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]"
                />
                </div>
                <div className="flex flex-col justify-center items-start">
                    <h2 className="font-bold text-xl sm:text-2xl">{message}</h2>
                    <p className="text-sm">{describe}</p>
                </div>
                
               
            </div>
        </div>
    )
}