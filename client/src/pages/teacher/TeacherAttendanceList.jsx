import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from "../../components/SummaryCard";
import PaginatedTable from "../../components/Table/PaginatedTable";

import StudentIcon from "../../assets/user.svg?react";
import DiscussionIcon from "../../assets/message-circle.svg?react";
import GoBackIcon from "../../assets/chevron-left.svg?react";

import axios from "axios";

const TeacherStudentList = () => {
  const [activate, setActivate] = useState(1);
  const [ClassInfo, setClassInfo] = useState({});
  const [data, setData] = useState([]);
  const { ClassID } = useParams();
  const Columns = ["id", "role", "name", "dob"];

  const menu = [
    {
      text: "Discussion",
      icon: DiscussionIcon,
      color: "#FF0000",
      link: `/teacher/Class/${ClassID}/Discussion`,
    },
    {
      text: "Attendance",
      icon: StudentIcon,
      color: "#FF7002",
      link: `/teacher/Class/${ClassID}/Attendance`,
    },
    {
      text: "Go Back",
      icon: GoBackIcon,
      color: "#DCCA00",
      link: `/teacher/Dashboard`,
    },
  ];

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

  const fetchAccountByRole = async (role) => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/class", {
        params: { classID: ClassID, role: role },
      });
      console.log(`Fetched ${role} accounts: `, res.data);
      return res.data.classes || [];
    } catch (err) {
      console.log(`Error fetching ${role} accounts: `, err);
      return [];
    }
  };

  const fecthAccounts = async () => {
    const students = await fetchAccountByRole("student");
    console.log("Student accounts: ", students);

    const formatted = students.map((item, index) => ({
      id: item.UserID || "N/A",
      role: item.Role || "N/A",
      name: item.FullName || "N/A",
      dob: item.Birthday || "N/A",
    }));

    setData(formatted);
    console.log("Formatted student accounts: ", formatted);
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      fecthAccounts();
    }
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/account/search",
        {
          params: { userID: searchTerm, role: "student" },
        }
      );
      console.log("Search results: ", res.data);
      const list = res.data.User || [];

      const formatted = list.map((item, index) => ({
        id: item.UserID || "N/A",
        name: item.FullName || "N/A",
        dob: item.Birthday || "N/A",
        password: item.Password || "N/A",
      }));

      setData(formatted);
      console.log("Formatted search results: ", formatted);
    } catch (err) {
      console.error("Error searching student accounts: ", err);
    }
  };

  const handleFeedback = (items) => {
    console.log("Feedback clicked");
  };
  useEffect(() => {
    fecthClassInfo();
    fecthAccounts();
  }, []);
  console.log("data:", data);
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
            activate ? "pl-[239px]" : "pl-[80px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title={`Student list of the class ${
                  ClassInfo.ClassName || "N/A"
                }`}
                subTitle="Here is the list of all students in this class"
                Icon={StudentIcon}
              />
            </div>

            <div className="flex items-stretch ">
              <div className="flex-1 px-1 sm:px-3 sm:py-2 pl-3">
                <SearchBar
                  inputText="Enter Student Name or UserID"
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div className="px-1 py-1 sm:py-2 sm:px-2  pr-2">
                <SummaryCard number={data.length} name="Total Accounts" />
              </div>
            </div>

            <div className="px-3 py-3">
              <PaginatedTable
                headers={["UserID", "Role", "FullName", "Birthday", "Feedback"]}
                data={data}
                onFeedBack={handleFeedback}
                columns={Columns}
                role="teacher"
              />
            </div>
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

export default TeacherStudentList;
