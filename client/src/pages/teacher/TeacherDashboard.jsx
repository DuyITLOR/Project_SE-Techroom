import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import SummaryCard from "../../components/SummaryCard";
import ClassCard from "../../components/ClassCard";

import ClassIcon from "../../assets/users.svg?react";
import SearchIcon from "../../assets/search.svg?react";

import axios from "axios";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activate, setActivate] = useState(1);
  const [data, setData] = useState([]);
  const menu = [
    {
      text: "Classes",
      icon: ClassIcon,
      color: "#FF0000",
      link: "/student/Dashboard",
    },
    {
      text: "Timetable",
      icon: TimetableIcon,
      color: "#FF7002",
      link: "/student/Timetable",
    },
  ];

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      fecthClass();
    }
    try {
      const res = await axios.get("http://localhost:4000/api/core/class", {
        params: { userID: searchTerm, role: "student" },
      });
      console.log("Search results: ", res.data);
      const list = res.data.User || [];

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
      console.log("Formatted search results: ", formatted);
    } catch (err) {
      console.error("Error searching classes: ", err);
    }
  };

  const fecthClass = async () => {
    console.log("Fetching class data...");
    try {
      const res = await axios.get("http://localhost:4000/api/core/class", {
        params: { userid: localStorage.getItem("username"), role: "student" },
      });
      console.log("Fetched student's class: ", res.data);

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
    fecthClass();
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
          current={0}
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
                title="Classes"
                subTitle="All necessary knowledge for you"
                Icon={ClassIcon}
              />
            </div>
            <div className="flex items-stretch py-1 gap-2 pr-2">
              <div className="flex-1">
                <SearchBar
                  inputText="Enter Class ID"
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div>
                <SummaryCard number={data.length} name="Total Classes" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 py-3 pr-2 justify-center">
            {data.map((item, index) => (
              <ClassCard
                key={item.ClassID}
                ClassID={item.ClassID || "N/A"}
                ClassName={item.ClassName || "N/A"}
                TeacherName={item.TeacherName || "None"}
                onClick={() => {
                  navigate(`/student/Class/${item.ClassID}/Discussion`);
                  console.log("Navgating");
                }}
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

export default TeacherDashboard;
