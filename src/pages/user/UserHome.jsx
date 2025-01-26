import React from 'react'
import { Navbar } from '../../components/User/Navbar'
import { HomePage } from '../../components/User/HomePage'
import { Footer } from '../../components/shared/Footer/Footer'
export const UserHome = () => {
  
  return (
    <div className='w-full md:h-screen h-auto  bg-[#727D73] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <HomePage/>
      <Footer/>


    </div>
  )
}
