import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from "../../components/SummaryCard";
import PaginatedTable from "../../components/Table/PaginatedTable";
import Plus from "../../assets/plus.svg?react";
import axios from "axios";
import ConfirmPopup from "../../components/Table/ConfirmPopup";
import AddFormForClass from "../../components/FormForClass/AddFormForClass";

import StudentIcon from "../../assets/user.svg?react";
import TeacherIcon from "../../assets/Teacher_icon.svg?react";
import AdminIcon from "../../assets/shield.svg?react";
import CourseIcon from "../../assets/book.svg?react";
import RoomIcon from "../../assets/home.svg?react";
import ClassIcon from "../../assets/users.svg?react";
import TimetableIcon from "../../assets/calendar.svg?react";

const ManageClass = () => {
  const [activate, setActivate] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const menu = [
    {
      text: "Admins",
      icon: AdminIcon,
      color: "#FF0000",
      link: "/admin/Dashboard",
    },
    {
      text: "Students",
      icon: StudentIcon,
      color: "#FF7002",
      link: "/admin/Student",
    },
    {
      text: "Teachers",
      icon: TeacherIcon,
      color: "#DCCA00",
      link: "/admin/Teacher",
    },
    {
      text: "Courses",
      icon: CourseIcon,
      color: "#00FF00",
      link: "/admin/Course",
    },
    { text: "Rooms", icon: RoomIcon, color: "#00D6D6", link: "/admin/Room" },
    {
      text: "Classes",
      icon: ClassIcon,
      color: "#0400FF",
      link: "/admin/Class",
    },
    {
      text: "Timetable",
      icon: TimetableIcon,
      color: "#C800FF",
      link: "/admin/Timetable",
    },
  ];
  const Columns = [
    "classID",
    "className",
    "lessonPerWeek",
    "classNumWeek",
    "beginDate",
    "endDate",
    "courseID",
    "studentOfClass",
    "teacherOfClass",
  ];

  const onDelete = (items) => {
    console.log("Delete items: ", items);
    setItem(items);
    setShowConfirm(true);
  };

  const onEdit = async (classID) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/class/search",
        {
          params: { classID: classID },
        }
      );
      const list = res.data?.Class || [];
      setEditData({
        classID: list[0].ClassID || "N/A",
        className: list[0].ClassName || "N/A",
        lessonPerWeek: list[0].LessonsPerWeek || "N/A",
        classNumWeek: list[0].ClassNumWeek || "N/A",
        beginDate: list[0].BeginDate || "N/A",
        endDate: list[0].EndDate || "N/A",
        courseID: list[0].CourseID || "N/A",
        studentOfClass: list[0].students.map((s) => s.UserID) || [],
        teacherOfClass: list[0].teachers.map((t) => t.UserID) || [],
      });
      setIsEditOpen(true);
    } catch (err) {
      console.error("Error editing class: ", err);
    }
  };

  const fecthClass = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/core/class", {
        params: {
          userid: localStorage.getItem("username"),
          role: "superadmin",
        },
      });
      const list = res.data?.listClasses || [];

      const formatted = list.map((item, index) => ({
        classID: item.ClassID || "N/A",
        className: item.ClassName || "N/A",
        lessonPerWeek: item.LessonsPerWeek || "N/A",
        classNumWeek: item.ClassNumWeek || "N/A",
        beginDate: item.BeginDate || "N/A",
        endDate: item.EndDate || "N/A",
        courseID: item.CourseID || "N/A",
        studentOfClass:
          (item.students || []).map((s) => s.FullName).join(", ") || "N/A",
        teacherOfClass:
          (item.teachers || []).map((t) => t.FullName).join(", ") || "N/A",
      }));

      // console.log("Formatted data: ", formatted);
      setData(formatted);
    } catch (err) {
      console.log("Error fetching information class: ", err);
    }
  };

  useEffect(() => {
    fecthClass();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      fecthClass();
    }
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/class/search",
        {
          params: { classID: searchTerm },
        }
      );
      console.log("Search results: ", res.data);
      const list = res.data?.Class || [];

      const formatted = list.map((item, index) => ({
        classID: item.ClassID || "N/A",
        className: item.ClassName || "N/A",
        lessonPerWeek: item.LessonsPerWeek || "N/A",
        classNumWeek: item.ClassNumWeek || "N/A",
        beginDate: item.BeginDate || "N/A",
        endDate: item.EndDate || "N/A",
        courseID: item.CourseID || "N/A",
        studentOfClass:
          (item.students || []).map((s) => s.FullName).join(", ") || "N/A",
        teacherOfClass:
          (item.teachers || []).map((t) => t.FullName).join(", ") || "N/A",
      }));

      setData(formatted);
      console.log("Formatted search results: ", formatted);
    } catch (err) {
      console.error("Error searching teacher accounts: ", err);
    }
  };

  const handleDelete = async () => {
    console.log("Deleting items: ", item);
    if (!item) return;

    try {
      await axios.delete("http://localhost:4000/api/admin/class", {
        data: { classID: item },
      });
      console.log("Deleted class with ID: ", item);
      fecthClass();
      setItem(null);
    } catch (err) {
      console.error("Error deleting teacher account: ", err);
    }
  };

  const handleAddSubmit = async (formData) => {
    console.log("Adding new class with data: ", formData);
    try {
      const body = {
        classID: formData.classID || "N/A",
        className: formData.className || "N/A",
        lessonsPerWeek: formData.lessonPerWeek || "N/A",
        classNumWeek: formData.classNumWeek || "N/A",
        beginDate: formData.beginDate || "N/A",
        endDate: formData.endDate || "N/A",
        courseID: formData.courseID || "N/A",
        studentIDs: [...new Set(formData.selectedStudents || [])] || "N/A",
        teacherIDs: [...new Set(formData.selectedTeachers || [])] || "N/A",
      };

      console.log("Adding new class with data: ", body);
      const res = await axios.post(
        "http://localhost:4000/api/admin/class",
        body
      );

      if (res?.data?.success === false)  {
        const err = new Error(res.data.msg);
        err.response = { data: { message: res.data.msg } };
        throw err;
      }

      console.log("Response from adding class: ", res.data);

      await fecthClass();
    } catch (err) {
      throw err;
      console.error("Error adding new class: ", res.data.message, err);
    }
  };

  const handleUpdateSubmit = async (formData) => {
    const body = {
      ClassID: formData.classID || "N/A",
      className: formData.className || "N/A",
      lessonsPerWeek: formData.lessonPerWeek || "N/A",
      classNumWeek: formData.classNumWeek || "N/A",
      beginDate: formData.beginDate || "N/A",
      endDate: formData.endDate || "N/A",
      courseID: formData.courseID || "N/A",
      studentIDs: [...new Set(formData.selectedStudents || [])] || "N/A",
      teacherIDs: [...new Set(formData.selectedTeachers || [])] || "N/A",
    };

    console.log("Updating data: ", body);

    const res = await axios.put("http://localhost:4000/api/admin/class", body);

    if (res?.data?.success === false)  {
      const err = new Error(res.data.msg);
      err.response = { data: { message: res.data.msg } };
      throw err;
    }
    
    await fecthClass();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar
          activate={activate}
          setActivate={setActivate}
          current={5}
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
                title="Class Management"
                subTitle="Manage all class of the center"
                Icon={ClassIcon}
              />
            </div>

            <div className="flex items-stretch ">
              <div className="flex-1 px-1 sm:px-3 sm:py-2 pl-3">
                <SearchBar
                  inputText="Enter The Class Name"
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div className="px-1 py-1 sm:py-2 sm:px-2  pr-2">
                <SummaryCard number={data.length} name="Total Class" />
              </div>
            </div>

            <div className="px-3">
              <button
                onClick={() => {
                  console.log("Add new class"), setIsAddOpen(true);
                }}
                className="flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                <Plus />
                <p>Add</p>
              </button>
            </div>

            <div className="px-3 py-3">
              <PaginatedTable
                headers={[
                  "ClassID",
                  "ClassName",
                  "LessonPerWeek",
                  "ClassNumWeek",
                  "BeginDate",
                  "EndDate",
                  "CourseID",
                  "StudentOfClass",
                  "TeacherOfClass",
                  "Actions",
                ]}
                data={data}
                onEdit={onEdit}
                onDelete={onDelete}
                columns={Columns}
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

      <ConfirmPopup
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          console.log("Confirmed deletion");
          handleDelete();
          setShowConfirm(false);
        }}
      />

      <AddFormForClass
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onSubmit={handleAddSubmit}
        initialData={null}
        buttonLabel="Add"
      />

      <AddFormForClass
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        onSubmit={handleUpdateSubmit}
        initialData={editData}
        buttonLabel={"Save"}
      />
    </>
  );
};

export default ManageClass;
