import { CgProfile } from "react-icons/cg";
import { RiNotification2Fill } from "react-icons/ri";
import { FaLaptopCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-hot-toast';
import supabase from "../../config/supabaseClient";
export const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/ProfilePage')
  }
  // const handleGoback = () => {
  //   navigate(-1);
  // }
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      toast.success('Logged out successfully!');
      navigate('/'); // Replace '/login' with your login route
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className='w-full h-[100px] py-[20px] flex items-center bg-[#727D73] justify-center '>
        <div className='w-11/12 h-[50px] py-[10px] px-[10px] bg-[#EEEEEE] flex items-center flex-row justify-between rounded-[10px]'>
          <div className="h-[20px] w-auto flex items-center flex-row gap-[5px] ">
            <h1 className="  text-bold text-3xl leading-[19px] text-[#1D1616]">EduCode</h1>
            <FaLaptopCode className="w-[30px] h-[30px] text-[#1D1616]"/>
           </div>
          <div className="w-auto h-full  flex flex-row gap-[20px] ">
          <button><RiNotification2Fill className="w-[30px] h-[30px] text-[#1D1616] hover:text-[#727D73]"/></button>
          <button onClick={handleNavigation}><CgProfile  className="w-[30px] h-[30px] text-[#1D1616] hover:text-[#727D73]"/></button>
          <button onClick={handleLogout}><FiLogOut className="w-[24px] h-[24px]  text-[#1D1616] hover:text-[#727D73]"/></button>
          </div>
        </div>

    </div>
  )
}
