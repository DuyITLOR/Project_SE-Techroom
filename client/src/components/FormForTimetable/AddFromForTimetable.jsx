import React, { useState, useEffect } from 'react'
import TimetableIcon from "../../assets/calendar.svg?react";
import SelectClass from './SelectClass';
import AddLesson from './AddLesson';

const AddFromForTimetable = ({ isOpen, setIsOpen}) => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [selectedClass, setSelectedClass] = useState(null);

    const [formData, setFormData] = useState({
        classID: "",
        className: "",
        ListLesson: [],
    })

    useEffect(() => {
        setStep(1)
    }, [isOpen]);



    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleClassSelection = (selectedClass) => {
        setFormData(prev => ({ ...prev, selectedClass }));
        console.log("Updated formData for class:", selectedClass);
    }

    const handleRoomSelection = (selectedRoom) => {
        setFormData(prev => ({ ...prev, selectedRoom }));
        console.log("Updated formData for teacher:", selectedRoom);
    }



    return (
        isOpen && (
            <div className='fixed inset-0 z-[60]'>
                <div className="absolute inset-0 bg-black/40">
                    {
                        step === 1 && (
                            <div className='relative z-[61] mx-auto mt-16 w-[860px] max-w-[92vw] rounded-xl bg-white p-6 shadow-xl'>
                                <div className='flex justify-between mb-1 border-b pb-3'>
                                    <div className='flex pl-1.5 gap-1'>
                                        <TimetableIcon className='w-8 h-8' />
                                        <h2 className='text-3xl'>Các lớp chưa được gán</h2>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} 
                                    className='ml-2 border border-gray-400 rounded px-2 py-1 hover:bg-gray-100'>X</button>
                                </div>
                                <div>
                                    <SelectClass
                                        onSelectClass={(cls) => {
                                            setSelectedClass({
                                                ClassID: cls.ClassID,
                                                ClassName: cls.ClassName,
                                                ClassNumWeek: cls.ClassNumWeek
                                            })

                                            console.log("Selected class:", cls);
                                            setStep(2);
                                        }} />
                                </div>
                            </div>
                        )
                    }


                    {
                        step === 2 && (
                            <div className='relative z-[61] mx-auto mt-16 w-[860px] max-w-[92vw] rounded-xl bg-white p-6 shadow-xl'>
                                <div className='flex justify-between mb-1 border-b pb-3'>
                                    <div className='flex pl-1.5 gap-1'>
                                        <TimetableIcon className='w-8 h-8' />
                                        <h2 className='text-3xl'>Thêm thông tin buổi học</h2>
                                    </div>
                                    <div className='pl-2'>
                                        <button onClick={() => setStep(1)}
                                            className='ml-2 border border-gray-400 rounded px-2 py-1 hover:bg-gray-100'>Back</button>
                                        <button onClick={() => setIsOpen(false)}
                                            className='ml-2 border border-gray-400 rounded px-2 py-1 hover:bg-gray-100'>X</button>
                                    </div>
                                </div>
                                <div>
                                        <AddLesson
                                            ClassID={selectedClass?.ClassID}
                                            ClassName={selectedClass?.ClassName}
                                            ClassNumWeek={selectedClass?.ClassNumWeek}
                                        />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    )
}

export default AddFromForTimetable