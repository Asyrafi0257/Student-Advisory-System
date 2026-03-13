"use client";

export default function ListMentor() {
    return (
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0">
            <div className="flex flex-row justify-between mb-2 border-b border-gray-300">
                <h2 className="font-bold text-[25px] tracking-[1px]">List Mentor</h2>
            </div>
            <table className="w-full overflow-auto">
                <thead className="bg-gray-100 text-gray-600">
                  <tr className="mb-2">
                    <th className="px-2 py-2">No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">email</th>
                    <th className="px-4 py-2">Office</th>
                    <th className="px-4 py-2">Status</th>
                </tr>  
                </thead>
                <tbody>
                   <tr className="border-b border-gray-300">
                    <td className="px-4 py-2">1.</td>
                    <td className="px-4 py-2">Muhammad Alif Asyrafi bin Mohd sani</td>
                    <td className="px-4 py-2">Computer Science</td>
                    <td className="px-4 py-2">asyrafi0257@gmail.com</td>
                    <td className="px-4 py-2">Room 302, Admin Building</td>
                    <td className="px-4 py-2">Active</td>
                   </tr> 
                
                </tbody>
                
            </table>
        </div>
    )
}