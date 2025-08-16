import React from "react";

import ClassIcon from "../assets/users.svg?react";
import ClockIcon from "../assets/clock.svg?react";

const ItemCard = ({ ClassID, ClassName, TeacherName, onClick }) => {
  return (
    <div
      className="w-full h-[154px] bg-white/82 rounded-[10px] shadow-md shadow-black/25 px-[12px] py-[17px] cursor-pointer"
      onClick={onClick}>
      <div className="flex flex-col gap-3 min-h-full">
        <div className="flex gap-4">
          <ClassIcon className="h-6 w-6" style={{ color: "#0066FF" }} />
          <text className="font-family text-[18px]"> {ClassName} </text>
        </div>
        <text
          className="font-family text-[14px]
          ">
          ClassID: {ClassID}
        </text>
        <text
          className="font-family text-[14px]
          ">
          Teacher: {TeacherName}
        </text>
      </div>
    </div>
  );
};

export default ItemCard;
