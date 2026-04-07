"use client"

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Assigns(){
    const [dataMentor, setDataMentor] = useState([]);
    const [dataStudent, setDataStudent] = useState([]);
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: dataStudent.stud_matric,
        id: dataMentor.mentor_id
    });

    useEffect(() => {
        fetchAssign();
    }, []);

    const fetchAssign = async () => {
        try{
            const resMentor = await axios.get("/api/mentor");
            const resStudent = await axios.get("/api/student");
            setDataMentor(resMentor.data.rows);
            setDataStudent(resStudent.data.rows);
        }catch(err){
            console.log(err);
        }
    }
        /* ================= DRAGGABLE STUDENT ================= */
        function DraggableStudent({ student }) {
        const { attributes, listeners, setNodeRef, transform } =
            useDraggable({
            id: `student-${student.stud_matric}`,
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

        /* ================= DRAGGABLE Mentor ================= */
        function DraggableStudent({ mentor }) {
        const { attributes, listeners, setNodeRef, transform } =
            useDraggable({
            id: `mentor-${mentor.mentor_id}`,
            data: {
                type: "mentor",
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
            <td className="pl-2 py-2">{mentor.mentor_name}</td>
            </tr>
        );
        }

    return (
        <DndContext>
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
                        <p>No data student founded</p>
                    ) : (
                        <table className="table-auto h-[280px] w-full">
                        <thead className="bg-[#02577A]">
                            <tr>
                                <th className="text-white">Student Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataStudent.map((student) => {
                                return (
                                    <tr
                                        key={student.stud_matric}
                                        ref={setNodeRef}
                                        {...listeners}
                                        {...attributes}
                                        style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
                                        className="p-2 bg-white rounded shadow mb-2 cursor-grab border-b border-gray-300"
                                    >
                                        <td className="pl-2">{student.stud_name}</td>
                                        
                                    </tr>
                                );
                            })}
                        
                        </tbody>
                    </table>
                    )}
                </div>

                {/* mentor */}
                    <div className="w-full h-[300px] overflow-auto flex justify-center">
                        {dataMentor.length === 0 ? (
                            <p>No data Mentor founded</p>
                        ) : (
                            <table className="table-auto h-[280px] w-full">
                                    <thead className="bg-[#02577A]">
                                        <tr>
                                            <th className="text-white">Mentee Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataMentor.map((mentor) => {
                                                
                                        return (
                                            <tr
                                                key={mentor.mentor_id}
                                                ref={setNodeRef}
                                                {...listeners}
                                                {...attributes}
                                                style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
                                                className="p-2 bg-white rounded shadow mb-2 cursor-grab border-b border-gray-300"
                                                >
                                                <td className="pl-2">{mentor.mentor_name}</td>
                                                        
                                                </tr>
                                            );
                                        })}                                            
                                </tbody>
                            </table>
                        )}              
                </div>
                
                
            </div>
        </div>
        </DndContext>
    )
}