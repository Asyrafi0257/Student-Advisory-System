
import Image from "next/image";

export default function ForgotPassword(){
    return (
        <div className="bg-black flex flex-row h-screen w-screen justify-center items-center">
            <div className="bg-white w-[300px] h-[400px] rounded-xl flex flex-col items-center">
                <Image
                    src="/images/forgot-password.jpg"
                    alt="forgot-password.jpg"
                    width={140}
                    height={140}
                    className="rounded-sm"
                />
                <div className="flex flex-col justify-center">
                    <h2 className="text-blue-500 font-bold text-lg flex justify-center">Forgot your Password</h2>
                    <p className="text-sm flex justify-center text-center w-[200px] mt-3">We'll send your an email with instruction to reset it</p>
                </div>
                <form action="">
                    <input type="text" name="email" placeholder="your email" className="mt-5 pl-3 w-[220px] h-[30px] rounded-sm outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:outline-offset-2 " />
                </form>

            </div>
        </div>
    )
} 