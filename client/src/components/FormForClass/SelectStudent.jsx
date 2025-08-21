import React, { useEffect, useState } from 'react'
import axios from "axios";


const SelectStudent = ({ selectedStudent, onSelectChange }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [students ,setStudents] = useState([]);

    const toggleStudent = (studentId) => {
        const newStudent = selectedStudent.includes(studentId)
            ? selectedStudent.filter(id => id !== studentId) :
            [...selectedStudent, studentId];
        onSelectChange?.(newStudent);
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/admin/account", {
                    params: { role: "student" }
                });
                const list = res.data.listUsers || [];
                // console.log("Fetched students: ", list);
                const formatted = list.map((items) => (
                    {
                        UserID: items.UserID || "N/A",
                        FullName: items.FullName || "N/A",
                    }
                ))
                // console.log("Formatted : ", formatted); 
                setStudents(formatted);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents()
    }, [selectedStudent])

    
    return (
        <div>
            <div className='space-y-2'>
                <div className='flex flex-wrap gap-2' >
                    {
                        selectedStudent.map((id) => {
                            const student = students.find((s) => s.UserID === id)
                            return (
                                <span
                                    key={id}x
                                    className="bg-blue-100"
                                >
                                    {student?.FullName}
                                </span>
                            )
                        })
                    }
                </div>

                <button
                    type='button'
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-left border p-2 rounded w-full'
                >
                    {selectedStudent.length > 0 ? `Đã chọn ${selectedStudent.length} học sinh` : "Chọn học sinh"}
                </button>


                {
                    isOpen &&
                    (
                        <div className='border rounded-xl shadow max-h-60 overflow-y-auto'>
                            {
                                students.map((student) => (
                                    <div
                                        key={student.UserID }
                                        onClick={() => toggleStudent(student.UserID)}
                                        className={`p-3 border-b last:border-0 cursor-pointer ${selectedStudent.includes(student.UserID)
                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <div className='font-medium'>{student.FullName}</div>
                                                <div className='text-sm text-gray-500'>{student.UserID}</div>
                                            </div>

                                            <div>
                                                { (selectedStudent.includes(student.UserID)) && (
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white border-2 rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SelectStudent