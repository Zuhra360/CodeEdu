import React from 'react'

export const Settings = () => {
  return (
    <div className='md:w-[calc(100%-290px)] w-[calc(100%-190px)] p-[10px] absolute md:left-[250px] left-[190px] h-[600px] bg-[#EEEEEE] rounded-[10px] flex md:flex-row flex-col gap-[20px]'>
      <button className="w-auto h-[40px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-white rounded-[10px] ">User Reviews</button>
      <button className="w-auto h-[40px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-white rounded-[10px] ">Edit Profile</button>
      <button className="w-auto h-[40px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-white rounded-[10px] ">Add Admin</button>      
    </div>
  )
}
