import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";

import RoadmapIcon from "../../assets/map.svg?react";
import TimetableIcon from "../../assets/calendar.svg?react";
import ClassIcon from "../../assets/users.svg?react";

const StudentRoadMap = () => {
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
    {
      text: "Roadmap",
      icon: RoadmapIcon,
      color: "#DCCA00",
      link: "/student/Roadmap",
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="fixed top-0 z-40 h-screen ">
        <SideBar
          activate={activate}
          setActivate={setActivate}
          current={2}
          menu={menu}
        />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            activate ? "pl-[239px]" : "pl-[80px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Road Map"
                subTitle="There is a long way to go"
                Icon={RoadmapIcon}
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

export default StudentRoadMap;
