import React from 'react'
import RoboticLogo from '../assets/Robotic_Logo.svg'
import account from '../assets/account.svg'
import arrow_down_login from '../assets/arrow_down_login.svg'

const Header = () => {
  return (
    <div className='w-full bg-[linear-gradient(90deg,_#2563EB_0%,_#4880A5_100%)] px-1 flex items-center justify-between'>
        <img src={RoboticLogo} alt="logo" className='w-[120px] h-[65px] sm:w-[163px] sm:h-[89px] object-contain ml-5'/>
        <div className='flex items-center justify-end px-3 sm:px-10'>
          <span className='inline-block px-2 py-1 sm:px-3 bg-[#1932b1] text-white text-1xl sm:text-2xl font-family border border-[#1932b1] rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]'>TECHROOM</span>
          <img src={account} alt=""  className=' ml-3.5 w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] text-white'/>
          <img src={arrow_down_login} alt="" className='w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]'/>
        </div>
    </div>
  );
};

export default Header;
