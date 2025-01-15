import { useNavigate } from "react-router-dom"
import { useFetchUserByIdQuery } from "../../Redux/Slice/usersApiSlice";
import { useState,useEffect } from "react";
import supabase from "../../config/supabaseClient";
import { CgProfile } from "react-icons/cg";
export const UserProfile = () => {
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate(-1);
  }
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      if (data?.user?.id) {
       
        setUserId(data.user.id);
      }
    };
    fetchUser();
  }, []);

  const { data: userDetails, isLoading, error } = useFetchUserByIdQuery(userId, {
    skip: !userId,
  });

  if (isLoading || !userId) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;
  if (userDetails?.length === 0) return <p>No user data found.</p>;

  const user = userDetails[0]; // Access the first (and only) user object
 
 
  return (
    <div className='w-11/12 p-[10px] h-full rounded-[10px] flex items-center justify-center '>
       
       <div className='md:w-[500px] md:h-[500px] w-auto h-auto md:p-0 p-[20px] bg-[#EEEEEE] flex items-center justify-center flex-col gap-[30px] rounded-[10px]'>
       <CgProfile className='w-[100px] h-[100px] text-[#213555]'/>
            <div className='w-full h-auto flex items-center justify-center flex-row gap-[10px]'>
               
                <div className='md:w-1/2 w-auto h-auto flex flex-col  gap-[5px]'>
                    <h1 className='w-auto md:text-4xl md:leading-[19px] text-2xl leading-[14px]  text-[#3E5879] uppercase'> <label>{user.name} </label></h1>
                    <h1 className='w-auto  md:text-xl md:leading-[19px]  text-xl leading-[14px] text-[#3E5879] '><label> {user.email} </label></h1>
                    {/* <h1 className='w-auto text-xl leding-[19px] text-[#3E5879]  '>Progress :<label>50%</label></h1>     */}
                </div>
            </div>
            <div className='w-full h-auto flex items-center justify-center '>
            <button onClick={handleGoback}  className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-lg leding-[19px] text-white rounded-[10px] ">Close</button>
            </div>
      </div>
    
    </div>
  )
}
