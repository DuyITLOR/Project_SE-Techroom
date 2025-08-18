import React, { useEffect, useState } from 'react'
import axios from "axios";


const SelectTeacher = ({ selectedTeacher, onSelectChange }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [teachers ,setTeachers] = useState([]);

    const toggleTeacher = (teacherId) => {
        const newTeacher = selectedTeacher.includes(teacherId)
            ? selectedTeacher.filter(id => id !== teacherId) :
            [...selectedTeacher, teacherId];
        onSelectChange(newTeacher);
    }

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/admin/account", {
                    params: { role: "teacher" }
                });
                const list = res.data.listUsers || [];
                const formatted = list.map((items) => (
                    {
                        id: items.UserID || "N/A",
                        name: items.FullName || "N/A",
                    }
                ))
                setTeachers(formatted);
            } catch (error) {
                console.error("Error fetching Teachers:", error);
            }
        };
        fetchTeachers()
    }, [])


    return (
        <div>
            <div className='space-y-2'>
                <div className='flex flex-wrap gap-2' >
                    {
                        selectedTeacher.map((id) => {
                            const teacher = teachers.find((s) => s.id === id)
                            return (
                                <span
                                    key={id}
                                    className="bg-blue-100"
                                >
                                    {teacher.name}
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
                    {selectedTeacher.length > 0 ? `Đã chọn ${selectedTeacher.length} giáo viên` : "Chọn giáo viên"}
                </button>


                {
                    isOpen &&
                    (
                        <div className='border rounded-xl shadow max-h-60 overflow-y-auto'>
                            {
                                teachers.map((teacher) => (
                                    <div
                                        key={teacher.id}
                                        onClick={() => toggleTeacher(teacher.id)}
                                        className={`p-3 border-b last:border-0 cursor-pointer ${selectedTeacher.includes(teacher.id)
                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <div className='font-medium'>{teacher.name}</div>
                                                <div className='text-sm text-gray-500'>{teacher.id}</div>
                                            </div>

                                            <div>
                                                {selectedTeacher.includes(teacher.id) && (
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

export default SelectTeacher