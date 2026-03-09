import Image from "next/image";

export default function Header(){
    return(
        <header className="bg-[#1e1e1e] flex shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
            <div className="mx-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between w-full">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">Dashboard</h1>

                <div className="flex items-center space-x-3 sm:space-x-6">
                    <div className="flex-space-2 sm:space-x-3">
                        <h3 className="text-white">Hi! Admin</h3>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3">
                       <Image 
                        src="/images/logo-profile.png"
                        alt="logo-profile.png"
                        width={35}
                        height={35}
                        className="rounded-full bg-white border border-gray-600"
                    /> 
                    </div>
                    
                </div>

            </div>
        </header>
    )
}