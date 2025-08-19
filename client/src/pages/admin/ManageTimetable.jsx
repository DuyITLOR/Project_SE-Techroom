import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import TimetableIcon from "../../assets/calendar.svg?react";
import Plus from "../../assets/plus.svg?react";
import axios from "axios";
import ConfirmPopup from "../../components/Table/ConfirmPopup";
import AddForm from "../../components/MemberSelector";
import TimetableGrid from "../../components/TimeTable/TimetableGrid.jsx";

const ManageTimetable = () => {
  const [activate, setActivate] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEdtitData] = useState(null);

  const Columns = [
    "courseID",
    "courseName",
    "courseNumber",
    "syllabus",
    "equipment",
  ];

  const events = [
    {
      date: "2025-08-11",
      slot: 1,
      classID: "CL001",
      roomName: "Phòng 11B",
      lecturer: "Lê Nhựt Duy",
    },
    {
      date: "2025-08-12",
      slot: 3,
      classID: "CL002",
      roomName: "Phòng 11C",
      lecturer: "Đặng Thương",
    },
  ];

  const addFields = [
    {
      label: "ClassID",
      name: "ClassID",
      type: "text",
      placeholder: "Enter your class ID",
    },
    {
      label: "Room Name",
      name: "RoomName",
      type: "text",
      placeholder: "Enter your room name",
    },
    {
      label: "Time for first lesson of week",
      name: "TimeForFirstLesson",
      type: "number",
      placeholder: "Enter your time for first lesson",
    },
    {
      label: "Date for first lesson of week",
      name: "DateForFirstLesson",
      type: "number",
      placeholder: "Enter your date for first lesson",
    },
    {
      label: "Time for second lesson of week",
      name: "TimeForSecondLesson",
      type: "number",
      placeholder: "Enter your time for second lesson",
    },
    {
      label: "Date for second lesson of week",
      name: "DateForSecondLesson",
      type: "number",
      placeholder: "Enter your date for second lesson",
    },
  ];

  const onDelete = (items) => {
    console.log("Delete items: ", items);
    setItem(items);
    setShowConfirm(true);
  };

  const onEdit = async (courseID) => {
    console.log("Edit courseID: ", courseID);
    const itemEdit = data.find((item) => item.courseID === courseID);
    console.log("Item to edit: ", itemEdit);
    if (!itemEdit) {
      console.error("Item not found for editing: ", courseID);
      return;
    }

    setEdtitData({
      CourseID: itemEdit.courseID || "N/A",
      CourseName: itemEdit.courseName || "N/A",
      CourseNumber: itemEdit.courseNumber || "N/A",
      Syllabus: itemEdit.syllabus || "N/A",
      Equipment: itemEdit.equipment || "N/A",
    });

    setIsEditOpen(true);
    console.log("Editing item: ", editData);
  };

  const fecthAdminsAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/course");
      console.log("Fetched course: ", res.data);

      const list = res.data.listUsers || [];

      const fromatted = list.map((item, index) => ({
        courseID: item.CourseID || "N/A",
        courseName: item.CourseName || "N/A",
        courseNumber: item.CourseNumber || "N/A",
        syllabus: item.Syllabus || "N/A",
        equipment: item.Equipment || "N/A",
      }));
      setData(fromatted);
    } catch (err) {
      console.log("Error fetching information course: ", err);
    }
  };

  useEffect(() => {
    fecthAdminsAccounts();
  }, []);

  const handleDelete = async () => {
    console.log("Deleting items: ", item);
    if (!item) return;

    try {
      await axios.delete("http://localhost:4000/api/admin/course", {
        data: { courseID: item },
      });

      // Recall the getdatabase
      fecthAdminsAccounts();
      setItem(null);
    } catch (err) {
      console.error("Error deleting teacher account: ", err);
    }
  };

  const handleAddSubmit = async (formData) => {
    const body = {
      courseID: formData.CourseID || "N/A",
      courseName: formData.CourseName || "N/A",
      courseNumber: formData.CourseNumber || "N/A",
      syllabus: formData.Syllabus || "N/A",
      equipment: formData.Equipment || "N/A",
    };
    console.log("Adding new course with data: ", body);

    const res = await axios.post(
      "http://localhost:4000/api/admin/course",
      body
    );

    if (res?.data?.msg === "UserID already exists") {
      const err = new Error(res.data.msg);
      err.response = { data: { message: res.data.msg } };
      throw err;
    }

    await fecthAdminsAccounts();
  };

  const handleUpdateSubmit = async (formData) => {
    const body = {
      courseID: formData.CourseID || "N/A",
      courseName: formData.CourseName || "N/A",
      courseNumber: formData.CourseNumber || "N/A",
      syllabus: formData.Syllabus || "N/A",
      equipment: formData.Equipment || "N/A",
    };

    await axios.put("http://localhost:4000/api/admin/course", body);
    await fecthAdminsAccounts();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar activate={activate} setActivate={setActivate} current={6} />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            activate ? "pl-[239px]" : "pl-[80px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Timetabel Management"
                subTitle="Manage all timetable of the center"
                Icon={TimetableIcon}
              />
            </div>

            <div className="px-3">
              <button
                onClick={() => {
                  console.log("Add new Course"), setIsAddOpen(true);
                }}
                className="flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                <Plus />
                <p>Add</p>
              </button>
            </div>

            {/* Add time table here */}
            <div className="px-2 py-3">
              <TimetableGrid
                event={events}
                initialDate={"2025-08-11"}
                onDelete={() => console.log("Delete event")}
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            activate ? "w-[calc(100%-223px)]" : "w-full"
          } transition-all duration-200 ml-auto mt-auto`}>
          <Footer />
        </div>
      </div>

      <ConfirmPopup
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          console.log("Confirmed deletion");
          handleDelete();
          setShowConfirm(false);
        }}
      />

      {/* <AddForm
        fields={addFields}
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onSubmit={handleAddSubmit}
        buttonLabel="Add"
      /> */}

<AddForm
  fields={addFields}
  isOpen={isAddOpen}
  setIsOpen={setIsAddOpen}
  onSubmit={handleAddSubmit}
  buttonLabel="Add"
  openMembers={true}   // 👈 bật nút Add Students & Teachers
/>

      <AddForm
        fields={addFields}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        onSubmit={handleUpdateSubmit}
        initialData={editData}
        buttonLabel={"Save"}
      />
    </>
  );
};

export default ManageTimetable;
