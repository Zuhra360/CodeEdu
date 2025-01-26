import { useNavigate } from "react-router-dom"
import { FaCircleArrowRight } from "react-icons/fa6";
// import { TbBrandJavascript } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa";
import { Footer } from "../../../components/shared/Footer/Footer";
import  image1  from "../../../assets/images/Landingpage1.jpg";
import  image2  from "../../../assets/images/Landingpage4.jpg";
import  image3  from "../../../assets/images/Landingimg.jpg";
import  img1  from "../../../assets/images/Landingpage3.jpg";

export const LandingPage = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/Login');
      }
  return (
    <div className="w-full h-auto flex flex-col">
       <div className='w-full h-screen bg-[#727D73] flex justify-center items-center flex-col gap-[40px] bg-cover '
          >
         {/* <TbBrandJavascript className="text-[#EEEEEE] text-8xl"/> */}
            <h1 className="md:text-8xl text-6xl font-bold flex flex-row text-[#EEEEEE] gap-[5px] items-center">EDUCODE<FaLaptopCode className="md:text-8xl text-6xl text-[#EEEEEE]"/></h1>
            <div className="flex flex-row gap-[50px]">
                <div className="flex justify-center items-center flex-col  gap-[20px]">
                    <div className="flex justify-center items-center flex-col gap-[10px]">
                      <h1 className='md:text-4xl text-2xl font-bold text-[#EEEEEE]'>Hey There !!!!</h1>
                      <p className='md:text-xl text-md font-medium text-center text-[#EEEEEE]'>Looking for a platform to practice javaScript ?<br/>Then you have reached the right place.<br/>
                      Let's Improve your javaScript with <strong className="md:text-2xl text-xl">EduCode</strong></p>
                    </div>
                    <button onClick={handleNavigation} className='w-auto py-[15px] px-[50px] h-auto bg-gray-100 hover:bg-gray-400 flex items-center text-[#727D73] text-xl font-medium gap-[10px] rounded-full'>Let's Start <FaCircleArrowRight className="text-[#727D73] text-2xl"/></button>
                </div>
                <img src={img1} className="md:block hidden rounded-full"/>
            </div>
         
        </div>
        <div className="w-full md:h-screen h-auto bg-[#EEEEEE] md:px-[40px] py-[20px] flex md:flex-row flex-col items-center justify-center gap-[30px]">
          <div className="md:w-1/3 w-2/3 md:h-auto h-1/3 bg-[#EEEEEE] rounded-lg hover:box-shadow flex items-center justify-center flex-col gap-[5px]">
            <img src={image1} className="rounded-lg "/>
            <h1 className="w-auto h-auto text-3xl font-thin text-black">LEARN FOR FREE</h1>
          </div>
          <div className="md:w-1/3 w-2/3 md:h-auto h-1/3 bg-[#EEEEEE] rounded-lg  flex items-center justify-center flex-col gap-[5px]">
            <img src={image2} className="rounded-lg"/>
            <h1 className="w-auto h-auto text-3xl font-thin text-black">IMPROVE YOUR CODING</h1>
          </div>
          <div className="md:w-1/3 w-2/3 md:h-auto h-1/3 bg-[#EEEEEE] rounded-lg  flex items-center justify-center flex-col gap-[5px]">
            <img src={image3} className="rounded-lg"/>
            <h1 className="w-auto h-auto text-3xl font-thin text-black md:text-start text-center">LEARN WITH THE HELP OF AI</h1>
          </div>
          
        </div>
        <Footer/>
    </div>
    
  )
}
