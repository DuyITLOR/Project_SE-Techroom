import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'
import TitleBanner from '../../components/TitleBanner'
import SearchBar from '../../components/SearchBar'
import AdminIcon from "../../assets/shield.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from '../../components/SummaryCard'
import exampleData from '../../assets/ExampleData'
import PaginatedTable from '../../components/Table/PaginatedTable'
import Plus from "../../assets/plus.svg?react";

const AdminDashBoard = () => {

  const [currentPage, setCurrentPage] = React.useState(1);

  const onDelete = (items) => {
    console.log("Delete items: ", items);
  }

  const onEdit = (items) => {
    console.log("Edit items: ", items);
  }


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className=' flex'>
        <div className="sticky top-0 z-40 h-screen ">
          <SideBar />
        </div>

        <div className='flex flex-col flex-1 justify-between pt-[72px] sm:pt-24 '>
          {/* Content will stay in this div */}
          <div>
            <div className='px-3 py-3'>
              <TitleBanner
                title="Admin Dashboard"
                subTitle="Manage all sub administrators of the center"
                Icon={AdminIcon}
              />
            </div>

            <div className='flex items-stretch '>
              <div className='flex-1 px-1 sm:px-3 sm:py-2 pl-3'>
                <SearchBar
                  inputText="Enter Administrator Name"
                  Icon={SearchIcon} />
              </div>
              <div className='px-1 py-1 sm:py-2 sm:px-2  pr-2'>
                <SummaryCard
                  number={10}
                  name="Total Accounts"
                />
              </div>
            </div>

            <div className = "px-3">
              <button
                onClick = {() => console.log("Add new admin")}
                className = "flex gap-1 bg-blue-500 text-white text-xl px-2 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus/>
                <p>Add</p>
                </button>
            </div>

            <div className='px-3 py-3'>
                <PaginatedTable
                  headers={['#', 'FullName', 'Birthday', 'Phone Number', 'Actions']}
                  data = {exampleData}
                  onEdit={ onEdit }
                  onDelete={ onDelete }
                />
            </div>

          </div>
        </div>
      </div>


      <div className='w-full'>
        <Footer />
      </div>
    </>
  )
}

export default AdminDashBoard;
