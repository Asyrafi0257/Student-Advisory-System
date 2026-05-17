"use client"

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { X } from "lucide-react";
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
            className="cursor-grab border-b"
        >
            <td className="pl-2 py-2">{student.stud_name}</td>
        </tr>
    );
}

//mentor boleh dragged
function DraggableMentor({ mentor }) {
    //useDraggable => hook dari dnd-kit untuk jadikan element boleh drag
    //attributes => props khas untuk accesibility(nk kasi faham screen reader bahawa element tu untuk drag)
    //listeners => event handler untuk drag(mouse, touch) -> cth : onMouseDown, onTouchStart
    //setNodeRef => function untuk "register" element DOM ke sistem drag(dnd kit)
    //transform => position semasa drag(x, y) => digunakan untuk gerakkan element secara visual
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({
            id: `mentor-${mentor.id}`,
            data: {
                type: "mentor",
                mentor,
            },
        });

    // nak buat item tu boleh gerak(movement)
    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        // ref digunakan untuk akses element DOM secara direct
        // spread operator(...) => maksudnya ambil semua isi dalam object
        <tr
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="cursor-grab border-b"
        >
            <td className="pl-2 py-2">{mentor.mentor_name}</td>
        </tr>
    );
}
//kawasan drop mentor
function MentorDropZone({ assignedMentors, assignments, handleRemoveStudent }) {
    //useDroppable => hook daripada dnd-kit untuk dijadikan kawasan ni boleh drop
    //isOver => detect bila item tengah hover drag ke drop zone
    const { setNodeRef, isOver } = useDroppable({ id: "mentor-drop-zone" });

    return (
        <div ref={setNodeRef} className={`border border-gray-300 p-2 w-full ${isOver ? "bg-green-100" : ""}`}>
            <h3 className="font-semibold mb-2">Mentor Table</h3>
            {assignedMentors.length === 0 && <p className="text-gray-500">Drag mentors here</p>}
            {assignedMentors.map((mentor) => (
                <div key={mentor.id} className="border-t-1 border-gray-300 p-2 mb-2 bg-gray-100 rounded flex flex-row ">
                    <div className="border-r-2 border-gray-300 w-full flex items-center justify-center">
                        <strong>{mentor.mentor_name}</strong>
                    </div>

                    <div className="flex justify-center w-full mx-3">
                        <MenteeDropZone
                            mentor={mentor}
                            assignedStudents={assignments[mentor.id] || []}
                            handleRemoveStudent={handleRemoveStudent}
                        />
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
            className={`w-full mt-2 p-2 rounded ${isOver ? "bg-blue-100" : "bg-white"}`}
        >
            {assignedStudents.length === 0 ? (
                <p className="text-gray-500">Drop students here</p>
            ) : (
                <table className="table-auto w-full">
                    <tbody>
                        {assignedStudents.map((student) => (
                            <tr key={student.stud_id} className="border-b-1 border-gray-300">
                                <td className="pl-2 py-1">
                                    <ul className="list-disc px-3">
                                        <li className="flex justify-between items-center ">
                                            {student.stud_name}

                                            <button
                                                onClick={() => handleRemoveStudent(mentor.id, student)}
                                                className="text-white bg-[#ff0000] rounded-lg font-bold ml-2 mt-1 cursor-pointer"
                                            >
                                                <X />
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default function Assigns() {
    const [dataMentor, setDataMentor] = useState([]);
    const [dataStudent, setDataStudent] = useState([]);
    const [error, setError] = useState("");

    // simpan assign: mentor_id → [students]
    const [assignments, setAssignments] = useState({});
    const [assignedMentors, setAssignedMentors] = useState([]);



    useEffect(() => {
        fetchAssign();
    }, []);

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
            setError("Student cannot drop at  Mentor Table!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        // Drag mentor → mentor table
        if (dragged.type === "mentor" && over.id === "mentor-drop-zone") {
            const mentor = dragged.mentor;

            if (!assignedMentors.find((m) => m.id === mentor.id)) {
                setAssignedMentors((prev) => [...prev, mentor]);

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
                setError("Mentee only can be assigned 10 mentee");
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
            //clear UI
            setAssignments({});
            setAssignedMentors([]);

            //refresh balik data
            fetchAssign();
        } catch (err) {
            console.log(err);
            setError("Data failed to saved!");
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

        // masukkan balik ke list student
        setDataStudent((prev) => [...prev, student]);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0 h-auto mt-3">
                <div className="flex flex-row w-full border-b-1 border-gray-300 justify-between py-2">
                    <div className="mb-2 w-full">
                        <h3 className="text-[20px] font-semibold">Assign Mentee</h3>
                    </div>
                </div>

                <div className="flex flex-cols mt-5 w-full items-center gaps-2">
                    {/* mentee table */}
                    <div className="w-full h-[300px] overflow-auto flex justify-center">
                        {dataStudent.length === 0 ? (
                            <p>No student available</p>
                        ) : (
                            <table className="table-auto h-[280px] w-full">
                                <thead className="bg-[#02577A] sticky top-0 z-10 shadow-md">
                                    <tr>
                                        <th className="text-white">Student</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dataStudent.map((student) => (
                                        <DraggableStudent
                                            key={student.stud_id}
                                            student={student}
                                        />
                                    ))}


                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* mentor */}
                    <div className="w-full h-[300px] overflow-auto flex justify-center">
                        {dataMentor.length === 0 ? (
                            <p>No mentor available</p>
                        ) : (
                            <table className="table-auto h-[280px] w-full">
                                <thead className="bg-[#02577A] sticky top-0 z-10 shadow-md">
                                    <tr>
                                        <th className="text-white">Mentor</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dataMentor.map((mentor) => (
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

                <div className="border-b-2 border-gray-300 mt-10"></div>


                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mb-3 mt-5">
                        {error}
                    </div>
                )}

                <div className="w-full mt-5">
                    <div className="w-full flex justify-center text-white bg-[#02577A] p-2">
                        <h3>Mentee to Mentor</h3>
                    </div>

                    <div className="w-full flex flex-row justify-between mt-3">
                        <MentorDropZone
                            assignedMentors={assignedMentors}
                            assignments={assignments}
                            handleRemoveStudent={handleRemoveStudent}
                        />
                    </div>
                    <div className="mt-3 flex justify-end w-full pr-5">
                        <button className="w-32 h-[30px] bg-[#02577A] rounded-xl text-white cursor-pointer" onClick={handleSave}>Save</button>
                    </div>

                </div>
            </div>
        </DndContext>
    )
}