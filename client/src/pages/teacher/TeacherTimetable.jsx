import React, { useState, useEffect} from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";
import TimetableGrid from "../../components/TimeTable/TimetableGrid.jsx";
import axios from "axios";

import ClassIcon from "../../assets/users.svg?react";
import TimetableIcon from "../../assets/calendar.svg?react";

const TeacherTimetable = () => {
  const [activate, setActivate] = useState(1);
  const [weekDate, setWeekDate] = useState(new Date());
  const [reload, setReload] = useState(false);
  const [events, setEvents] = useState([]);
  const menu = [
    {
      text: "Classes",
      icon: ClassIcon,
      color: "#FF0000",
      link: "/teacher/Dashboard",
    },
    {
      text: "Timetable",
      icon: TimetableIcon,
      color: "#FF7002",
      link: "/teacher/Timetable",
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

  const fetchLesson = async () => {
    try {
      const monday = getWeekStartMonday(weekDate)
      const res = await axios.get("http://localhost:4000/api/core/timetable", {
        params: { userID: localStorage.getItem("username"), weekStartDate: formatDate(monday) }
      },)
      console.log("Response from lesson timetable: ", res.data);
      if (res.data?.listLessons) {
        const formatted = res.data.listLessons.map(lesson => ({
          lessonID: lesson.LessonID,
          date: lesson.Date,
          slot: lesson.SessionNumber,
          classID: lesson.ClassID,
          roomID: lesson.RoomID,
        }));
        console.log("Formatted lesson timetable: ", formatted);
        setEvents(formatted || []);
      }
    }
    catch (err) {
      console.error("Error fetching lesson timetable: ", err);
    }
  }

  useEffect(() => {
    fetchLesson();
  }, [weekDate, reload]);




  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="fixed top-0 z-40 h-screen ">
        <SideBar
          activate={activate}
          setActivate={setActivate}
          current={1}
          menu={menu}
        />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${activate ? "pl-[239px]" : "pl-[80px]"
            } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Timetable"
                subTitle="Time is gold"
                Icon={TimetableIcon}
              />
            </div>

            <div>
              <TimetableGrid
                event={events}
                initialDate={initialDate}
                selectedDate={weekDate}
                setDate={setWeekDate}
                setReload={setReload}
                role = {"teacher"}
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
    </>
  );
};

export default TeacherTimetable;
