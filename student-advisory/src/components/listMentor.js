"use client"

import { Search, SquarePen, X } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/lib/axios";

export default function ListMentors() {
    const [search, setSearch] = useState("");
    const [dataMentor, setDataMentor] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await api.get("/api/admin/mentor");
            console.log(res.data.rows)
            setDataMentor(res.data.rows)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (id) => {
        try {
            const res = await api.get(`/api/admin/mentor/${id}`);
            setSelectedMentor(res.data);
            setOpen(true);

        } catch (err) {
            console.log(err);
        }
    }

    const filterMentee = dataMentor.filter((data) => (
        data.mentor_id?.toString().includes(search.toString()) || data.mentor_name?.toLowerCase().includes(search.toLowerCase()) || data.mentor_active?.toLowerCase().includes(search.toLowerCase())
    ))

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 mt-5 mx-4">
            {/* HEADER & SEARCH */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-gray-200 pb-4 sm:pb-5 mb-4 sm:mb-5">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">List Mentor</h3>

                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full sm:w-[300px] lg:w-[350px] px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="mt-4 sm:mt-5 overflow-x-auto">
                {!filterMentee || filterMentee.length === 0 ? (
                    <div className="flex justify-center items-center py-8 sm:py-12">
                        <p className="text-gray-500 text-sm sm:text-base">No mentor data found</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-[#02577A] text-white">
                                    <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm lg:text-base font-semibold">
                                        Mentor ID
                                    </th>
                                    <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm lg:text-base font-semibold">
                                        Mentor Name
                                    </th>
                                    <th className="px-3 sm:px-4 py-3 sm:py-4 text-center text-xs sm:text-sm lg:text-base font-semibold">
                                        Status
                                    </th>
                                    <th className="px-3 sm:px-4 py-3 sm:py-4 text-center text-xs sm:text-sm lg:text-base font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterMentee.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm lg:text-base text-gray-900">
                                            {data.mentor_id}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm lg:text-base text-gray-900">
                                            {data.mentor_name}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                                            <span className={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${data.mentor_active?.toLowerCase() === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {data.mentor_active}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-center">
                                            <button
                                                onClick={() => handleEdit(data.id)}
                                                className="inline-flex items-center justify-center p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Edit mentor"
                                            >
                                                <SquarePen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            {open && selectedMentor && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 sm:p-0">
                    <div className="bg-white rounded-lg sm:rounded-xl w-full sm:w-[420px] shadow-xl relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* HEADER */}
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                Edit Mentor
                            </h2>
                        </div>

                        {/* FORM CONTENT */}
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mentor ID
                                </label>
                                <input
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                                    value={selectedMentor.mentor_id}
                                    onChange={(e) =>
                                        setSelectedMentor({
                                            ...selectedMentor,
                                            mentor_id: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mentor Name
                                </label>
                                <input
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                                    value={selectedMentor.mentor_name}
                                    onChange={(e) =>
                                        setSelectedMentor({
                                            ...selectedMentor,
                                            mentor_name: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors bg-white"
                                    value={selectedMentor.mentor_active}
                                    onChange={(e) =>
                                        setSelectedMentor({
                                            ...selectedMentor,
                                            mentor_active: e.target.value
                                        })
                                    }
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end p-4 sm:p-6 border-t border-gray-200">
                            <button
                                className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
                                onClick={async () => {
                                    try {
                                        await api.put(
                                            `/api/admin/mentor/${selectedMentor.id}`,
                                            selectedMentor
                                        );
                                        setOpen(false);
                                        fetchData();
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }}
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}