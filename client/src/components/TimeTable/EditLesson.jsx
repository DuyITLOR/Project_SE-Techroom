import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SelectStudent from '../FormForClass/SelectStudent'
import SelectTeacher from '../FormForClass/SelectTeacher'

const EditLesson = ({ isEditOpen, setIsEditOpen, setIsOpen, lesson, listStudent, listTeacher }) => {
    const [formData, setFormData] = useState({
        classID: lesson.classID,
        date: lesson.date,
        roomID: lesson.roomID,
        sessionNumber: lesson.slot,
        listStudent: listStudent,
        ListTeacher: listTeacher,
    })

    const [roomAvailable, setRoomAvailable] = useState([])  

    const timeSlot = {
        1: { start: "07:00", end: "09:00" },
        2: { start: "09:00", end: "11:00" },
        3: { start: "13:00", end: "15:00" },
        4: { start: "15:00", end: "17:00" },
        5: { start: "17:00", end: "19:00" },

    }

    const handleChange = async () => {
        if (formData.date && formData.sessionNumber) {
            const res = await axios.get("http://localhost:4000/api/admin/room/get-available",
                {
                    params: {
                        date: formData.date,
                        sessionNumber: formData.sessionNumber,
                    }
                },)

            setRoomAvailable(res.data.availableRooms || []);
        }
    }

  
    useEffect(() => {
        setFormData({
            classID: lesson.classID,
            date: lesson.date,
            roomID: lesson.roomID,
            sessionNumber: lesson.slot,
            listStudent: (listStudent || []).map(student => student.UserID),
            listTeacher: (listTeacher || []).map(teacher => teacher.UserID),
        })
        
        console.log("Form data updated: ", formData);
    }, [isEditOpen])



    const handleSave = async () => {
        try {
            console.log("Form data before save: ", formData); 
            const body = {
                lessonID: lesson.lessonID,
                updatedInfo:  {
                    lessonData: {
                        classID: formData.classID,
                        date: formData.date,
                        sessionNumber: formData.sessionNumber,
                        roomID: formData.roomID,
                    },
                    studentIDs: formData.listStudent,
                    teacherIDs: formData.listTeacher,
                },
            }
            console.log("Body to send: ", body);
            const res =  await axios.put("http://localhost:4000/api/admin/timetable/update-lesson", body);
            console.log("Update response: ", res.data);
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating lesson: ", error);
        }
    }

    


    return (
        isEditOpen && (
            <div className='fixed inset-0 z-[60]'>
                <div className='absolute inset-0 bg-black/40'>
                    <div className='relative z-[61] mx-auto mt-16 w-[860px] max-w-[92vw] rounded-xl bg-white p-6 shadow-xl '>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl'>Chỉnh sửa thông tin buổi học của lớp: {lesson.classID}</h1>
                            <button onClick={() => (setIsEditOpen(false))}
                                className='text-xl'
                            >X</button>
                        </div>

                        <div className='flex flex-col justify-between mb-1 border-t pt-3'>
                            <div className='flex justify-start pt-2'>
                                <h2 className='text-lg text-gray-700 pr-2 w-24'>Ngày: </h2>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => {
                                        setFormData({ ...formData, date: e.target.value })
                                        handleChange()
                                    }}
                                    className='border rounded p-2 w-40'
                                />
                            </div>

                            <div className='flex justify-start pt-2'>
                                <label className='text-lg text-gray-700 pr-2 w-24'>Giờ:</label>
                                <select
                                    value={formData.sessionNumber}
                                    onChange={(e) => {
                                        setFormData({ ...formData, sessionNumber: e.target.value })
                                        handleChange()
                                    }}
                                    className='border rounded p-2 w-40'
                                >
                                    <option value="" >Chọn giờ</option>
                                    {Object.entries(timeSlot).map(([key, slot]) => (
                                        <option key={key} value={key}>
                                            {slot.start} - {slot.end}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {
                                formData.date && formData.sessionNumber && (
                                    <div className='flex items-center gap-2 pt-2'>
                                        <label className='text-lg text-gray-700 w-22'>Phòng: </label>
                                        <select
                                            value={formData.room}
                                            onChange={(e) => setFormData({ ...formData, roomID: e.target.value })}
                                            className='border rounded p-2 w-40'
                                        >
                                            <option value="">Chọn phòng</option>
                                            {roomAvailable.map((room, idx) => (
                                                <option key={idx} value={room.RoomID}>
                                                    {room.RoomID} - {room.RoomName}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                )
                            }

                            <div className='mt-4'>
                                <h2 className='text-xl font-semibold text-blue-600 mb-2'>Danh sách học sinh</h2>
                                <SelectStudent
                                    selectedStudent={formData.listStudent}
                                    onSelectChange={(newList) => setFormData({ ...formData, listStudent: newList })}
                                />
                            </div>

                            <div className='mt-4'>
                            <h2 className='text-xl font-semibold text-blue-600 mb-2'>Danh sách giáo viên</h2>
                                <SelectTeacher
                                    selectedTeacher={formData.listTeacher}
                                    onSelectChange={(newList) => setFormData({ ...formData, listTeacher: newList })}
                                />
                            </div>

                            <div className='flex justify-end pt-3'>
                                <button 
                                onClick={() => handleSave()}
                                className='bg-gray-200 text-xl text-shadow-neutral-50 border-1  text-gray-600 rounded-xl p-2'>Save</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    )
}

export default EditLesson