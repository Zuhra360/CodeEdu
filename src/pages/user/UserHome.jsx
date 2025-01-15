import React from 'react'
import { Navbar } from '../../components/User/Navbar'
import { HomePage } from '../../components/User/HomePage'
export const UserHome = () => {
  
  return (
    <div className='w-full md:h-screen h-auto pb-[10px] bg-[#213555] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <HomePage/>


    </div>
  )
}
