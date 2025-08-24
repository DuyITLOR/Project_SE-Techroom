import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditLesson from './EditLesson';

const LessonDetail = ({ isOpen, setIsOpen, lesson, setReload}) => {
    const [listStudent, setListStudent] = useState([]);
    const [listTeacher, setListTeacher] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const timeSlot = {
        1: { start: "07:00", end: "09:00" },
        2: { start: "09:00", end: "11:00" },
        3: { start: "13:00", end: "15:00" },
        4: { start: "15:00", end: "17:00" },
        5: { start: "17:00", end: "19:00" },
    }

    const fetchInfoOfClass = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/admin/timetable/lessonInfo", {
                params: { lessonID: lesson.lessonID }
            })

            const list = res.data.lesson || []
            console.log("partipate of class: ", list);
            setListTeacher(list.teacherList || []);
            setListStudent(list.studentList || []);
            // console.log("list teacher of class: ", list.teacherList);
            // console.log("list student of class: ", list.studentList);
        } catch (error) {
            console.error("Error fetching teacher of class:", error);
        }
    }

    useEffect(() => {
        fetchInfoOfClass();
    }, [lesson, isOpen])


    return (
        isOpen && (
            <div className='fixed inset-0 z-[60]'>
                <div className='absolute inset-0 bg-black/40'>
                    <div className='relative z-[61] mx-auto mt-16 w-[860px] max-w-[92vw] rounded-xl bg-white p-6 shadow-xl'>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl'>Thông tin chi tiết của lớp: {lesson.classID}</h1>
                            <button onClick={() => (setIsOpen(false))}
                                className='text-xl'
                            >X</button>
                        </div>
                        <div className='flex flex-col justify-between mb-1 border-t pt-3'>
                            <h2 className='text-xl font-semibold text-gray-800'>Phòng: {lesson.roomID}</h2>
                            <h2 className='text-xl font-semibold text-gray-800'>Ngày: {lesson.date}</h2>
                            <h2 className='text-xl font-semibold text-gray-800'>Giờ: {timeSlot[lesson.slot].start} - {timeSlot[lesson.slot].end}</h2>
                        </div>

                        <div className='mt-4'>
                            <h2 className='text-2xl font-semibold text-blue-600 mb-2'>Danh sách giáo viên</h2>
                            {
                                listTeacher.length > 0 ? (
                                    <ul className='space-y-2 max-h-32 overflow-y-auto'>
                                        {
                                            listTeacher.map((teacher, index) => (
                                                <div>
                                                    <li key={index}
                                                        className='p-2 bg-blue-50 rounded-lg border border-blue-200 flex justify-between items-center'
                                                    >
                                                        <span className='front-medium'>{teacher.FullName}</span>
                                                        <span className='text-sm text-gray-600 italic'>{teacher.UserID}</span>
                                                    </li>
                                                </div>
                                            ))
                                        }
                                    </ul>
                                ) : (<p className='text-gray-500 italic'>Không có giáo viên</p>)
                            }

                            <h2 className='text-2xl font-semibold text-blue-600 mb-2 pt-3.5'>Danh sách học sinh</h2>
                            {
                                listStudent.length > 0 ? (
                                    <ul className='space-y-2 max-h-80 overflow-y-auto '>
                                        {
                                            listStudent.map((student, index) => (
                                                <div>
                                                    <li key={index}
                                                        className='p-2 bg-blue-50 rounded-lg border border-blue-200 flex justify-between items-center'
                                                    >
                                                        <span className='front-medium'>{student.FullName}</span>
                                                        <span className='text-sm text-gray-600 italic'>{student.UserID}</span>
                                                    </li>
                                                </div>
                                            ))
                                        }
                                    </ul>
                                ) : (<p className='text-gray-500 italic'>Không có học sinh</p>)
                            }
                        </div>

                        <div className='flex justify-end pt-5'>
                            <button
                                onClick={() => setIsEditOpen(true)}
                            >
                                <p className='bg-gray-200 text-xl text-shadow-neutral-50 border-1  text-gray-600 rounded-xl p-2'>Edit</p>
                            </button>
                        </div>

                        <EditLesson
                            isEditOpen={isEditOpen}
                            setIsEditOpen={setIsEditOpen}
                            setIsOpen={setIsOpen}
                            setReload ={setReload}
                            lesson={lesson}
                            listStudent={listStudent}
                            listTeacher={listTeacher}
                        />
                    </div>

                </div>
            </div>
        )
    )
}

export default LessonDetail