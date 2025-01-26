import { Footer } from '../../components/shared/Footer/Footer'
import { Navbar } from '../../components/User/Navbar'
import { NoteView } from '../../components/User/NoteView'

export const ViewNotes = () => {
  return (
    <div className='w-full  md:h-fit  sm:h-auto bg-[#727D73] flex items-center flex-col gap-[10px]'>
      <Navbar/>
      <NoteView/>
      <Footer/>
    </div>
  )
}
