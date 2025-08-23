import React, { useEffect, useState } from "react";

import axios from "axios";

const PostCard = ({ UserID, DateTime, Content, File }) => {
  const [UserName, setUserName] = useState("Anonymous");

  const downloadFile = async () => {
    const fileName = File.substring(7).trim();
    console.log("Downloading file:", fileName);
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/discussion/download",
        {
          params: { filename: fileName }, // 👈 send file name
          responseType: "blob", // 👈 receive binary
        }
      );

      // create a blob URL
      const url = window.URL.createObjectURL(new Blob([res.data]));

      // create temporary link for download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // filename from DB
      document.body.appendChild(link);
      link.click();

      // cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Error downloading file: ", err);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    console.log("Fetching user name for ID: ", UserID);
    try {
      let res = await axios.get(
        "http://localhost:4000/api/admin/account/search",
        {
          params: { user: UserID, role: "student" },
        }
      );
      if (res.data) {
        console.log("Student found: ", res.data);
        setUserName(res.data.User[0].FullName);
      } else {
        console.log("Student not found, trying teacher role...");
        res = await axios.get(
          "http://localhost:4000/api/admin/account/search",
          {
            params: { user: UserID, role: "teacher" },
          }
        );
        if (res.data) {
          console.log("Teacher found: ", res.data);
          setUserName(res.data.User[0].FullName);
        }
      }
    } catch (error) {
      console.error("Error fetching user name: ", error);
    }
  };
  return (
    <div className="w-full max-h-[161px] overflow-y-hidden break-words bg-white px-5 py-4 rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-200">
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
            <p>{new Date(DateTime).toLocaleString()}</p>
          </div>
        </div>
        <div className="text-[14px] font-family">{Content}</div>
        {File !== "N/A" && (
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault(); // prevent normal navigation
                await downloadFile();
              }}
              className="text-blue-500 hover:underline">
              @{File}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
