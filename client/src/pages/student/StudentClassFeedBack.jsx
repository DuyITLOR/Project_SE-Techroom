import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import SummaryCard from "../../components/SummaryCard";
import FeedBackCard from "../../components/FeedBackCard";

import SearchIcon from "../../assets/search.svg?react";
import DiscussionIcon from "../../assets/message-circle.svg?react";
import FeedbackIcon from "../../assets/star.svg?react";
import GoBackIcon from "../../assets/chevron-left.svg?react";

import axios from "axios";

const StudentClassFeedBack = () => {
  const [activate, setActivate] = useState(1);
  const [ClassInfo, setClassInfo] = useState({});
  const [feedback, setFeedBack] = useState([]);
  const { ClassID } = useParams();
  const menu = [
    {
      text: "Discussion",
      icon: DiscussionIcon,
      color: "#FF0000",
      link: `/student/Class/${ClassID}/Discussion`,
    },
    {
      text: "Feedback",
      icon: FeedbackIcon,
      color: "#FF7002",
      link: `/student/Class/${ClassID}/Feedback`,
    },
    {
      text: "Go Back",
      icon: GoBackIcon,
      color: "#DCCA00",
      link: `/student/Dashboard`,
    },
  ];

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
      const res = await axios.get(
        "http://localhost:4000/api/admin/class/info",
        {
          params: { classID: ClassID },
        }
      );
      console.log("Fetched class's infomation: ", res.data);

      setClassInfo(res.data.classInfo || {});
    } catch (err) {
      console.log("Error fetching classes: ", err);
    }
  };

  const fetchFeedback = async () => {
    console.log("Fetching feedback data...");
    try {
      const res = await axios.get("http://localhost:4000/api/core/feedback", {
        params: {
          classID: ClassID,
          studentID: localStorage.getItem("username"),
        },
      });
      console.log("Fetched feedback: ", res.data);

      setFeedBack(res.data.listFeedback || []);
    } catch (err) {
      console.log("Error fetching feedback: ", err);
    }
  };

  useEffect(() => {
    fecthClassInfo();
    fetchFeedback();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="fixed top-0 z-40 h-screen ">
        <SideBar
          activate={activate}
          setActivate={setActivate}
          current={1}
          menu={menu}
        />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            activate ? "pl-[245px]" : "pl-[80px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          <div>
            <div className="py-3 pr-2">
              <TitleBanner
                title={`${ClassInfo.ClassName}'s Feedback`}
                subTitle="All necessary knowledge for you"
                Icon={DiscussionIcon}
              />
            </div>
            <div className="flex items-stretch py-1 gap-2 pr-2">
              <div className="flex-1">
                <SearchBar
                  inputText="Find a feedback"
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div>
                <SummaryCard number={feedback.length} name="Total Feedbacks" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 py-3 pr-2 justify-center">
            {feedback.map((item, index) => (
              <FeedBackCard
                key={item.FeedbackID}
                teacherID={item.TeacherID}
                tag={item.TagID}
                content={item.Text}
              />
            ))}
          </div>
        </div>
        <div
          className={`${
            activate ? "w-[calc(100%-223px)]" : "w-full"
          } transition-all duration-200 ml-auto mt-auto`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default StudentClassFeedBack;
