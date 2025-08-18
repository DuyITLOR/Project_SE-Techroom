import React, { useEffect, useState } from 'react'
import axios from "axios";


const SelectCourse = ({ selectedCourse, onSelectChange }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [courses, setCourse] = useState([]);

 

    const toggleCourse = (courseId) => {
        const newCourse = selectedCourse === courseId ? "" : courseId
        onSelectChange(newCourse)
        setIsOpen(false)
    }

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/admin/course");
                const list = res.data.listUsers || [];
                const formatted = list.map((items) => (
                    {
                        id: items.CourseID || "N/A",
                        name: items.CourseName || "N/A",
                    }
                ))
                setCourse(formatted);
            } catch (error) {
                console.error("Error fetching Course:", error);
            }
        };
        fetchCourse()
    }, [])

    const selected = courses.find(course => course.id === selectedCourse);


    return (
        <div>
            <div className='space-y-2'>

                <button
                    type='button'
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-left border p-2 rounded w-full'
                >
                    {selected ? selected.name : "Chọn khóa học"}
                </button>

                {
                    isOpen &&
                    (
                        <div className='border rounded-xl shadow max-h-60 overflow-y-auto'>
                            {
                                courses.map((course) => (
                                    <div
                                        key={course.id}
                                        onClick={() => toggleCourse(course.id)}
                                        className={`p-3 border-b last:border-0 cursor-pointer ${selectedCourse === course.id
                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <div className='font-medium'>{course.name}</div>
                                                <div className='text-sm text-gray-500'>{course.id}</div>
                                            </div>

                                            <div>

                                                {selected === course.id && (
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

export default SelectCourse