import React, { useEffect, useState } from "react";

import axios from "axios";

const FeedBackCard = ({ teacherID, tag, content }) => {
  const [UserName, setUserName] = useState("Anonymous");
  const [listTag, setListTag] = useState([]);

  const fetchByRole = async (role) => {
    const res = await axios.get(
      "http://localhost:4000/api/admin/account/search",
      {
        params: { user: teacherID, role },
      }
    );
    if (res.data && res.data.User?.length > 0) {
      console.log(`${role} found:`, res.data.User[0].FullName);
      return res.data.User[0].FullName;
    }
    return null;
  };

  const fetchUserName = async () => {
    try {
      console.log("Fetching user name for ID:", teacherID);
      const name = await fetchByRole("teacher");

      if (name) {
        setUserName(name);
      } else {
        console.log("User not found at all.");
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const fetchTagName = async () => {
    try {
      console.log("Fetching tag name for ID:", tag);
      const res = await axios.get(
        "http://localhost:4000/api/core/feedback/tag"
      );
      if (res.data) {
        console.log("Tag data fetched: ", res.data);
        setListTag(res.data.listTag);
      }
    } catch (error) {
      console.error("Error fetching tag name:", error);
    }
  };
  useEffect(() => {
    fetchUserName();
    fetchTagName();
  }, []);

  return (
    <div className="w-full max-h-[161px] overflow-y-hidden break-words bg-white px-5 py-4 rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-2">
          <div
            className="w-[40px] h-[40px] rounded-full 
                bg-[linear-gradient(90deg,#556BFF_24.44%,#9B00F5_100%)] 
                flex items-center justify-center text-white font-bold">
            {UserName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col gap-0.5 font-family text-[14px]">
            <p>Teacher: {UserName}</p>
            <p>Tag: {listTag.find((t) => t.TagID === tag)?.Name || "No Tag"}</p>
          </div>
        </div>
        <div className="text-[14px] font-family">{content}</div>
      </div>
    </div>
  );
};

export default FeedBackCard;
