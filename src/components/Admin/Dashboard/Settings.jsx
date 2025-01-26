import React from 'react'

export const Settings = () => {
  return (
    <div className='md:w-[calc(100%-290px)] w-[calc(100%-100px)] p-[10px] absolute md:left-[250px] left-[90px] md:h-[600px] h-auto bg-[#EEEEEE] rounded-[10px] flex md:flex-row flex-col gap-[20px]'>
      <button className="w-auto h-[40px] py-[1px] px-[10px] bg-[#889E73] hover:bg-[#AAB99A] text-white rounded-[10px] ">User Reviews</button>
      <button className="w-auto h-[40px] py-[1px] px-[10px] bg-[#889E73] hover:bg-[#AAB99A] text-white rounded-[10px] ">Edit Profile</button>
      <button className="w-auto h-[40px] py-[1px] px-[10px] bg-[#889E73] hover:bg-[#AAB99A] text-white rounded-[10px] ">Add Admin</button>      
    </div>
  )
}
