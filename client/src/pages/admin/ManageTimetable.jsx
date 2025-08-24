import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import Plus from "../../assets/plus.svg?react";
import axios from "axios";
import ConfirmPopup from "../../components/Table/ConfirmPopup";
import AddForm from "../../components/FormForTimetable/AddFromForTimetable";
import TimetableGrid from "../../components/TimeTable/TimetableGrid.jsx";

import StudentIcon from "../../assets/user.svg?react";
import TeacherIcon from "../../assets/Teacher_icon.svg?react";
import AdminIcon from "../../assets/shield.svg?react";
import CourseIcon from "../../assets/book.svg?react";
import RoomIcon from "../../assets/home.svg?react";
import ClassIcon from "../../assets/users.svg?react";
import TimetableIcon from "../../assets/calendar.svg?react";

const ManageTimetable = () => {
  const [activate, setActivate] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [weekDate, setWeekDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(false);



  const menu = [
    {
      text: "Admins",
      icon: AdminIcon,
      color: "#FF0000",
      link: "/admin/Dashboard",
    },
    {
      text: "Students",
      icon: StudentIcon,
      color: "#FF7002",
      link: "/admin/Student",
    },
    {
      text: "Teachers",
      icon: TeacherIcon,
      color: "#DCCA00",
      link: "/admin/Teacher",
    },
    {
      text: "Courses",
      icon: CourseIcon,
      color: "#00FF00",
      link: "/admin/Course",
    },
    { text: "Rooms", icon: RoomIcon, color: "#00D6D6", link: "/admin/Room" },
    {
      text: "Classes",
      icon: ClassIcon,
      color: "#0400FF",
      link: "/admin/Class",
    },
    {
      text: "Timetable",
      icon: TimetableIcon,
      color: "#C800FF",
      link: "/admin/Timetable",
    },
  ];

  const today = new Date();
  const initialDate = today.toISOString().split("T")[0]; 

  const formatDate = (date) => {
    if (!date) return date;

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const getWeekStartMonday = (date) => {
    const day = date.getDay(); // 0=Sunday, 1=Monday, ...
    const offset = day === 0 ? -6 : 1 - day; 
    const monday = new Date(date);
    monday.setDate(date.getDate() + offset);
    return monday;
  };

  const fecthLessonTimeTable = async () => {
    try {
      const monday = getWeekStartMonday(weekDate)
      const res = await axios.get("http://localhost:4000/api/admin/timetable", {
        params: { weekStartDate: formatDate(monday) }
      })
      console.log("weekDate: ", formatDate(weekDate));
      // console.log("Fetched raw lesson timetable: ", res.data);
      if (res.data?.listLessons) {
        const formatted = res.data.listLessons.map(lesson => ({
          lessonID: lesson.LessonID,
          date: lesson.Date,
          slot: lesson.SessionNumber,
          classID: lesson.ClassID,
          roomID: lesson.RoomID,
        }));
        console.log("Formatted lesson timetable: ", formatted);
        setEvents(formatted);
      }
    }
    catch (err) {
      console.error("Error fetching lesson timetable: ", err);
    }
  }

  useEffect(() => {
    fecthLessonTimeTable();
  }, [weekDate, reload]);

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



  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar
          activate={activate}
          setActivate={setActivate}
          current={6}
          menu={menu}
        />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${activate ? "pl-[239px]" : "pl-[80px]"
            } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Timetable Management"
                subTitle="Manage all timetable of the center"
                Icon={TimetableIcon}
              />
            </div>

            <div className="px-3">
              <button
                onClick={() => {
                  setIsAddOpen(true);
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
                initialDate={initialDate}
                selectedDate={weekDate}
                setDate={setWeekDate}
                setReload={setReload}
              />
            </div>
          </div>
        </div>
        <div
          className={`${activate ? "w-[calc(100%-223px)]" : "w-full"
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


      <AddForm
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
      />
    </>
  );
};

export default ManageTimetable;
