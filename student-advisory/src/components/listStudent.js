import { Search } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentList(){
    const [dataStudent, setDataStudent] = useState([])
    useEffect(() => {
        fetchDataStudent();
    }, []);

    const fetchDataStudent = async () => {
        try{
          const res = await axios.get("/api/student");  
          console.log(res.data);
          setDataStudent(res.data.rows);
        }catch(err){
            console.log(err);
        }
        
    }
    return(
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0 h-auto">
            <div className="w-full flex flex-row justify-between border-b-1 border-gray-300 py-2">
                <div className="w-full">
                  <h3 className="text-black text-[20px] font-semibold">List Student(Mentor)</h3>  
                </div>
                
                <div className="relative w-full flex justify-end">
                    <input type="text" placeholder="search..." className="w-[350px] shadow-sm h-[40px] py-2 pl-2 rounded-lg border-1 border-gray-200 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300"/>
                    <button className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer">
                        <Search className="text-gray-400"/>
                    </button>
                </div>
            </div>

            <div className="mt-2 overflow-x-auto">
                {!dataStudent || dataStudent.length === 0 ? (
                    <p> No data Student</p>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-300">
                            <tr className="text-center">
                                <th className="px-2 py-2 text-sm">Matric</th>
                                <th className="px-2 py-2 text-sm">Name</th>
                                <th className="px-2 py-2 text-sm">Gender</th>
                                <th className="px-2 py-2 text-sm">Code UUM</th>
                                <th className="px-2 py-2 text-sm">Academic Qualifications</th>
                                <th className="px-2 py-2 text-sm">PMK Entry</th>
                                <th className="px-2 py-2 text-sm">Band Muet</th>
                                <th className="px-2 py-2 text-sm">Status OKU</th>
                                <th className="px-2 py-2 text-sm">Disabilities Description</th>
                                <th className="px-2 py-2 text-sm">Inasis</th>
                                <th className="px-2 py-2 text-sm">No Phone</th>
                                <th className="px-2 py-2 text-sm">Email Alternatif</th>
                                <th className="px-2 py-2 text-sm">Email UUM</th>
                                <th className="px-2 py-2 text-sm">Address</th>
                                <th className="px-2 py-2 text-sm">State</th>
                                <th className="px-2 py-2 text-sm">Parent Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataStudent.map((data) => (
                                <tr key={data.stud_matric} className="text-center border-b-border-gray-300"> 
                                    <td className="text-sm">{data.stud_matric}</td>
                                    <td className="text-sm">{data.stud_name}</td>
                                    <td className="text-sm">{data.gender}</td>
                                    <td className="text-sm">{data.code_uum}</td>
                                    <td className="text-sm">{data.academic_qualifications}</td>
                                    <td className="text-sm">{data.pmk_masuk}</td>
                                    <td className="text-sm">{data.band_muet}</td>
                                    <td className="text-sm">{data.status_oku}</td>
                                    <td className="text-sm">{data.disability_description}</td>
                                    <td className="text-sm">{data.inasis}</td>
                                    <td className="text-sm">{data.no_phone}</td>
                                    <td className="text-sm">{data.email_alternatif}</td>
                                    <td className="text-sm">{data.email_uum}</td>
                                    <td className="text-sm">{data.stud_address}</td>
                                    <td className="text-sm">{data.state}</td>
                                    <td className="text-sm">{data.parent_income}</td>
                                </tr>
                            ))}
                        </tbody>
                 </table>
                )
                }
                
            </div>

        </div>
    )
}