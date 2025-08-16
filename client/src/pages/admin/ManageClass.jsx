import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import ClassIcon from "../../assets/users.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from "../../components/SummaryCard";
import exampleData from "../../assets/ExampleData";
import PaginatedTable from "../../components/Table/PaginatedTable";
import Plus from "../../assets/plus.svg?react";
import axios from "axios";
import ConfirmPopup from "../../components/Table/ConfirmPopup";
import AddForm from "../../components/AddForm";

const ManageClass = () => {
  const [activate, setActivate] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEdtitData] = useState(null);

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

  const addFields = [
    {
      label: "ClassID",
      name: "ClassID",
      type: "text",
      placeholder: "Enter your class ID",
    },
    {
      label: "ClassName",
      name: "ClassName",
      type: "text",
      placeholder: "Enter your class name",
    },
    {
      label: "LessonPerWeek",
      name: "LessonPerWeek",
      type: "number",
      placeholder: "Enter your lesson per week",
    },
    {
      label: "ClassNumWeek",
      name: "ClassNumWeek",
      type: "number",
      placeholder: "Enter your class per week",
    },
    {
      label: "BeginDate",
      name: "BeginDate",
      type: "date",
      placeholder: "Enter your begin date",
    },
    {
      label: "EndDate",
      name: "EndDate",
      type: "date",
      placeholder: "Enter your end date",
    },
    {
      label: "CourseID",
      name: "CourseID",
      type: "text",
      placeholder: "Enter your course ID",
    },
    {
      label: "StudentOfClass",
      name: "StudentOfClass",
      type: "text",
      placeholder: "Enter your student of class",
    },
    {
      label: "TeacherOfClass",
      name: "TeacherOfClass",
      type: "text",
      placeholder: "Enter your teacher of class",
    },
  ];

  const onDelete = (items) => {
    console.log("Delete items: ", items);
    setItem(items);
    setShowConfirm(true);
  };

  const onEdit = async (classID) => {
    console.log("Edit RoomID: ", classID);
    const itemEdit = data.find((item) => item.classID === classID);
    console.log("Item to edit: ", itemEdit);
    if (!itemEdit) {
      console.error("Item not found for editing: ", classID);
      return;
    }

    setEdtitData({
      ClassID: itemEdit.classID || "N/A",
      ClassName: itemEdit.className || "N/A",
      LessonPerWeek: itemEdit.className || "N/A",
      ClassNumWeek: itemEdit.classNumWeek || "N/A",
      BeginDate: itemEdit.beginDate || "N/A",
      EndDate: itemEdit.endDate || "N/A",
      CourseID: itemEdit.courseID || "N/A",
      StudentOfClass: itemEdit.studentOfClass || "N/A",
      TeacherOfClass: itemEdit.teacherOfClass || "N/A",
    });

    setIsEditOpen(true);
    console.log("Editing item: ", editData);
  };

  const fecthAdminsAccounts = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/api/admin/room")
      // console.log("Fetched course: ", res.data);

      // const list = res.data.listUsers || [];

      // const fromatted = list.map((item, index) => ({
      //   roomID: item.RoomID || "N/A",
      //   roomName: item.RoomName || "N/A",
      //   note: item.Note || "N/A",
      // }));

      const fromatted = [
        {
          classID: "CL001",
          className: "Lớp Toán",
          lessonPerWeek: 3,
          classNumWeek: 4,
          beginDate: "2023-09-01",
          endDate: "2023-12-01",
          courseID: "C001",
          studentOfClass: "Lê Nhựt Duy, Cao Xuân Nam",
          teacherOfClass: "T001",
        },
        {
          classID: "CL002",
          className: "Lớp Lý",
          lessonPerWeek: 2,
          classNumWeek: 4,
          beginDate: "2023-09-01",
          endDate: "2023-12-01",
          courseID: "C002",
          studentOfClass: "Đăng Hoài Thương, Đức Thịnh",
          teacherOfClass: "T002",
        },
        {
          classID: "CL003",
          className: "Lớp Hóa",
          lessonPerWeek: 2,
          classNumWeek: 4,
          beginDate: "2023-09-01",
          endDate: "2023-12-01",
          courseID: "C003",
          studentOfClass: "Nguyễn Thị Mai, Trần Văn A",
          teacherOfClass: "T003",
        },
      ];
      console.log("Formatted data: ", fromatted);
      setData(fromatted);
    } catch (err) {
      console.log("Error fetching information course: ", err);
    }
  };

  useEffect(() => {
    fecthAdminsAccounts();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      fecthAdminsAccounts();
    }

    try {
      // const res = await axios.get(
      //   "http://localhost:4000/api/admin/room/search",
      //   {
      //     params: { roomID: searchTerm}
      //   }
      // );
      // console.log("Search results: ", res.data);
      // const list = res.data.Room || [];

      // const formatted = list.map((item, index) => ({
      //   roomID: item.RoomID || "N/A",
      //   roomName: item.RoomName || "N/A",
      //   note: item.Note || "N/A",
      // }));
      // Bỏ phần gọi API, gán dữ liệu mẫu
      const formatted = [
        {
          classID: "CL001",
          className: "Lớp Toán",
          lessonPerWeek: 3,
          classNumWeek: 4,
          beginDate: "2023-09-01",
          endDate: "2023-12-01",
          courseID: "C001",
          studentOfClass: "Lê Nhựt Duy, Cao Xuân Nam",
          teacherOfClass: "T001",
        },
        {
          classID: "CL002",
          className: "Lớp Lý",
          lessonPerWeek: 2,
          classNumWeek: 4,
          beginDate: "2023-09-01",
          endDate: "2023-12-01",
          courseID: "C002",
          studentOfClass: "Đăng Hoài Thương, Đức Thịnh",
          teacherOfClass: "T002",
        },
        {
          classID: "CL003",
          className: "Lớp Hóa",
          lessonPerWeek: 2,
          classNumWeek: 4,
          beginDate: "2023-09-01",
          endDate: "2023-12-01",
          courseID: "C003",
          studentOfClass: "Nguyễn Thị Mai, Trần Văn A",
          teacherOfClass: "T003",
        },
      ];

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
      // await axios.delete("http://localhost:4000/api/admin/room", {
      //   data: { roomID: item },
      // });

      // Recall the getdatabase
      fecthAdminsAccounts();
      setItem(null);
    } catch (err) {
      console.error("Error deleting teacher account: ", err);
    }
  };

  const handleAddSubmit = async (formData) => {
    const body = {
      roomID: formData.RoomID || "N/A",
      roomName: formData.RoomName || "N/A",
      note: formData.Note || "N/A",
    };
    console.log("Adding new room with data: ", body);

    const res = await axios.post("http://localhost:4000/api/admin/room", body);

    if (res?.data?.msg === "UserID already exists") {
      const err = new Error(res.data.msg);
      err.response = { data: { message: res.data.msg } };
      throw err;
    }

    await fecthAdminsAccounts();
  };

  const handleUpdateSubmit = async (formData) => {
    const body = {
      roomID: formData.RoomID || "N/A",
      roomName: formData.RoomName || "N/A",
      note: formData.Note || "N/A",
    };

    console.log("Updating room with data: ", body);

    await axios.put("http://localhost:4000/api/admin/room", body);
    await fecthAdminsAccounts();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar activate={activate} setActivate={setActivate} current={5} />
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

      <AddForm
        fields={addFields}
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onSubmit={handleAddSubmit}
        buttonLabel="Add"
      />

      <AddForm
        fields={addFields}
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
