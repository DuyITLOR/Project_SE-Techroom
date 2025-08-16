import React from "react";
import Trash from "../assets/trash-2.svg?react";

const PostCard = ({ UserName, DateTime, Content }) => {
  return (
    <div className="w-full max-h-[161px] overflow-y-hidden break-words bg-white px-5 py-4 rounded-[10px] shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div
            className="w-[40px] h-[40px] rounded-full 
                bg-[linear-gradient(90deg,#556BFF_24.44%,#9B00F5_100%)] 
                flex items-center justify-center text-white font-bold">
            {UserName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col gap-0.5 font-family text-[14px]">
            <p>{UserName}</p>
            <p>{DateTime}</p>
          </div>
          <button
            className="ml-auto cursor-pointer"
            onClick={(e) => {
              console.log("Delete post clicked");
              e.stopPropagation(); // Prevent row click event
            }}>
            <Trash className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="text-[14px] font-family">{Content}</div>
      </div>
    </div>
  );
};

export default PostCard;
