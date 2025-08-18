// import React, { useState, useEffect } from 'react'
// import axios from "axios";

// const MemberSelector = ({ selectedStudents, setSelectedStudents, selectedTeachers, setSelectedTeachers, }) => {
//   const [studentInput, setStudentInput] = useState("");
//   const [teacherInput, setTeacherInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const [studentRes, teacherRes] = await Promise.all([
//           axios.get("http://localhost:4000/api/admin/account", { params: { role: "student" } }),
//           axios.get("http://localhost:4000/api/admin/account", { params: { role: "teacher" } }),
//         ]);

//         setStudents(studentRes.data || []);
//         setTeachers(teacherRes.data || []);

//         console.log("Fetched Students:", studentRes.data);
//         console.log("Fetched Teachers:", teacherRes.data);
//       } catch (error) {
//         console.error("Error fetching students and teachers:", error);
//       }
//     };

//     if (isOpen) {
//       fetchMembers();
//     }
//   }, [isOpen]);


//   return (
//     <div>
//       {
//         !isOpen && (
//           <div className='flex justify-center py-2'>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//               onClick={() => setIsOpen(true)}
//             >
//               Add Student and Teacher
//             </button>
//           </div>
//         )
//       }

//       {
//         isOpen && (
//           <div className='fixed inset-0 z-[60] flex justify-center items-center backdrop-blur-sm bg-black/40 '>
//             <div className='flex justify-center items-center bg-gray-100 w-[500px] h-[600px] rounded-2xl shadow-2xl p-4'>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Complete
//               </button>
//             </div>
//           </div>
//         )
//       }


//     </div>
//   )
// }

// export default MemberSelector
import React, { useState, useEffect } from 'react'
import axios from "axios";

const MemberSelector = ({
  selectedStudents,
  setSelectedStudents,
  selectedTeachers,
  setSelectedTeachers,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const [studentRes, teacherRes] = await Promise.all([
          axios.get("http://localhost:4000/api/admin/account", { params: { role: "student" } }),
          axios.get("http://localhost:4000/api/admin/account", { params: { role: "teacher" } }),
        ]);

        setStudents(studentRes.data || []);
        setTeachers(teacherRes.data || []);

        console.log("Fetched Students:", studentRes.data);
        console.log("Fetched Teachers:", teacherRes.data);
      } catch (error) {
        console.error("Error fetching students and teachers:", error);
      }
    };

    if (isOpen) fetchMembers();
  }, [isOpen]);

  return (
    <div>
      {!isOpen && (
        <div className='flex justify-center py-2'>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            Add Student and Teacher
          </button>
        </div>
      )}

      {isOpen && (
        <div className='fixed inset-0 z-[60] flex justify-center items-center backdrop-blur-sm bg-black/40'>
          <div className='bg-white w-[90%] max-w-[1200px] h-[650px] rounded-2xl shadow-2xl p-6 flex flex-col gap-4'>

            <h2 className="text-xl font-bold text-center">Select Members</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow overflow-hidden">
              {/* Khung 1: Danh sách học sinh */}
              <div className="border border-gray-300 rounded p-4 overflow-auto">
                <h3 className="font-semibold text-lg mb-2 text-center">All Students</h3>
                <ul className="text-sm space-y-1">
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <li key={index} className="hover:bg-blue-100 px-2 py-1 rounded cursor-pointer">
                        {student?.name || student?.Name || "Unnamed Student"}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No students found</li>
                  )}
                </ul>
              </div>

              {/* Khung 2: Học sinh đã chọn */}
              <div className="border border-gray-300 rounded p-4 overflow-auto">
                <h3 className="font-semibold text-lg mb-2 text-center">Selected Students</h3>
                <ul className="text-sm space-y-1">
                  {selectedStudents.length > 0 ? (
                    selectedStudents.map((student, index) => (
                      <li key={index} className="bg-green-100 px-2 py-1 rounded">
                        {student?.name || student?.Name || "Unnamed Student"}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No students selected</li>
                  )}
                </ul>
              </div>

              {/* Khung 3: Danh sách giáo viên */}
              <div className="border border-gray-300 rounded p-4 overflow-auto">
                <h3 className="font-semibold text-lg mb-2 text-center">All Teachers</h3>
                <ul className="text-sm space-y-1">
                  {teachers.length > 0 ? (
                    teachers.map((teacher, index) => (
                      <li key={index} className="hover:bg-blue-100 px-2 py-1 rounded cursor-pointer">
                        {teacher?.name || teacher?.Name || "Unnamed Teacher"}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No teachers found</li>
                  )}
                </ul>
              </div>

              {/* Khung 4: Giáo viên đã chọn */}
              <div className="border border-gray-300 rounded p-4 overflow-auto">
                <h3 className="font-semibold text-lg mb-2 text-center">Selected Teachers</h3>
                <ul className="text-sm space-y-1">
                  {selectedTeachers.length > 0 ? (
                    selectedTeachers.map((teacher, index) => (
                      <li key={index} className="bg-green-100 px-2 py-1 rounded">
                        {teacher?.name || teacher?.Name || "Unnamed Teacher"}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No teachers selected</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Nút complete */}
            <div className='flex justify-center'>
              <button
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default MemberSelector;


