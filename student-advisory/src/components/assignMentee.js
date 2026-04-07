"use client"

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import axios from "axios";

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
        function DraggableMentor({ mentor }) {
        const { attributes, listeners, setNodeRef, transform } =
            useDraggable({
            id: `mentor-${mentor.mentor_id}`,
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
            className="cursor-grab border-b"
            >
            <td className="pl-2 py-2">{mentor.mentor_name}</td>
            </tr>
        );
        }

        /* ================= DROPPABLE MENTOR ================= */
        function MentorRow({ mentor}) {
        const { setNodeRef, isOver } = useDroppable({
            id: `mentor-${mentor.mentor_id}`,
            data: {
            type: "mentor",
            mentor,
            },
        });

        return (
            <tr
            ref={setNodeRef}
            className={`border-b ${
                isOver ? "bg-green-200" : ""
            }`}
            >
            
            </tr>
        );
        }

        /* ================= DROPPABLE MENTEE ================= */
        function MenteeRow({ mentee}) {
        const { setNodeRef, isOver } = useDroppable({
            id: `mentee-${mentee.stud_id}`,
            data: {
            type: "mentee",
            mentee,
            },
        });

        return (
            <tr
            ref={setNodeRef}
            className={`border-b ${
                isOver ? "bg-green-200" : ""
            }`}
            >
            
            </tr>
        );
        }


export default function Assigns(){
    const [dataMentor, setDataMentor] = useState([]);
    const [dataStudent, setDataStudent] = useState([]);
    
    // simpan assign: mentor_id → [students]
    const [assignments, setAssignments] = useState({});

    

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

     /* ================= HANDLE DROP ================= */
  const handleDragEnd = (event) => {
    //active => item yang kita drag
    //over => tempat yang kita drop
    const { active, over } = event;

    //kalo user drop luar daripada dropzone, ia terus stop
    if (!over) return;

    //ambi data daripada dnd-kit
    const dragged = active.data.current; //daripada useDragged
    const dropped = over.data.current; //daripada useDropped

    // hanya allow student → mentor
    if (
      dragged.type === "student" &&
      dropped.type === "student"
    ) {
      //ambil object sebenar
      const student = dragged.student;
      //const mentor = dropped.mentor;

      // update state assignment
      setAssignments((prev) => {
        const prevStudent = prev[student.stud_matric] || [];

        return {
          ...prev,
          [student.stud_matric]: [...prevStudent, student],
        };
      });

      // buang student dari list asal
      setDataStudent((prev) =>
        prev.filter(
          (s) => s.stud_matric !== student.stud_matric
        )
      );

      console.log(
        "Assign:",
        student.stud_name,
        "→",
        mentor.mentor_name
      );

      // OPTIONAL: save DB
      // axios.post("/api/assign", {
      //   student_id: student.stud_matric,
      //   mentor_id: mentor.mentor_id,
      // });
    } else if( dragged.type === "mentor" && dropped.type ==="mentor"){
        //ambil object sebenar
        const mentor = dropped.mentor;

      // update state assignment
      setAssignments((prev) => {
        const prevStudent = prev[student.stud_matric] || [];

        return {
          ...prev,
          [student.stud_matric]: [...prevStudent, student],
        };
      });

      // buang student dari list asal
      setDataStudent((prev) =>
        prev.filter(
          (s) => s.stud_matric !== student.stud_matric
        )
      );

      console.log(
        "Assign:",
        student.stud_name,
        "→",
        mentor.mentor_name
      );
      }
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
                        <p>No data student founded</p>
                    ) : (
                        <table className="table-auto h-[280px] w-full">
                        <thead className="bg-[#02577A]">
                            <tr>
                                <th className="text-white">Student Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                 {dataStudent.map((student) => (
                                    <DraggableStudent
                                    key={student.stud_matric}
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
                            <p>No data Mentor founded</p>
                        ) : (
                            <table className="table-auto h-[280px] w-full">
                                    <thead className="bg-[#02577A]">
                                        <tr>
                                            <th className="text-white">Mentee Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                             {dataMentor.map((mentor) => (
                                                <DraggableMentor
                                                key={mentor.mentor_id}
                                                mentor={mentor}
                                                />
                                            ))}
                                        
                                           
                                        
                                                                             
                                </tbody>
                            </table>
                        )}              
                </div>
            </div>

            <div className="border-b-2 border-gray-300 mt-5"></div>

            <div className="w-full mt-5">
                <div className="w-full flex justify-center text-white bg-[#02577A] p-2">
                    <h3>Mentee to Mentor</h3>
                </div>
                <div className="w-full flex flex-row justify-between mt-3">
                    
                </div>

            </div>
        </div>
        </DndContext>
    )
}