import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../../../Redux/Slice/usersApiSlice";

export const CurrentUsers = () => {
  const navigate = useNavigate();
  const handleNavigation = (userId) => {
    navigate(`/AdminDashboard/UserDetails/${userId}`)
  }
  const { data:users , error, isLoading } = useFetchUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data}</p>;
  
  return (
    <div className='md:w-[calc(100%-290px)] w-[calc(100%-190px)] overflow-auto p-[10px] absolute md:left-[250px] left-[190px] h-[600px] bg-[#EEEEEE] rounded-[10px] flex flex-col gap-[5px]'>
       {users.map((user) => (
      <div key={user.id} className="w-[calc(100%-10px)] h-[40px] px-[10px] flex justify-between flex-row items-center bg-white rounded-[10px] ">       
          <div  className="w-auto h-full flex items-center flex-row gap-[10px] ">
          <CgProfile className="w-[25px] h-[25px] text-[#213555]"/>
            <h1 className=" md:text-lg  text-sm font-medium leading-[19px] text-[#213555]"> {user.name }</h1>
          </div>
        <button onClick={() => handleNavigation(user.id)} className="w-auto h-[30px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] md:font-medium font-normal text-sm md:text-md text-white rounded-[10px] ">View User</button>
      </div>
       ))}

       
    </div>
  )
}
