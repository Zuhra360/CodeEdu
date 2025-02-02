import { Footer } from '../../components/shared/Footer/Footer'
import { LearnwithAi } from '../../components/User/LearnwithAi'
import { Navbar } from '../../components/User/Navbar'

export const CodewithAi = () => {
  return (
    <div className='w-full  md:h-fit  sm:h-auto bg-[#727D73] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <LearnwithAi/>
      <Footer/>
    </div>
  )
}
