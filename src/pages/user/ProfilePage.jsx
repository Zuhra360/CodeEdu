import React from 'react'
import { Navbar } from '../../components/User/Navbar'
import { UserProfile } from '../../components/User/UserProfile'


export const ProfilePage = () => {
  return (
     <div className='w-full h-screen bg-[#213555] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <UserProfile/>     
    </div>
  )
}
