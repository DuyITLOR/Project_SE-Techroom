import React from 'react'
import RoboticLogo from '../assets/Robotic_Logo.svg'

const Footer = () => {
  return (
    <>
      <div className='w-full max-h-[250px] h-auto bg-[linear-gradient(90deg,_#162C4B_100%,_#111827_100%)]  flex items-center justify-center'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-3 justify-between items-center gap-x-24 px-4 pt-2'>
          <div className='flex justify-start sm:justify-start mb-4 sm:mb-0'>
            <img src={RoboticLogo} 
            alt="logo" 
            className='w-[100px] sm:w-[220px] md:w-[250px] object-contain self-start' />
          </div>

          <a href="https://maps.app.goo.gl/dLJgCEtYUGq1ZpXb9"
            target='_blank'
            className='font-family text-white text-[8px] sm:text-[15px] leading-[1.5] tracking-[0.9px] text-left sm:text-left mb-4 sm:mb-0'>
            Địa chỉ: Phòng I86, Tòa nhà I Trường Đại học Khoa học Tự nhiên ĐHQG - HCM 227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh
          </a>

          <div className='tracking-[0.9px] leading-[1.5] text-white font-family text-[8px] sm:text-[14px] py-1 sm:py-2 '>
            <ul className='text-[10px] sm:text-[15px]'>
              <li>
                <a href="https://www.facebook.com/RoboticsHCMUS">
                  Facebook: Robotics & IoT HCMUS</a>
              </li>

              <li>
                <span>Email: robotics@hcmus.edu.vn</span>
              </li>

              <li>
                <span>Hotline (Zalo): 0366 399 748</span>
              </li>

              <li>
                <a href="https://www.youtube.com/@RoboticsIoTClubHCMUS">
                  Youtube: @RoboticsIoTClubHCMUS
                </a>
              </li>
                
              <li>
                <a href="https://www.tiktok.com/@roboticsiotclubhcmus">
                  Tiktok: @roboticsiotclubhcmus</a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>

  )
}

export default Footer