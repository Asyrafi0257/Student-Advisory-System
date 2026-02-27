import Image from "next/image";

export default function Alert(){
    return (
        <div className="absolute inset-0 bg-black/45 z-1 flex justify-center items-center">
            <div className="bg-white flex flex-col w-[400px] h-[300px] rounded-2xl border-4 border-green-500">
                <div className="flex justify-center mt-10">
                    <Image
                    src="/images/logo-right2.png"
                    alt="logo-right2.png"
                    width={120}
                    height={120}
                    className="flex items-center"
                />
                </div>
                <div className="flex justify-center mt-10">
                    <h2 className="font-bold text-2xl text-green-600">Login Success</h2>
                </div>
               
            </div>
        </div>
    )
}