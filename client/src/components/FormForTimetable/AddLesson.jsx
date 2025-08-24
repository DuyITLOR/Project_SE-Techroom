import React, { useState } from 'react'
import axios from 'axios';

const AddLesson = ({ ClassID, ClassName, ClassNumWeek, setIsOpen}) => {
    const timeSlot = {
        1: { start: "07:00", end: "09:00" },
        2: { start: "09:00", end: "11:00" },
        3: { start: "13:00", end: "15:00" },
        4: { start: "15:00", end: "17:00" },
        5: { start: "17:00", end: "19:00" },
    }

    const [lessons, setLessons] = useState(
        Array.from({ length: ClassNumWeek }, (_, i) => ({
            lesson: i + 1,
            date: "",
            session: "",
            room: "",
            available: [],
        }))
    )

    const handleChange = async (index, field, value) => {
        let updatedLessons = lessons.map((lesson, i) =>
            i === index ? { ...lesson, [field]: value, ...(field !== "room" ? { room: "" } : {}) } : lesson
        )

        const selected = updatedLessons[index];
        if (selected.date && selected.session) {
            console.log("Fetching available rooms for: ", selected.date, selected.session);
            try {
                const res = await axios.get("http://localhost:4000/api/admin/room/get-available", 
                {
                    params: {
                        date: selected.date,
                        sessionNumber: selected.session,
                    }
                }, 
            )
                console.log("Available rooms: ", res.data.availableRooms);

                const room = res.data.availableRooms || [];
                updatedLessons[index].available = room
            }
             catch (error) {
                console.error("Error fetching available rooms: ", error);
            }
            
        } else updatedLessons[index].available = []
        setLessons(updatedLessons);
    }

    const handleSave = async () => {
        try {
            const lessonDate = lessons.map((lesson) => ({
                classID: ClassID,
                date: lesson.date,
                sessionNumber: lesson.session,
                roomID: lesson.room
            }))
            console.log("Lesson Date: ", lessonDate);
            await axios.post("http://localhost:4000/api/admin/timetable/add-multiple-lessons", lessonDate)
            setIsOpen(false)
        }
        catch (err) {
            console.log("Error saving lessons: ", err);
        }
    }


    const isAllEnter = lessons.every(
        lesson => lesson.date && lesson.session && lesson.room
    )

    return (
        <div className='space-y-2 overflow-y-auto max-h-[700px]'>
            <h1 className='text-2xl font-semibold'>ClassID: {ClassID}</h1>
            <h2 className='text-xl text-gray-600'>ClassName: {ClassName}</h2>
            <h2 className='text-xl text-gray-600'>Num of week: {ClassNumWeek}</h2>

            {
                lessons.map((lesson, index) => (
                    <div
                        key={index}
                        className='border rounded-lg p-4 bg-gray-50 shadow-sm space-y-3'
                    >
                        <h3 className='font-semibold text-lg'>Buổi {lesson.lesson}</h3>
                        <div className='flex items-center gap-2'>
                            <label className='block text-xl text-gray-700'>Ngày: </label>
                            <input
                                type="Date"
                                value={lesson.date}
                                onChange={(e) => handleChange(index, "date", e.target.value)}
                                className='w-full border rounded p-2'
                            />
                        </div>

                        <div className='flex items-center gap-2'>
                            <label className='text-lg text-gray-700'>Giờ:</label>
                            <select
                                value={lesson.session}
                                onChange={(e) => handleChange(index, "session", e.target.value)}
                                className='w-full border rounded p-2'
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
                            lesson.date && lesson.session && (
                                <div className='flex items-center gap-2'>
                                    <label className='text-lg text-gray-700'>Phòng: </label>
                                    <select
                                        value={lesson.room}
                                        onChange={(e) => handleChange(index, "room", e.target.value)}
                                        className='w-full border rounded p-2'
                                    >
                                        <option value="">Chọn phòng</option>
                                        {lesson.available.map((room, idx) => (
                                            <option key={idx} value={room.RoomID}>
                                                {room.RoomID} - {room.RoomName}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            )
                        }


                    </div>
                ))
            }
            {
                isAllEnter && (
                    <div className='flex justify-end pt-3'>
                        <button
                            onClick={handleSave}
                            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                        >
                            Save
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default AddLesson