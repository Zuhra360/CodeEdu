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
    <div className='w-[calc(100%-290px)] absolute left-[250px] h-[600px]  rounded-[10px] flex items-center justify-center'>
        <div className='w-[500px] h-[500px] p-[10px] bg-[#EEEEEE] flex items-center justify-center flex-col gap-[50px] gap-[30px] rounded-[10px]'>
            <CgProfile className='w-[100px] h-[100px] text-[#213555]'/>
            <div className='w-full h-auto flex items-center justify-center flex-row gap-[10px]'>
                <div className='w-1/3 h-auto flex flex-col gap-[5px]'>
                    <h1 className='w-auto text-xl leding-[19px] text-[#213555] border-[#213555] border-b-[3px] border-r-[3px] '>Username  </h1>
                    <h1 className='w-auto text-xl leding-[19px] text-[#213555] border-[#213555] border-b-[3px] border-r-[3px] '>Email </h1>
                    {/* <h1 className='w-auto text-xl leding-[19px] text-[#213555] border-[#213555] border-b-[3px] border-r-[3px] '>Progress</h1>  */}
                </div>
                <div className='w-2/3 h-auto flex flex-col gap-[5px]'>
                    <h1 className='w-auto text-xl leding-[19px] text-[#213555] border-[#213555] border-b-[3px] drop-shadow-lg'> {user[0].name}  </h1>
                    <h1 className='w-auto text-xl leding-[19px] text-[#213555] border-[#213555] border-b-[3px]'>{user[0].email} </h1>
                    {/* <h1 className='w-auto text-xl leding-[19px] text-[#213555] border-[#213555] border-b-[3px]'>50%</h1>  */}
                </div>
            </div>
            <div className='w-full h-auto flex items-center justify-center flex-row gap-[10px]'>
            {/* <button onClick={()=> handleDeleteUser(userId)} className="w-[130px] h-[30px] py-[1px] px-[10px] bg-[#9a6c49] text-white rounded-[10px] ">Delete User</button> */}
            <button onClick={handleGoBack} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-lg font-medium text-white rounded-[10px] ">Close</button>
            </div>
       
        </div>
  </div>
  )
}
