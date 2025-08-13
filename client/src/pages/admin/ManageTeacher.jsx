import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import TeacherIcon from "../../assets/Teacher_icon.svg?react";
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

  const Columns = ["id", "name", "dob", "password"];

  const addFields = [
    {
      label: "Phone Number",
      name: "userID",
      type: "text",
      placeholder: "Enter your phone number (UserID)",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      label: "Birthday",
      name: "birthday",
      type: "date",
      placeholder: "Enter your birthday",
    }

  ];

  const onDelete = (items) => {
    console.log("Delete items: ", items);
    setItem(items);
    setShowConfirm(true);
  };

  const onEdit = async (userID) => {
   console.log("Edit userID: ", userID)
   const itemEdit = data.find((item) => item.id === userID)
   if (!itemEdit) {
     console.error("Item not found for editing: ", userID)
     return
   }

   setEdtitData({
    userID : itemEdit.id,
    fullName: itemEdit.name,
    birthday: itemEdit.dob,
    password: itemEdit.password,
    role: "teacher"
   })

   setIsEditOpen(true);

   console.log("Editing item: ", itemEdit);
  };

  const fecthAdminsAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/account", {
        params: { role: "teacher" },
      });
      console.log("Fetched teacher accounts: ", res.data);

      const list = res.data.listUsers || [];

      const fromatted = list.map((item, index) => ({
        id: item.UserID || "N/A",
        name: item.FullName || "N/A",
        dob: item.Birthday || "N/A",
        password: item.Password || "N/A",
      }));
      setData(fromatted);
    } catch (err) {
      console.log("Error fetching teacher accounts: ", err);
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
        "http://localhost:4000/api/admin/account/search",
        {
          params: { userID: searchTerm, role: "teacher" },
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
      console.error("Error searching teacher accounts: ", err);
    }
  };

  const handleDelete = async () => {
    console.log("Deleting items: ", item);
    if (!item) return;

    try {
      await axios.delete("http://localhost:4000/api/admin/account", {
        data: { userID: item },
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
      userID: formData.userID,
      password: formData.password,
      fullName: formData.fullName,
      birthday: formData.birthday,
      role: "teacher",
    };

    const res = await axios.post("http://localhost:4000/api/admin/account", body);

    if (res?.data?.msg === "UserID already exists") {
      const err = new Error(res.data.msg);
      err.response = { data: { message: res.data.msg } };
      throw err;
    }

    await fecthAdminsAccounts();
  };

  const handleUpdateSubmit = async (formData) => {
    const body = {
      userID: formData.userID,
      password: formData.password,
      fullName: formData.fullName,
      birthday: formData.birthday,
      role: "teacher",
    };

    await axios.put("http://localhost:4000/api/admin/account", body);
    await fecthAdminsAccounts();
  }


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar activate={activate} setActivate={setActivate} current={2} />
      </div>

      <div className="flex flex-col min-h-screen">
        <div
          className={`${activate ? "pl-[80px]" : "pl-[239px]"
            } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Teacher Management"
                subTitle="Manage all teachers of the center"
                Icon={TeacherIcon}
              />
            </div>

            <div className="flex items-stretch ">
              <div className="flex-1 px-1 sm:px-3 sm:py-2 pl-3">
                <SearchBar
                  inputText="Enter Teacher Name or UserID"
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
                  console.log("Add new teacher"), setIsAddOpen(true);
                }}
                className="flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                <Plus />
                <p>Add</p>
              </button>
            </div>

            <div className="px-3 py-3">
              <PaginatedTable
                headers={["UserID", "FullName", "Birthday", "Password", "Actions"]}
                data={data}
                onEdit={onEdit}
                onDelete={onDelete}
                columns = {Columns}
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
