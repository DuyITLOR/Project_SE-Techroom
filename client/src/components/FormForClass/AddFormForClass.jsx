import React, { useState } from 'react'
import SelectStudent from './SelectStudent'
import SelectTeacher from './SelectTeacher'
import SelectCourse from './SelectCourse'



const AddFormForClass = () => {

  const [formData, setFormData] = useState({
    classID: "",
    className: "",
    lessonPerWeek: "",
    classNumWeek: "",
    beginDate: "",
    endDate: "",
    courseID: "",
    selectedTeachers: [],
    selectedStudents: [],
  })

  const handleInputChange = (e) => {
    e.preventDefault
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
  }


  const handleStudentSelection = (selectedStudents) => {
    setFormData(prev => ({ ...prev, selectedStudents}));
    console.log("Updated formData for student:", selectedStudents);
  }

  const handleTeacherSelection = (selectedTeachers) => {
    setFormData(prev => ({ ...prev, selectedTeachers}));
    console.log("Updated formData for teacher:", selectedTeachers);
  }

  const handleCourseSelection = (courseID) => {
    setFormData(prev => ({ ...prev, courseID}));
    console.log("Updated formData for course:", formData.courseID);
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm '>
      <div className='flex flex-col bg-[#E5E7EB] w-1/4 h-fit px-4 py-4 border-2 rounded-[8px] gap-2 max-h-[800px] overflow-y-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center '>
          <div>
            <div className='pt-2'>
              <div className='mb-1 font-medium'>ClassID</div>
              <input type="text"
                id="classID"
                label="Class ID"
                placeholder='Enter the classID'
                value={formData.classID}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>


            <div className='pt-2'>
              <div className='mb-1 font-medium'>ClassName</div>
              <input type="text"
                id="className"
                label="ClassName"
                placeholder='Enter the className'
                value={formData.className}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>


            <div className='pt-2'>
              <div className='mb-1 font-medium'>LessonPerWeek</div>
              <input type="text"
                id="lessonPerWeek"
                label="lessonPerWeek"
                placeholder='Enter the lesson per week'
                value={formData.lessonPerWeek}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className='pt-2'>
              <div className='mb-1 font-medium'>ClassNumWeek</div>
              <input type="text"
                id="classNumWeek"
                label="classNumWeek"
                placeholder='Enter the class per week'
                value={formData.classNumWeek}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className='pt-2'>
              <div className='mb-1 font-medium'>BeginDate</div>
              <input type="date"
                id="beginDate"
                label="beginDate"
                placeholder='Enter the begin date'
                value={formData.beginDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>


            <div className='pt-2'>
              <div className='mb-1 font-medium'>EndDate</div>
              <input type="date"
                id="endDate"
                label="endDate"
                placeholder='Enter the end date'
                value={formData.endDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>


            <div className='pt-2'>
              <div className='mb-1 font-medium'>CourseID</div>
              <SelectCourse
                selectedCourse={formData.courseID}
                onSelectChange={handleCourseSelection}
              />
            </div>



            <div className='pt-2'>
              <div className='mb-1 font-medium'>Danh sách học sinh  </div>
              <SelectStudent
                selectedStudent={formData.selectedStudents}
                onSelectChange={handleStudentSelection}
              />
            </div>


            <div className='pt-2'>
              <div className='mb-1 font-medium'>Danh sách giáo viên </div>
              <SelectTeacher
                selectedTeacher={formData.selectedTeachers}
                onSelectChange={handleTeacherSelection}
              />
            </div>
          </div>

        </form>
      </div>

    </div>
  )
}

export default AddFormForClass