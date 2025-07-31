import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'
import TitleBanner from '../../components/TitleBanner'
import SearchBar from '../../components/SearchBar'
import AdminIcon from "../../assets/shield.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from '../../components/SummaryCard'

const AdminDashBoard = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="flex flex-col min-h-screen">
        <div className=' flex'>
          <div className="sticky top-0 z-40 h-screen ">
            <SideBar />
          </div>

          <div className='flex flex-col flex-1 justify-between pt-18 sm:pt-24'>
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
                <div className='flex-1 px-3 py-2'>
                  <SearchBar
                    inputText="Enter Administrator Name"
                    Icon={SearchIcon} />
                </div>
                <div className='py-2 px-2'>
                  <SummaryCard
                    number={10}
                    name="Total Accounts"
                  />
                </div>
              </div>
            </div>


            <Footer />
          </div>

        </div>


      </div>
    </>
  )
}

export default AdminDashBoard;
