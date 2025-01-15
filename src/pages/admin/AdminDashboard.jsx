import { Sidebar } from '../../components/Admin/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Admin/Dashboard/Navbar'

export const AdminDashboard = () => {
  return (
    <div className='w-full md:h-screen h-dvh bg-[#213555] flex flex-col'>
        <Navbar/>
        <div className='flex flex-row h-auto bg-[#213555] gap-[40px]'>
        <Sidebar/>
        <Outlet/>
        </div>
        
    </div>
  )
}
