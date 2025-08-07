import React, {useEffect, useState} from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'
import TitleBanner from '../../components/TitleBanner'
import SearchBar from '../../components/SearchBar'
import AdminIcon from "../../assets/shield.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from "../../components/SummaryCard";
import exampleData from "../../assets/ExampleData";
import PaginatedTable from "../../components/Table/PaginatedTable";
import Plus from "../../assets/plus.svg?react";
import axios from 'axios'

const AdminDashBoard = () => {
  // const [currentPage, setCurrentPage] = usestate(1);
  const [activate, setActivate] = useState(0);

  const [data, setData] = useState([])

  const onDelete = (items) => {
    console.log("Delete items: ", items);
  };

  const onEdit = (items) => {
    console.log("Edit items: ", items);
  };

  useEffect(() => {
    const fecthAdminsAccounts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/admin/student', {params: {role: 'admin'}});
        console.log("Fetched admin accounts: ", res.data);

        const list = res.data.listUsers || []

        const fromatted = list.map((item, index) => ({
          id: item.UserID || 'N/A',
          name: item.FullName || 'N/A',
          dob: item.Birthday || 'N/A',
          phone: 'N/A',
        }))
        setData(fromatted);
      } 
      catch (err)
      {
        console.log('Error fetching admin accounts: ', err);
      }
    }
    fecthAdminsAccounts();
  }, [])



  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="fixed top-0 z-40 h-screen ">
        <SideBar activate={activate} setActivate={setActivate} />
      </div>

      <div className="flex-col">
        <div
          className={`${
            activate ? "pl-[80px]" : "pl-[239px]"
          } flex flex-col w-[calc(100%-225px] justify-between pt-[72px] sm:pt-24 transition-all duration-200`}>
          {/* Content will stay in this div */}
          <div>
            <div className="px-3 py-3">
              <TitleBanner
                title="Admin Dashboard"
                subTitle="Manage all sub administrators of the center"
                Icon={AdminIcon}
              />
            </div>

            <div className="flex items-stretch ">
              <div className="flex-1 px-1 sm:px-3 sm:py-2 pl-3">
                <SearchBar
                  inputText="Enter Administrator Name"
                  Icon={SearchIcon}
                />
              </div>
              <div className="px-1 py-1 sm:py-2 sm:px-2  pr-2">
                <SummaryCard number={10} name="Total Accounts" />
              </div>
            </div>

            <div className="px-3">
              <button
                onClick={() => console.log("Add new admin")}
                className="flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                <Plus />
                <p>Add</p>
              </button>
            </div>

            <div className='px-3 py-3'>
                <PaginatedTable
                  headers={['#', 'FullName', 'Birthday', 'Phone Number', 'Actions']}
                  data = {data}
                  onEdit={ onEdit }
                  onDelete={ onDelete }
                />
            </div>
          </div>
        </div>
        <div
          className={`${
            activate ? "w-full" : "w-[calc(100%-223px)]"
          } transition-all duration-200 ml-auto`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
