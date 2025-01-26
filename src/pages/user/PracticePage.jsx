import { Footer } from '../../components/shared/Footer/Footer'
import { Navbar } from '../../components/User/Navbar'
import { TaskPractice } from '../../components/User/TaskPractice'

export const PracticePage = () => {
  return (
    <div className='w-full h-auto  bg-[#727D73] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <TaskPractice/>
      <Footer/>
    </div>
  )
}
