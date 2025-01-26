import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useDeleteUserMutation, useFetchUserByIdQuery } from '../../../Redux/Slice/usersApiSlice';
import { useParams } from 'react-router-dom';

export const UserDetails = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    const { userId } = useParams(); 
    const { data: user, error, isLoading } = useFetchUserByIdQuery(userId);
    const [deleteUser] = useDeleteUserMutation();

  
    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
    };
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.data}</p>;
    if (!user || user.length === 0) {
        return <p>User not found.</p>;
      };
    
    
  return (
    <div className='md:w-[calc(100%-290px)] w-auto absolute md:left-[250px] left-[190px] md:h-[600px] h-auto rounded-[10px] flex items-center justify-center'>
        <div className='md:w-[500px] md:h-[500px] w-auto h-auto p-[10px] bg-[#EEEEEE] flex items-center justify-center flex-col gap-[50px] gap-[30px] rounded-[6px]'>
            <CgProfile className='w-[100px] h-[100px] text-[#727D73]'/>
            <div className='w-full h-auto flex items-center justify-center flex-row gap-[10px]'>
                
                <div className='md:w-2/3 w-auto h-auto flex flex-col gap-[5px]'>
                    <h1 className='w-auto   text-[#727D73]  flex flex-col gap-[5px]'><label className="text-md ">UserName </label> <label className="text-lg uppercase bg-white"> {user[0].name}  </label></h1>
                    <h1 className='w-auto   text-[#727D73]  flex flex-col gap-[5px]'><label className="text-md ">UserName </label> <label className="text-lg  bg-white">{user[0].email}   </label></h1>
                </div>
            </div>
            <div className='w-full h-auto flex items-center justify-center flex-row gap-[10px]'>
            {/* <button onClick={()=> handleDeleteUser(userId)} className="w-[130px] h-[30px] py-[1px] px-[10px] bg-[#9a6c49] text-white rounded-[10px] ">Delete User</button> */}
            <button onClick={handleGoBack} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#638C6D] hover:bg-[#AAB99A] text-lg font-medium text-white rounded-[3px] ">Close</button>
            </div>
       
        </div>
  </div>
  )
}
