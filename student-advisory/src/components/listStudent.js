import { Search } from "lucide-react";
import api from "@/lib/axios"
import { useEffect, useState } from "react";

export default function StudentList() {
    const [dataStudent, setDataStudent] = useState([]);
    const [searchStudent, setSearchStudent] = useState("")

    useEffect(() => {
        fetchDataStudent();
    }, []);

    const fetchDataStudent = async () => {
        try {
            const res = await api.get("/api/admin/student");
            console.log(res.data);
            setDataStudent(res.data.rows);
        } catch (err) {
            console.log(err);
        }

    }

    //filter search
    const filterStudent = dataStudent.filter((data) => (
        data.stud_name?.toLowerCase().includes(searchStudent.toLowerCase()) ||
        data.stud_matric?.toString().includes(searchStudent.toString())
    ))

    return (
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl mx-4 p-4 md:p-6 h-auto overflow-hidden">

            {/* HEADER */}
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-gray-300 py-3 gap-3">

                <div className="w-full">
                    <h3 className="text-black text-[18px] sm:text-[20px] md:text-[22px] font-semibold">
                        List Student (Mentee)
                    </h3>
                </div>

                <div className="relative w-full lg:w-[350px]">

                    <input
                        type="text"
                        placeholder="search name or matric..."
                        className="w-full shadow-sm h-[42px] py-2 pl-3 pr-10 rounded-lg border border-gray-200 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300 text-sm sm:text-base"
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                    />

                    <Search className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-400 w-5 h-5" />

                </div>
            </div>

            {/* TABLE */}
            <div className="mt-5 overflow-x-auto overflow-y-auto max-h-[600px] rounded-lg">

                {!filterStudent || filterStudent.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        No data Student
                    </div>
                ) : (
                    <table className="w-full min-w-[1700px] table-auto mb-3">

                        <thead className="bg-[#02577A] sticky top-0 z-10">
                            <tr className="text-center text-white">

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Matric
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Name
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Program
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Gender
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Code UUM
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Academic Qualifications
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    PMK Entry
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Band Muet
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Status OKU
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Disabilities Description
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Inasis
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    No Phone
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Email Alternatif
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Email UUM
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Address
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    State
                                </th>

                                <th className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                                    Parent Income
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            {filterStudent.map((data) => (
                                <tr
                                    key={data.stud_matric}
                                    className="text-center border-b border-gray-300 hover:bg-gray-100 transition"
                                >

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.stud_matric}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[220px] truncate hover:whitespace-normal hover:overflow-visible px-3 py-3"
                                        title={data.stud_name}
                                    >
                                        {data.stud_name}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[220px] truncate hover:whitespace-normal hover:overflow-visible px-3 py-3"
                                        title={data.program}
                                    >
                                        {data.program}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.gender}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.code_uum}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[180px] truncate px-3 py-3"
                                        title={data.academic_qualifications}
                                    >
                                        {data.academic_qualifications}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.pmk_masuk}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.band_muet}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.status_oku}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[180px] truncate px-3 py-3"
                                        title={data.disability_description}
                                    >
                                        {data.disability_description}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.inasis}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.no_phone}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[220px] truncate px-3 py-3"
                                        title={data.email_alternatif}
                                    >
                                        {data.email_alternatif}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[220px] truncate px-3 py-3"
                                        title={data.email_uum}
                                    >
                                        {data.email_uum}
                                    </td>

                                    <td
                                        className="text-xs sm:text-sm max-w-[250px] truncate px-3 py-3"
                                        title={data.stud_address}
                                    >
                                        {data.stud_address}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.state}
                                    </td>

                                    <td className="text-xs sm:text-sm px-3 py-3 whitespace-nowrap">
                                        {data.parent_income}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}

            </div>

        </div>
    )
}