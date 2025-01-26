import React from 'react'
import { FaLaptopCode , FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
export const Footer = () => {
  return (
    <div className='bg-gray-900 w-full h-[180px] md:p-[40px] p-[10px] flex items-center justify-center justify-between flex-row'>
       <div className="h-[20px] w-auto flex items-center flex-row gap-[5px] ">
        <h1 className=" md:text-bold text-medium text-xl md:text-3xl leading-[19px] text-gray-100">CodeEdu</h1>
        <FaLaptopCode className="w-[30px] h-[30px] text-gray-100"/>
       </div>
       <div className='h-[20px] w-auto flex items-center flex-row gap-[5px]'>
            <h1 className='md:text-xl text-sm font-normal md:font-medium text-gray-100'>FOLLOW US :</h1>
            <div className='flex flex-row gap-[10px]'>
                <FaInstagram className='text-xl font-semibold text-[#EEEEEE]'/>
                <FaSquareXTwitter className='text-xl font-semibold text-[#EEEEEE]'/>
                <FaLinkedin className='text-xl font-semibold text-[#EEEEEE]'/>
            </div>    
       </div>
    </div>
  )
}
