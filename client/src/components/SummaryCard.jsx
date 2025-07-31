import React from 'react'

const SummaryCard = ({number, name}) => {
  return (
    <div className=  'flex flex-col justify-center bg-green-200 border border-green-300 shadow-md rounded-xl text-green-700'>
        <div className='flex flex-col items-center px-3 py-1 sm:px-6 sm:py-1'>
            <h1 className='font-bold text-xs sm:text-xl'>{number}</h1>
            <h2 className='font-family text-[8px] sm:text-base'>{name}</h2>
        </div>
    </div>
  )
}

export default SummaryCard