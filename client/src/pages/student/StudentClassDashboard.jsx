import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentClassSideBar from "../../components/StudentClassSideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import SummaryCard from "../../components/SummaryCard";
import PostCard from "../../components/PostCard";

import SearchIcon from "../../assets/search.svg?react";
import DiscussionIcon from "../../assets/message-circle.svg?react";

import axios from "axios";

const StudentClassDashboard = ({ ClassID }) => {
  const [activate, setActivate] = useState(1);
  const [discussion, setDiscussion] = useState([]);
  const { classID } = useParams();

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      fecthAdminsAccounts();
    }
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/account/search",
        {
          params: { userID: searchTerm, role: "admin" },
        }
      );
      console.log("Search results: ", res.data);
      const list = res.data.User || [];

      const formatted = list.map((item, index) => ({
        id: item.UserID || "N/A",
        name: item.FullName || "N/A",
        dob: item.Birthday || "N/A",
      }));

      setData(formatted);
      console.log("Formatted search results: ", formatted);
    } catch (err) {
      console.error("Error searching admin accounts: ", err);
    }
  };

  const fecthClassInfo = async () => {
    console.log("Fetching class data...");
    try {
      const res = await axios.get("http://localhost:4000/api/core/class", {
        params: { ClassID: ClassID },
      });
      console.log("Fetched class's infomation: ", res.data);

      const list = res.data.listClasses || [];

      console.log("List of classes: ", list);
      const formatted = list.map((item, index) => ({
        ClassID: item.ClassID || "N/A",
        ClassName: item.ClassName || "N/A",
        LessonsPerWeek: item.LessonsPerWeek || "N/A",
        ClassNumWeek: item.ClassNumWeek || "N/A",
        BeginDate: item.BeginDate || "N/A",
        EndDate: item.EndDate || "N/A",
        CourseID: item.CourseID || "N/A",
      }));
      setData(formatted);
    } catch (err) {
      console.log("Error fetching classes: ", err);
    }
  };

  useEffect(() => {
    fecthClassInfo();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="fixed top-0 z-40 h-screen ">
        <StudentClassSideBar
          activate={activate}
          setActivate={setActivate}
          current={0}
          classID={classID}
        />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            activate ? "pl-[80px]" : "pl-[245px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          <div>
            <div className="py-3 pr-2">
              <TitleBanner
                title={`Discussion ${ClassID}`}
                subTitle="All necessary knowledge for you"
                Icon={DiscussionIcon}
              />
            </div>
            <div className="flex items-stretch py-1 gap-2 pr-2">
              <div className="flex-1">
                <SearchBar
                  inputText="..."
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div>
                <SummaryCard number={discussion.length} name="Total Posts" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 py-3 pr-2 justify-center">
            {discussion.map((item, index) => (
              <PostCard
                key={index}
                UserName={item.UserName}
                DateTime={item.DateTime}
                Content={item.Content}
              />
            ))}
          </div>
        </div>
        <div
          className={`${
            activate ? "w-full" : "w-[calc(100%-223px)]"
          } transition-all duration-200 ml-auto mt-auto`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default StudentClassDashboard;
