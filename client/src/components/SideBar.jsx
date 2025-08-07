import React, { act, useState } from "react";
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

const SideBar = ({ activate, setActivate }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div
      className={`${
        activate
          ? "w-[50px] h-[50px] rounded-full bg-[#E5E7EB] flex items-center justify-center mt-[100px] ml-[17px]"
          : "w-[223px] h-screen bg-[#E5E7EB] flex flex-col shadow-lg"
      } transition-all duration-300 `}
      style={{ boxShadow: "4px 0 25px 0 rgba(0, 0, 0, 0.12)" }}>
      <div
        className={`${
          activate
            ? "flex items-center justify-center w-full h-full"
            : "pt-[112px] px-[32px]"
        }`}>
        <button
          onClick={() => {
            setActivate(!activate);
            console.log({ activate });
          }}
          className="cursor-pointer">
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {!activate && (
        <div className="pt-[16px] px-[11.5px] flex flex-col ">
          {menu.map((item, idx) => (
            <MenuItem
              key={idx}
              text={item.text}
              Icon={item.icon}
              iconColor={item.color}
              isActive={idx === activeIndex}
              onClick={() => {
                setActiveIndex(idx);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
