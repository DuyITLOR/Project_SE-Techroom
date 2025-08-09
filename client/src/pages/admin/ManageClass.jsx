import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBanner from "../../components/TitleBanner";
import SearchBar from "../../components/SearchBar";
import SummaryCard from "../../components/SummaryCard";
import PaginatedTable from "../../components/Table/PaginatedTable";
import ConfirmPopup from "../../components/Table/ConfirmPopup";
import AddForm from "../../components/AddForm";

import ClassIcon from "../../assets/users.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import Plus from "../../assets/plus.svg?react";

const ManageClass = () => {
  const [activate, setActivate] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const addFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
  ];

  const onDelete = (items) => {
    console.log("Delete items: ", items);
    setItem(items);
    setShowConfirm(true);
  };

  const onEdit = (items) => {
    console.log("Edit items: ", items);
  };

  const fecthAdminsAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/account", {
        params: { role: "admin" },
      });
      console.log("Fetched admin accounts: ", res.data);

      const list = res.data.listUsers || [];

      const fromatted = list.map((item, index) => ({
        id: item.UserID || "N/A",
        name: item.FullName || "N/A",
        dob: item.Birthday || "N/A",
      }));
      setData(fromatted);
    } catch (err) {
      console.log("Error fetching admin accounts: ", err);
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
      console.error("Error deleting admin account: ", err);
    }
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
            activate ? "pl-[80px]" : "pl-[239px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Class Management"
                subTitle="HIIIIIIII"
                Icon={ClassIcon}
              />
            </div>

            <div className="flex items-stretch ">
              <div className="flex-1 px-1 sm:px-3 sm:py-2 pl-3">
                <SearchBar
                  inputText="Enter Class Name"
                  Icon={SearchIcon}
                  onSearch={handleSearch}
                />
              </div>
              <div className="px-1 py-1 sm:py-2 sm:px-2  pr-2">
                <SummaryCard number={data.length} name="Total Classes" />
              </div>
            </div>

            <div className="px-3">
              <button
                onClick={() => {
                  console.log("Add new class"), setIsOpen(true);
                }}
                className="flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                <Plus />
                <p>Add</p>
              </button>
            </div>

            <div className="px-3 py-3">
              <PaginatedTable
                headers={["ClassID", "ClassNam", "Birthday", "Actions"]}
                data={data}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            activate ? "w-full" : "w-[calc(100%-223px)]"
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

      <AddForm fields={addFields} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ManageClass;
