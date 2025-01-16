import { useNavigate } from "react-router-dom"
import { FaCircleArrowRight } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa";

export const LandingPage = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/Login');
      }
  return (
    <div className='w-full h-screen bg-[#3E5879] flex justify-center items-center flex-col gap-[40px]'>
         {/* <TbBrandJavascript className="text-[#EEEEEE] text-8xl"/> */}
         <h1 className="md:text-8xl text-4xl font-bold flex flex-row text-[#EEEEEE] gap-[5px] items-center">EDUCODE<FaLaptopCode className="md:text-8xl text-4xl text-[#EEEEEE]"/></h1>
         <div className="flex justify-center items-center flex-col gap-[20px]">
            <div className="flex justify-center items-center flex-col gap-[10px]">
              <h1 className='md:text-4xl text-2xl font-bold text-[#EEEEEE]'>Hey There !!!!</h1>
              <p className='md:text-xl text-md font-medium text-center text-[#EEEEEE]'>Looking for a platform to practice javaScript?<br/>Then you have reached the right place.<br/>
              Let's Improve your javaScript with <strong className="md:text-2xl text-xl">EduCode</strong></p>
            </div>
            <button onClick={handleNavigation} className='w-auto py-[15px] px-[30px] h-auto bg-gray-100 hover:bg-gray-400 flex items-center text-[#3E5879] text-lg font-medium gap-[10px] rounded-full'>Let's Start <FaCircleArrowRight className="text-[#3E5879] text-2xl"/></button>
         </div>
        
    </div>
  )
}
