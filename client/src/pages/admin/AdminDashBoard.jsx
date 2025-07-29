import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'

const AdminDashBoard = () => {
  return (
    <div
    className="
  flex 
  flex-col 
  min-h-screen
  bg-[linear-gradient(244deg,_rgba(248,_250,_252,_0.90)_0%,_rgba(241,_245,_249,_0.90)_100%)]">
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header />
    </div>
    <div className="sticky top-0 z-40 ">
      <SideBar />
    </div>

    <div className='flex-1'>
          <TitleBanner
            title={"Administrators Management"}
            subTitle={"Manage all sub administrators of the center"}
            Icon= {AdminIcon} cl
          />
    </div>

    <div className="flex flex-1">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="h-[2000px]"> </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default AdminDashBoard;
