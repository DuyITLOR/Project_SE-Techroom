import React from "react";

const MenuItem = ({ text, icon: Icon, iconColor, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[200px] h-[49px] flex items-center gap-2.5 px-8 rounded-md cursor-pointer transition duration-100
        ${
          isActive
            ? "bg-[#29A9F2] text-white"
            : "bg-[#E5E7EB] text-black hover:bg-[#5AC8FA]"
        }`}>
      <Icon
        className={`w-6 h-6`}
        style={{ color: isActive ? "#FFFFFF" : iconColor }}
      />
      <span className="font-family text-[20.75px] font-normal leading-normal tracking-[1.138px]">
        {text}
      </span>
    </div>
  );
};

export default MenuItem;
