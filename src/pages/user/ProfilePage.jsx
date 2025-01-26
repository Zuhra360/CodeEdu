import React from 'react'
import { Navbar } from '../../components/User/Navbar'
import { UserProfile } from '../../components/User/UserProfile'
import { Footer } from '../../components/shared/Footer/Footer'


export const ProfilePage = () => {
  return (
     <div className='w-full h-auto bg-[#727D73] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <UserProfile/>   
      <Footer/>  
    </div>
  )
}
