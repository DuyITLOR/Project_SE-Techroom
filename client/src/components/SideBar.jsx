import React, { act, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import MenuIcon from "../assets/menu.svg?react";

const SideBar = ({ activate, setActivate, current, menu }) => {
  const [activeIndex, setActiveIndex] = useState(current);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        activate
          ? "w-[223px] h-screen bg-[#E5E7EB] flex flex-col shadow-lg"
          : "w-[50px] h-[50px] rounded-full bg-[#E5E7EB] flex items-center justify-center mt-[100px] ml-[17px]"
      } transition-all duration-300 `}
      style={{ boxShadow: "4px 0 25px 0 rgba(0, 0, 0, 0.12)" }}>
      <div
        className={`${
          activate
            ? "pt-[112px] px-[32px]"
            : "flex items-center justify-center w-full h-full"
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

      {activate && (
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
                navigate(item.link);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
