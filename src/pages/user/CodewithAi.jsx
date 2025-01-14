import { LearnwithAi } from '../../components/User/LearnwithAi'
import { Navbar } from '../../components/User/Navbar'

export const CodewithAi = () => {
  return (
    <div className='w-full  md:h-fit pb-[10px] sm:h-auto bg-[#213555] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <LearnwithAi/>
    </div>
  )
}
