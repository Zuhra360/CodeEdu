import { Navbar } from '../../components/User/Navbar'
import { TaskPractice } from '../../components/User/TaskPractice'

export const PracticePage = () => {
  return (
    <div className='w-full h-auto pb-[10px] bg-[#213555] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <TaskPractice/>
    </div>
  )
}
