import Image from "next/image";

export default function ResetPassword(){
    return(
        <div className="flex flex-row bg-black h-screen w-screen justify-center items-center">
            <div className="bg-white flex flex-col items-center w-[400px] h-[400px] rounded-xl ">
                <div className="flex rounded-full shadow-md bg-white w-[130px] h-[130px] mt-[-50px]">
                    <Image 
                        src="/images/logo-resetPass.png"
                        alt="/logo-resetPass.png"
                        width={150}
                        height={150}   
                    />
                </div>
                <div className="flex justify-center">
                    <h2 className="mt-3 font-bold text-2xl tracking-[2px]">Change Password</h2>
                </div>
                <form  className="flex flex-col justify-start w-70 mt-3">
                    <label className="text-sm tracking-[1px]">New Password <span className="text-red-600">*</span></label>
                    <input type="password" name="password" placeholder="password" className="mt-2 w-full shadow-sm h-[40px] rounded-lg p-2"/>

                    <label className="mt-3 text-sm tracking-[1px]">Re-enter New Password <span className="text-red-600">*</span></label>
                    <input type="password" name="password" placeholder="Re-enter password" className="mt-2 w-full shadow-sm h-[40px] rounded-lg p-2"/>
                    <div className="flex w-full mt-4 justify-center">
                        <button type="submit" className="bg-blue-500 w-[150px] h-[35px] shadow-sm text-white rounded-sm tracking-[1px] text-sm">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}