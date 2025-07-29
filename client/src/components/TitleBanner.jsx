import React from 'react'

const TitleBanner = ({title, subTitle, Icon}) => {
  return (
    <div className='px-4 py-6'>
        <div className='w-full h-[90px] px-2 py-2 flex justify-left items-center rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,_rgba(17,0,255,0.74)_-1.2%,_rgba(220,252,232,0.82)_94.58%)]
        shrink-0
        '>
            {Icon && <Icon className='w-10 h-10 text-white stroke-1'/>}
            <div className='px-2 '>
                <h1 className='font-family text-white text-3xl py-1'>{title}</h1>
                <h2 className='font-family text-white'>{subTitle}</h2>
            </div>
        
        </div>
    </div>
  )
}

export default TitleBanner