
import { Sidebardata } from './SidebarLinks';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path)=>{
    navigate(path);
  }
  return (
    <div className='min-h-screen fixed overflow-y-auto  md:w-[210px] w-[150px] h-[600px] py-[20px] flex  items-center flex-col gap-[20px]  bg-[#EEEEEE] rounded-[10px]'>
       {Sidebardata.map((data,index) =>
        <button onClick={()=>handleNavigation(data.link)} key={index} className='md:w-[200px] w-full sm:px-[5px] h-[40px] bg-[#3E5879] hover:bg-[#213555] rounded-[10px] flex flex-row gap-[10px] justify-center items-center'>
          {data.icon}
          <label className='text-[#EEEEEE] md:text-2xl md:leading-[19px] sm:text-lg sm:leading-[12px]'>{data.name}</label></button>
       )
       }
       

    </div>
  )
}
