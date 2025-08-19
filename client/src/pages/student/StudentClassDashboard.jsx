import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StudentClassSideBar from "../../components/StudentClassSideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleBanner from "../../components/TitleBanner";
import PostBar from "../../components/PostBar";
import SummaryCard from "../../components/SummaryCard";
import PostCard from "../../components/PostCard";

import DiscussionIcon from "../../assets/message-circle.svg?react";

import axios from "axios";

const StudentClassDashboard = () => {
  const [activate, setActivate] = useState(1);
  const [ClassInfo, setClassInfo] = useState({});
  const [discussion, setDiscussion] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [content, setContent] = useState("");
  const { ClassID } = useParams();

  const handleUploadFile = (file) => {
    if (file) {
      setAttachedFile(file);
      console.log("File selected: ", file);
    }
  };

  const onPost = async (content) => {
    const postData = {
      classID: ClassID,
      userID: localStorage.getItem("username"),
      content: content,
      link: attachedFile ? attachedFile.name : null,
    };
    console.log("Posting data: ", postData);
    const res = await axios.post(
      "http://localhost:4000/api/admin/discussion",
      postData
    );
    if (res.data.success) {
      console.log("Post successful: ", res.data);
      fetchDiscussion(); // Refresh discussion after posting
      setAttachedFile(null); // Reset attached file after posting
      setContent(""); // Clear content input after posting
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

  const fetchDiscussion = async () => {
    console.log("Fetching discussion data...");
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/discussion",
        {
          params: { classID: ClassID },
        }
      );
      console.log("Fetched posts: ", res.data);

      const list = res.data.posts || [];

      console.log("List of posts: ", list);
      const formatted = list.map((item, index) => ({
        PostID: item.PostID || "N/A",
        ClassID: item.ClassID || "N/A",
        UserID: item.UserID || "N/A",
        Content: item.Content || "N/A",
        Link: item.Link || "N/A",
        PostDate: item.PostDate || "N/A",
      }));
      setDiscussion(formatted);
    } catch (err) {
      console.log("Error fetching posts: ", err);
    }
  };

  useEffect(() => {
    fecthClassInfo();
    fetchDiscussion();
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
          classID={ClassID}
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
                title={`${ClassInfo.ClassName}'s Discussion Board`}
                subTitle="All necessary knowledge for you"
                Icon={DiscussionIcon}
              />
            </div>
            <div className="flex items-stretch py-1 gap-2 pr-2">
              <div className="flex-1">
                <PostBar
                  inputText="Find a discussion"
                  Post={onPost}
                  handleInputFile={handleUploadFile}
                  content={content}
                  setContent={setContent}
                />
              </div>
              <div>
                <SummaryCard number={discussion.length} name="Total Posts" />
              </div>
            </div>
          </div>
          {attachedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Attached file: {attachedFile.name}
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 py-3 pr-2 justify-center">
            {discussion.map((item, index) => (
              <PostCard
                key={index}
                UserID={item.UserID}
                DateTime={item.PostDate}
                Content={item.Content}
                File={item.Link}
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

export default StudentClassDashboard;
