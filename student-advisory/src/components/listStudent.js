import { Search } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentList(){
    const [dataStudent, setDataStudent] = useState([]);
    const [searchStudent, setSearchStudent] = useState("")

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

    //filter search
    const filterStudent = dataStudent.filter((data) => (
        data.stud_name?.toLowerCase().includes(searchStudent.toLowerCase()) || data.stud_matric?.toString().includes(searchStudent.toString())
    ))

    return(
        <div className="bg-[#ffffff] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 md:mx-0 h-auto">
            <div className="w-full flex flex-row justify-between border-b-1 border-gray-300 py-2">
                <div className="w-full">
                  <h3 className="text-black text-[20px] font-semibold">List Student(Mentor)</h3>  
                </div>
                
                <div className="relative w-full flex justify-end">
                    <input type="text" placeholder="search name or matric..." className="w-[350px] shadow-sm h-[40px] py-2 pl-2 rounded-lg border-1 border-gray-200 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-300" value={searchStudent} onChange={(e) => setSearchStudent(e.target.value)} />
                    <Search className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-400"/>
                </div>
            </div>

            <div className="mt-5 overflow-x-auto">
                {!filterStudent || filterStudent.length === 0 ? (
                    <p> No data Student</p>
                ) : (
                    <table className="w-full table-auto mb-3">
                        <thead className="bg-[#02577A] ">
                            <tr className="text-center text-white">
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
                            {filterStudent.map((data) => (
                                <tr key={data.stud_matric} className="text-center border-b-1 border-gray-300 hover:bg-gray-100"> 
                                    <td className="text-sm px-2">{data.stud_matric}</td>
                                    <td className="text-sm max-w-[200px] truncate hover:whitespace-normal hover:overflow-visible px-2">{data.stud_name}</td>
                                    <td className="text-sm px-2">{data.gender}</td>
                                    <td className="text-sm px-2">{data.code_uum}</td>
                                    <td className="text-sm max-w-[150px] truncate px-2" title={data.academic_qualifications}>{data.academic_qualifications}</td>
                                    <td className="text-sm px-2">{data.pmk_masuk}</td>
                                    <td className="text-sm px-2">{data.band_muet}</td>
                                    <td className="text-sm px-2">{data.status_oku}</td>
                                    <td className="text-sm max-w-[150px] truncate px-2" title={data.disability_description}>{data.disability_description}</td>
                                    <td className="text-sm px-2">{data.inasis}</td>
                                    <td className="text-sm px-2">{data.no_phone}</td>
                                    <td className="text-sm max-w-[180px] truncate px-2" title={data.email_alternatif}>{data.email_alternatif}</td>
                                    <td className="text-sm max-w-[180px] truncate px-2" title={data.email_uum}>{data.email_uum}</td>
                                    <td className="text-sm max-w-[200px] truncate px-2" title={data.stud_address}>{data.stud_address}</td>
                                    <td className="text-sm px-2">{data.state}</td>
                                    <td className="text-sm px-2">{data.parent_income}</td>
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