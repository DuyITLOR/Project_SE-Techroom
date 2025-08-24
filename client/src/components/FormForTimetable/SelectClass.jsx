import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { use } from 'react';

const SelectClass = ({onSelectClass}) => {
  const [classes, setClasses, setStep] = useState([]);


  const fetchClassEmpty = async () => {
    try {
        const res = await axios.get("http://localhost:4000/api/admin/timetable/classNotInTimetable")
        console.log("Classes not in timetable:", res.data);
        const list = res.data.results || []
        console.log("List: ", list)
        setClasses(list)
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  } 

    useEffect(() => {
        fetchClassEmpty();
    }, [])


  return (
   <div className='p-4 space-y-2 overflow-y-auto max-h-[700px]'>
        {
            classes.map((cls,index) => (
                <div key = {index}
                    onClick={() => onSelectClass(cls)}
                    className='cursor-pointer rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-all'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                        {cls.ClassID} - {cls.ClassName}
                    </h3>

                    <p>Số buổi học: {cls.ClassNumWeek}</p>
                </div>
            ))
        }
   </div>   
  )
}

export default SelectClass