import React from 'react'

const ConfirmPopup = ({visible, onCancel, onConfirm}) => {
  if (!visible) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm'>
      <div className='flex flex-col items-center border-2 px-5 py-7 bg-white'>
        <h1 className='text-3xl underline'>Warning</h1>
        <h2 className='text-xl'>Are you sure you want to delete ?</h2>
        <div className='flex justify-center gap-20 pt-6'>
          <button className='text-white bg-blue-400 px-2 py-2 rounded-lg text-xl'
          onClick={onCancel}
          >Cancel</button>

          <button className='text-white bg-blue-400 px-2 py-2 rounded-lg text-xl'
          onClick={onConfirm}
          >Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPopup