"use client"

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

//student boleh dragged
function DraggableStudent({ student }) {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({
            id: `student-${student.stud_id}`,
            data: {
                type: "student",
                student,
            },
        });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        <tr
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="cursor-grab active:cursor-grabbing hover:bg-blue-50 transition-colors border-b"
        >
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">
                {student.stud_name}
            </td>
        </tr>
    );
}

//mentor boleh dragged
function DraggableMentor({ mentor }) {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({
            id: `mentor-${mentor.id}`,
            data: {
                type: "mentor",
                mentor,
            },
        });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        <tr
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="cursor-grab active:cursor-grabbing hover:bg-blue-50 transition-colors border-b"
        >
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">
                {mentor.mentor_name}
            </td>
        </tr>
    );
}

//kawasan drop mentor
function MentorDropZone({ assignedMentors, assignments, handleRemoveStudent, handleRemoveMentor }) {
    const { setNodeRef, isOver } = useDroppable({ id: "mentor-drop-zone" });

    return (
        <div
            ref={setNodeRef}
            className={`border-2 border-dashed rounded-lg p-3 sm:p-4 w-full transition-colors ${isOver ? "bg-green-50 border-green-400" : "bg-white border-gray-300"
                }`}
        >
            <h3 className="font-semibold text-sm sm:text-base mb-3 text-gray-900">
                Mentor Table
            </h3>
            {assignedMentors.length === 0 && (
                <p className="text-gray-400 text-xs sm:text-sm italic">
                    Drag mentors here
                </p>
            )}
            {assignedMentors.map((mentor) => (
                <div
                    key={mentor.id}
                    className="border border-gray-200 p-3 sm:p-4 mb-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                        <div className="sm:border-r-2 border-gray-200 sm:pr-3 sm:w-40 flex items-center">
                            <strong className="text-xs sm:text-sm text-gray-900">
                                {mentor.mentor_name}
                            </strong>
                            <button
                                onClick={() => handleRemoveMentor(mentor)}
                                className="ml-2 p-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg transition-colors flex-shrink-0"
                                title="Remove student"
                            >
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>

                        <div className="flex-1 sm:pl-3">
                            <MenteeDropZone
                                mentor={mentor}
                                assignedStudents={assignments[mentor.id] || []}
                                handleRemoveStudent={handleRemoveStudent}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ================= DROPPABLE STUDENT PER MENTOR ================= */
function MenteeDropZone({ mentor, assignedStudents, handleRemoveStudent }) {
    const { setNodeRef, isOver } = useDroppable({
        id: `mentee-zone-${mentor.id}`,
        data: { type: "mentor", mentor },
    });

    return (
        <div
            ref={setNodeRef}
            className={`w-full p-2 sm:p-3 rounded-lg transition-colors ${isOver ? "bg-blue-100 border-2 border-blue-400" : "bg-gray-50 border border-gray-200"
                }`}
        >
            {assignedStudents.length === 0 ? (
                <p className="text-gray-400 text-xs sm:text-sm italic">
                    Drop students here
                </p>
            ) : (
                <div className="space-y-2">
                    {assignedStudents.map((student) => (
                        <div
                            key={student.stud_id}
                            className="flex items-center justify-between bg-white p-2 sm:p-2.5 rounded border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                            <span className="text-xs sm:text-sm text-gray-900 flex-1">
                                • {student.stud_name}
                            </span>

                            <button
                                onClick={() => handleRemoveStudent(mentor.id, student)}
                                className="ml-2 p-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg transition-colors flex-shrink-0"
                                title="Remove student"
                            >
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Assigns() {
    const [dataMentor, setDataMentor] = useState([]);
    const [dataStudent, setDataStudent] = useState([]);
    const [error, setError] = useState("");
    const [assignments, setAssignments] = useState({});
    const [assignedMentors, setAssignedMentors] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectRole, setSelectRole] = useState("All")
    const roleOptions = ["mentor", "mentee"]
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchAssign();
    }, []);

    const handleSelected = () => {
        setOpen(!open);
    }

    // FILTER MENTOR
    const filteredMentor = dataMentor.filter((mentor) => {
        if (selectRole === "mentee") return true;
        if (selectRole === "All") return dataMentor;
        return (mentor.mentor_name || "").toLowerCase().includes(search.toLowerCase());

    });

    // FILTER STUDENT
    const filteredStudent = dataStudent.filter((student) => {
        if (selectRole === "mentor") return true;
        if (selectRole === "All") return dataStudent;
        return (student.stud_name || "")
            .toLowerCase()
            .includes(search.toLowerCase());
    });



    const fetchAssign = async () => {
        try {
            const resMentor = await axios.get("/api/admin/mentor");
            const resStudent = await axios.get("/api/admin/student?available=true");
            setDataMentor(resMentor.data.rows);
            setDataStudent(resStudent.data.rows);
        } catch (err) {
            console.log(err);
        }
    }

    /* ================= HANDLE DRAG END ================= */
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const dragged = active.data.current;
        const dropped = over.data.current;

        //show error if student drag to table mentor
        if (dragged.type === "student" && over.id === "mentor-drop-zone") {
            setError("Student cannot drop at Mentor Table!");
            setTimeout(() => setError(""), 3000);
            return;
        }

        // Drag mentor → mentor table
        if (dragged.type === "mentor" && over.id === "mentor-drop-zone") {
            const mentor = dragged.mentor;

            if (!assignedMentors.find((m) => m.id === mentor.id)) {
                setAssignedMentors((prev) => [mentor, ...prev]);

                setDataMentor((prev) =>
                    prev.filter((m) => m.id !== mentor.id)
                );
            }
        }

        // Drag student → mentor drop zone
        if (dragged.type === "student" && dropped?.type === "mentor") {
            const student = dragged.student;
            const mentor = dropped.mentor;

            const currentStudents = assignments[mentor.id] || [];

            // limit 10 mentee
            if (currentStudents.length >= 10) {
                setError("Mentor can only be assigned 10 mentees");
                setTimeout(() => setError(""), 3000);
                return;
            }

            setAssignments((prev) => {
                return {
                    ...prev,
                    [mentor.id]: [...currentStudents, student],
                };
            });

            setDataStudent((prev) =>
                prev.filter((s) => s.stud_id !== student.stud_id)
            );
        }
    };

    //convert data before fetch to API
    const formatAssignments = () => {
        const result = [];

        Object.keys(assignments).forEach((mentorId) => {
            assignments[mentorId].forEach((student) => {
                result.push({
                    mentor_id: Number(mentorId),
                    stud_id: student.stud_id,
                });
            });
        });

        return result;
    };

    //handle button save
    const handleSave = async () => {
        try {
            const formattedData = formatAssignments();

            await axios.post("/api/admin/assign", {
                assignments: formattedData,
            });

            alert("Data successfully saved");
            setAssignments({});
            setAssignedMentors([]);
            fetchAssign();
        } catch (err) {
            console.log(err);
            setError("Data failed to save!");
        }
    }

    const handleRemoveStudent = (mentorId, student) => {
        setAssignments((prev) => {
            const updated = { ...prev };

            updated[mentorId] = updated[mentorId].filter(
                (s) => s.stud_id !== student.stud_id
            );

            if (updated[mentorId].length === 0) {
                delete updated[mentorId];
            }

            return updated;
        });

        setDataStudent((prev) => [...prev, student]);
    };

    const handleRemoveMentor = (mentor) => {

        // keluarkan semua student bawah mentor tu balik
        const mentorStudents = assignments[mentor.id] || [];

        setDataStudent((prev) => [
            ...prev,
            ...mentorStudents,
        ]);

        // buang mentor dari assigned mentor
        setAssignedMentors((prev) =>
            prev.filter((m) => m.id !== mentor.id)
        );

        // buang assignment mentor tu
        setAssignments((prev) => {
            const updated = { ...prev };
            delete updated[mentor.id];
            return updated;
        });

        // masukkan balik mentor ke available mentor table
        setDataMentor((prev) => [...prev, mentor]);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 mx-4">
                {/* HEADER */}
                <div className="border-b border-gray-200 pb-2 sm:pb-3 mb-5 flex flex-col sm:flex-row justify-between">
                    <h3 className="text-lg sm:text-xl lg:text-2xl flex items-end font-semibold text-gray-900">
                        Assign Mentee
                    </h3>
                    <div className="flex flex-row gap-2 items-center w-full sm:w-[300px]">
                        <input type="text" className="w-64 h-[30px] outline-none border-1 border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-gray-300 outline-none text-[10px] sm:text-[13px] " placeholder="search mentors or mentees" value={search} onChange={(e) => setSearch(e.target.value)} />

                        {/* dropdown mentor and mentee searching */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={handleSelected}
                                className="flex items-center justify-between w-20 h-8 px-1.5 sm:py-2 text-sm sm:text-[15px] font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <span>{selectRole}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                            </button>

                            {/* DROPDOWN MENU */}
                            {open && (
                                <div className="absolute w-[80px] top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden ">
                                    {roleOptions.map((item, index) => (
                                        <button
                                            key={`${item}-${index}`}
                                            type="button"
                                            onClick={() => {
                                                setSelectRole(item)
                                                setOpen(false)
                                            }}
                                            className=" w-full text-center flex flex col px-2 py-2.5 text-sm text-left text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-300 last:border-b-0"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* DRAG TABLES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
                    {/* STUDENT TABLE */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-[#02577A] text-white p-3 sm:p-4 sticky top-0 z-10">
                            <h4 className="text-xs sm:text-sm font-semibold">Available Mentees</h4>
                        </div>
                        <div className="h-64 sm:h-80 overflow-y-auto">
                            {dataStudent.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-400 text-sm">No students available</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <tbody>
                                        {filteredStudent.map((student) => (
                                            <DraggableStudent
                                                key={student.stud_id}
                                                student={student}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* MENTOR TABLE */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-[#02577A] text-white p-3 sm:p-4 sticky top-0 z-10">
                            <h4 className="text-xs sm:text-sm font-semibold">Available Mentors</h4>
                        </div>
                        <div className="h-64 sm:h-80 overflow-y-auto">
                            {dataMentor.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-400 text-sm">No mentors available</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <tbody>
                                        {filteredMentor.map((mentor) => (
                                            <DraggableMentor
                                                key={mentor.id}
                                                mentor={mentor}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
                        {error}
                    </div>
                )}

                {/* ASSIGNMENT SECTION */}
                <div className="border-t-2 border-gray-200 pt-6">
                    <div className="bg-[#02577A] text-white p-4 sm:p-5 rounded-t-lg mb-4">
                        <h3 className="text-sm sm:text-base font-semibold">Mentee to Mentor Assignments</h3>
                    </div>

                    <div className="mb-5">
                        <MentorDropZone
                            assignedMentors={assignedMentors}
                            assignments={assignments}
                            handleRemoveStudent={handleRemoveStudent}
                            handleRemoveMentor={handleRemoveMentor}
                        />
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="sm:w-40 p-2 sm:py-2.5 bg-[#02577A] hover:bg-[#024562] active:bg-[#023a4a] text-white font-semibold rounded-lg transition-colors text-[13px] sm:text-base"
                        >
                            Save Assignments
                        </button>
                    </div>
                </div>
            </div>
        </DndContext>
    )
}