import React from "react";

import ClassIcon from "../assets/users.svg?react";

const ClassCard = ({ ClassID, ClassName, Teachers, onClick }) => {
  console.log("Rendering ClassCard with Teachers: ", Teachers);
  return (
    <div
      className="w-full h-[154px] bg-white/82 rounded-[10px] shadow-md shadow-black/25 px-[12px] py-[17px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}>
      <div className="flex flex-col gap-3 min-h-full">
        <div className="flex gap-4">
          <ClassIcon className="h-6 w-6" style={{ color: "#0066FF" }} />
          <p className="font-family text-[18px]"> {ClassName} </p>
        </div>
        <p
          className="font-family text-[14px]
          ">
          ClassID: {ClassID}
        </p>
        <p
          className="font-family text-[14px]
          ">
          Teachers:
          {Teachers.map((teacher, index) => teacher.FullName).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ClassCard;
