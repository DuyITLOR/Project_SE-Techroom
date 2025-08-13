import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import CourseIcon from "../../assets/book.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from "../../components/SummaryCard";
import exampleData from "../../assets/ExampleData";
import PaginatedTable from "../../components/Table/PaginatedTable";
import Plus from "../../assets/plus.svg?react";
import axios from "axios";
import ConfirmPopup from "../../components/Table/ConfirmPopup";
import AddForm from "../../components/AddForm";


const ManageTeacher = () => {
  const [activate, setActivate] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEdtitData] = useState(null)

  const Columns = ["courseID", "courseName", "courseNumber", "syllabus", "equipment"];

  const addFields = [
    {
      label: "CourseID",
      name: "CourseID",
      type: "text",
      placeholder: "Enter your course ID",
    },
    {
      label: "CourseName",
      name: "CourseName",
      type: "text",
      placeholder: "Enter your course name",
    },
    {
      label: "CourseNumber",
      name: "CourseNumber",
      type: "number",
      placeholder: "Enter your course number",
    },
    {
      label: "Syllabus",
      name: "Syllabus",
      type: "text",
      placeholder: "Enter your syllabus",
    },
    {
      label: "Equipment",
      name: "Equipment",
      type: "text",
      placeholder: "Enter your equipment",
    }
  ];

  const onDelete = (items) => {
    console.log("Delete items: ", items);
    setItem(items);
    setShowConfirm(true);
  };

  const onEdit = async (courseID) => {
    console.log("Edit courseID: ", courseID)
    const itemEdit = data.find((item) => item.courseID === courseID)
    console.log("Item to edit: ", itemEdit)
    if (!itemEdit) {
      console.error("Item not found for editing: ", courseID)
      return
    }

    setEdtitData({
      CourseID: itemEdit.courseID || "N/A",
      CourseName: itemEdit.courseName || "N/A",
      CourseNumber: itemEdit.courseNumber || "N/A",
      Syllabus: itemEdit.syllabus || "N/A",
      Equipment: itemEdit.equipment || "N/A",
    })

    setIsEditOpen(true);
    console.log("Editing item: ", editData);
  };

  const fecthAdminsAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/course")
      console.log("Fetched course: ", res.data);

      const list = res.data.listUsers || [];

      const fromatted = list.map((item, index) => ({
        courseID: item.CourseID || "N/A",
        courseName: item.CourseName || "N/A",
        courseNumber: item.CourseNumber || "N/A",
        syllabus: item.Syllabus || "N/A",
        equipment: item.Equipment || "N/A",
      }));
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
      const res = await axios.get(
        "http://localhost:4000/api/admin/course/search",
        {
          params: { courseID: searchTerm}
        }
      );
      console.log("Search results: ", res.data);
      const list = res.data.Course || [];

      const formatted = list.map((item, index) => ({
        courseID: item.CourseID || "N/A",
        courseName: item.CourseName || "N/A",
        courseNumber: item.CourseNumber || "N/A",
        syllabus: item.Syllabus || "N/A",
        equipment: item.Equipment || "N/A",
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
      await axios.delete("http://localhost:4000/api/admin/course", {
        data: { courseID: item },
      });

      // Recall the getdatabase
      fecthAdminsAccounts();
      setItem(null);
    } catch (err) {
      console.error("Error deleting teacher account: ", err);
    }
  };

  const handleAddSubmit = async (formData) => {

    const body = {
      courseID: formData.CourseID || "N/A",
      courseName: formData.CourseName || "N/A",
      courseNumber: formData.CourseNumber || "N/A",
      syllabus: formData.Syllabus || "N/A",
      equipment: formData.Equipment || "N/A",
    };
    console.log("Adding new course with data: ", body);

    const res = await axios.post("http://localhost:4000/api/admin/course", body);

    if (res?.data?.msg === "UserID already exists") {
      const err = new Error(res.data.msg);
      err.response = { data: { message: res.data.msg } };
      throw err;
    }

    await fecthAdminsAccounts();
  };

  const handleUpdateSubmit = async (formData) => {
    const body = {
      courseID: formData.CourseID || "N/A",
      courseName: formData.CourseName || "N/A",
      courseNumber: formData.CourseNumber || "N/A",
      syllabus: formData.Syllabus || "N/A",
      equipment: formData.Equipment || "N/A",
    };

    await axios.put("http://localhost:4000/api/admin/course", body);
    await fecthAdminsAccounts();
  }


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar activate={activate} setActivate={setActivate} current={3} />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${activate ? "pl-[80px]" : "pl-[239px]"
            } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Course Management"
                subTitle="Manage all course of the center"
                Icon={CourseIcon}
              />
            </div>

            <div className="flex items-stretch ">
              <div className="flex-1 px-1 sm:px-3 sm:py-2 pl-3">
                <SearchBar
                  inputText="Enter Course Name"
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div className="px-1 py-1 sm:py-2 sm:px-2  pr-2">
                <SummaryCard number={data.length} name="Total Accounts" />
              </div>
            </div>

            <div className="px-3">
              <button
                onClick={() => {
                  console.log("Add new Course"), setIsAddOpen(true);
                }}
                className="flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                <Plus />
                <p>Add</p>
              </button>
            </div>

            <div className="px-3 py-3">
              <PaginatedTable
                headers={["CourseID", "CourseName", "CourseNumber", "Syllabus", "Equipment", "Actions"]}
                data={data}
                onEdit={onEdit}
                onDelete={onDelete}
                columns={Columns}
              />
            </div>
          </div>
        </div>
        <div
          className={`${activate ? "w-full" : "w-[calc(100%-223px)]"
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

export default ManageTeacher;
