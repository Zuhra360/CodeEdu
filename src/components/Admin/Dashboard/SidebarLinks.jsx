import { HiUsers } from "react-icons/hi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { SiGooglebigquery } from "react-icons/si";
import { GrNotes } from "react-icons/gr";


export const Sidebardata = [
    {
      link: "CurrentUsers",
      name : "Users",
      icon : <HiUsers className="w-[24px] h-[24px] md:text-xl sm:text-lg  text-[#EEEEEE] "/>,
    },
    {
      link: "Problems",
      name: "Problems",
      icon: <SiGooglebigquery className="w-[24px] h-[24px] text-[#EEEEEE]"/>,
    },
    {
      link: "Notes",
      name: "Notes",
      icon: <GrNotes className="w-[24px] h-[24px] text-[#EEEEEE] " />,
    },
    {
      link: "Settings",
      name: "Settings",
      icon: <IoMdSettings className="w-[24px] h-[24px]  text-[#EEEEEE] "/>,
    },
   
   
  ];
  // <MdOutlineTaskAlt />