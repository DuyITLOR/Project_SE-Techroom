import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'
import TitleBanner from '../../components/TitleBanner'
import SearchBar from '../../components/SearchBar'
import AdminIcon from "../../assets/shield.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import SummaryCard from '../../components/SummaryCard'
import TableContent from '../../components/TableContent'

const AdminDashBoard = () => {


  const exampleData = [
    {
      id: 1,
      name: "Lê Nhựt Duy",
      dob: "15/11/2005",
      phone: "0914813749",
      password: "Ind12345",
    },
  ];

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

            <TableContent
              headers={["#", "Name", "Ngày Sinh", "SDT", "Password", "Action"]}
              data={exampleData}
              currentPage={1}
              totalPages={100}
              onPageChange={(page) => console.log("Go to page", page)}
              renderRow={(row, index) => (
                <tr key={row.id} className="text-center border-b">
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.dob}</td>
                  <td>{row.phone}</td>
                  <td>{row.password}</td>
                  <td>
                    <button className="text-red-500 hover:text-red-700">🗑</button>
                  </td>
                </tr>
              )}
            />


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
