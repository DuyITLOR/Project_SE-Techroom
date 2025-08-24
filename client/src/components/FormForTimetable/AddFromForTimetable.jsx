import React, { useState } from 'react'
import TimetableIcon from "../../assets/calendar.svg?react";
import SelectClass from './SelectClass';
    
const AddFromForTimetable = ({ isOpen, setIsOpen }) => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        classID: "",
        className: "",
        ListLesson: [],
    })



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
                    <div className='relative z-[61] mx-auto mt-16 w-[860px] max-w-[92vw] rounded-xl bg-white p-6 shadow-xl'>
                        <div className='flex justify-between mb-1 border-b pb-3'>
                            <div className='flex pl-1.5 gap-1'>
                                <TimetableIcon className='w-8 h-8' />
                                <h2 className='text-3xl'>Các lớp chưa được gán</h2>
                            </div>
                            <button onClick={() => setIsOpen(false)} className='pr-1'>x</button>
                        </div>

                        {
                            step === 1 && (
                                <div>
                                    <SelectClass/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    )
}

export default AddFromForTimetable