import React, { useState } from "react";
import StudentSideBar from "../../components/StudentSideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";

import RoadmapIcon from "../../assets/map.svg?react";

const StudentRoadMap = () => {
  const [activate, setActivate] = useState(1);
  const [data, setData] = useState([]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="fixed top-0 z-40 h-screen ">
        <StudentSideBar
          activate={activate}
          setActivate={setActivate}
          current={2}
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
