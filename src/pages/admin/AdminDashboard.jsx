import { Sidebar } from '../../components/Admin/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Admin/Dashboard/Navbar'

export const AdminDashboard = () => {
  return (
    <div className='w-full h-screen bg-[#213555] flex flex-col'>
        <Navbar/>
        <div className='flex flex-row gap-[40px]'>
        <Sidebar/>
        <Outlet/>
        </div>
        
    </div>
  )
}
