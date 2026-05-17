"use client"

import { Search, SquarePen } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

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
            const res = await axios.get("/api/admin/mentor");
            console.log(res.data.rows)
            setDataMentor(res.data.rows)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (id) => {
        try {
            const res = await axios.get(`/api/mentor/${id}`);
            setSelectedMentor(res.data);
            setOpen(true);

        } catch (err) {
            console.log(err);
            //alert("Error fetching mentor data");

        }
    }

    const filterMentee = dataMentor.filter((data) => (
        data.mentor_id?.toString().includes(search.toString()) || data.mentor_name?.toLowerCase().includes(search.toLowerCase()) || data.mentor_active?.toLowerCase().includes(search.toLowerCase())
    ))

    return (
        <div className="bg-[#ffffff] shadow-lg rounded-xl p-4 md:p-6 mt-5">
            <div className="flex flex-row w-full border-b-1 border-gray-300 justify-between py-2">
                <div className="mb-2 w-full">
                    <h3 className="text-[20px] font-semibold">List Mentor</h3>
                </div>
                <div className="relative w-full flex justify-end">
                    <input type="text" placeholder="search..." className="shadow-sm border-1 border-gray-300 rounded-md outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:ouline-offset-2 focus-within:outline-black-300 w-[350px] h-[35px] py-2 pl-2" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <Search className="absolute text-gray-400 top-1/2 -translate-y-1/2 right-3 cursor-pointer" />
                </div>
            </div>

            <div className="mt-3">
                {!filterMentee || filterMentee.length === 0 ? (
                    <p>Not data mentor founded</p>
                ) : (
                    <div className="w-full mt-3">
                        <table className="w-full table-auto mb-2">
                            <thead className="bg-[#02577A]">
                                <tr className="text-white">
                                    <th className="p-1 text-[15px]">Mentor Id</th>
                                    <th className="p-1 text-[15px]">Mentor Name</th>
                                    <th className="p-1 text-[15px]">Active</th>
                                    <th className="p-1 text-[15px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterMentee.map((data) => (
                                    <tr key={data.id} className="text-center border-b-1 border-gray-300 hover:bg-gray-100">
                                        <td>{data.mentor_id}</td>
                                        <td>{data.mentor_name}</td>
                                        <td>{data.mentor_active}</td>
                                        <td className="flex justify-center">
                                            <SquarePen className="text-blue-500 cursor-pointer" onClick={() => handleEdit(data.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {open && selectedMentor && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-[400px] relative z-50">

                        <h2 className="text-lg font-semibold mb-3">
                            Edit Mentor
                        </h2>

                        <div className="flex flex-col gap-2">
                            <input
                                className="border p-2 rounded"
                                value={selectedMentor.mentor_id}
                                onChange={(e) =>
                                    setSelectedMentor({
                                        ...selectedMentor,
                                        mentor_id: e.target.value
                                    })
                                }
                            />
                            <input
                                className="border p-2 rounded"
                                value={selectedMentor.mentor_name}
                                onChange={(e) =>
                                    setSelectedMentor({
                                        ...selectedMentor,
                                        mentor_name: e.target.value
                                    })
                                }
                            />

                            <select
                                className="border p-2 rounded"
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

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-3 py-1 bg-gray-300 rounded"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                                onClick={async () => {
                                    try {
                                        await axios.put(
                                            `/api/mentor/${selectedMentor.id}`,
                                            selectedMentor
                                        );
                                        setOpen(false);
                                        fetchData();
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }}
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}