"use client"

export default function ListMentors(){
    return(
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0 h-auto">
            <div className="flex flex-row w-full border-b-1 border-gray-300 justify-between">
                <div className="mb-2">
                    <h3 className="text-[20px] font-semibold">List Mentor</h3>
                </div>
                <div>
                    <input type="text" />
                </div>
            </div>

        </div>
    )
}