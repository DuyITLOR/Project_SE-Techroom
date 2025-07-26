import React from "react";
import MenuItem from "./MenuItem";
import StudentIcon from "../assets/user.svg?react";
import TeacherIcon from "../assets/Teacher_icon.svg?react";
import AdminIcon from "../assets/shield.svg?react";
import CourseIcon from "../assets/book.svg?react";
import RoomIcon from "../assets/home.svg?react";
import ClassIcon from "../assets/users.svg?react";
import TimetableIcon from "../assets/calendar.svg?react";
import RoadmapIcon from "../assets/map.svg?react";
import MenuIcon from "../assets/menu.svg?react";

const SideBar = () => {
  const menu = [
    { text: "Students", icon: StudentIcon, color: "#FF0000" },
    { text: "Teachers", icon: TeacherIcon, color: "#FF7002" },
    { text: "Admins", icon: AdminIcon, color: "#DCCA00" },
    { text: "Courses", icon: CourseIcon, color: "#00FF00" },
    { text: "Rooms", icon: RoomIcon, color: "#00D6D6" },
    { text: "Classes", icon: ClassIcon, color: "#0400FF" },
    { text: "Timetable", icon: TimetableIcon, color: "#C800FF" },
    { text: "Roadmap", icon: RoadmapIcon, color: "#FF00B2" },
  ];
  return (
    <div className="w-[223px] h-[1128px] bg-[#E5E7EB] flex flex-col gap-0 shadow-lg">
      <div className="pt-[100px] px-[17px]">
        <MenuIcon className="w-6 h-6" />
      </div>

      <div className="pt-[16px] px-[11.5px] flex flex-col ">
        {menu.map((item, idx) => (
          <MenuItem
            key={idx}
            text={item.text}
            icon={item.icon}
            iconColor={item.color}
            active={item.active}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
