import React from "react";

const MenuItem = ({ text, icon: Icon, iconColor }) => {
  return (
    <div
      className="w-[200px] h-[49px] flex items-center gap-2.5 px-8 rounded-md cursor-pointer
    bg-[#e5e7eb] text-black">
      <Icon className={`w-6 h-6`} style={{ color: iconColor }} />
      <span className="font-family text-[22.75px] font-normal leading-normal tracking-[1.138px]">
        {text}
      </span>
    </div>
  );
};

export default MenuItem;
