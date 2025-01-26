import { FaStickyNote } from "react-icons/fa";
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { LuSquarePen } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import supabase from "../../config/supabaseClient";
import { useEffect,useState } from "react";
export const HomePage = () => {
  const [fetchError , setFetchError] = useState(null);
  const [ questions , setQuestions ] = useState(null);
  
  useEffect(() => {
    const fetchQuestionsWithStatus = async () => {
      try {
        // Get the current authenticated user's ID
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Error fetching user:", userError);
          setFetchError("Could not fetch user information.");
          return;
        }

        const userId = user?.id; // Extract user ID

        if (!userId) {
          setFetchError("No authenticated user found.");
          return;
        }

        // Fetch questions and their statuses
        const { data, error } = await supabase
          .from("Questions")
          .select(`
            id,
            Question,
            Title,
            UserQuestionsStatus (
              status
            )
          `)
          .eq("UserQuestionsStatus.user_id", userId);

        if (error) {
          setFetchError("Could not fetch questions with status.");
          setQuestions([]);
          console.error("Error fetching questions:", error);
          return;
        }

        setQuestions(data);
        setFetchError(null);
      } catch (err) {
        console.error("Unexpected error:", err);
        setFetchError("An unexpected error occurred.");
      }
    };

    fetchQuestionsWithStatus();
  }, []);

  const navigate = useNavigate();
  const handlebuttonClick = () => {
     navigate('/CodewithAi');
  }
  const handlebuttonNote = () => {
    navigate('/ViewNotes');
 }
  const handleNavigation = (id) => {
    navigate(`/PracticePage/${id}`);
 }
 console.log("Fetch Error:", fetchError); // Logs fetch errors
 
  return (
    <div className='w-11/12 p-[10px] md:h-[650px] sm:h-auto h-full bg-[#EEEEEE] rounded-[10px] flex  flex-col gap-[20px]'>
      
      {fetchError && ( <p>{fetchError}</p>)}
      {questions && (
        <div className="flex flex-col sm:w-full gap-[10px]">
          <div className='w-auto h-[40px] py-[10px] px-[20px] flex flex-row gap-[10px]'>
            <button onClick={handlebuttonClick} className='w-auto py-[5px] px-[10px] h-[30px] bg-[#638C6D] hover:bg-[#AAB99A] flex items-center text-white gap-[10px] rounded-[7px]'>
              <label className="font-semibold text-lg">Learn with AI</label>
              <LuSquarePen />
            </button>
            <button onClick={handlebuttonNote} className='w-auto py-[5px] px-[10px] h-[30px] bg-[#638C6D] hover:bg-[#AAB99A] flex items-center text-white rounded-[7px] gap-[5px]'>
              <label className="font-semibold text-lg">Notes</label>
              <FaStickyNote />
            </button>
          </div>
      
     
          <div className='w-full p-[10px] overflow-auto h-[550px]  rounded-[5px] flex flex-col gap-[5px]'>
          {questions.map((questions) => (
            <div key={questions.id} className='w-full p-[10px] h-auto bg-white flex items-center flex-row justify-between rounded-[10px]'>
              <h1 onClick={() => handleNavigation(questions.id)} className='w-[90%]  text-black text-md font-medium h-auto cursor-pointer px-[10px] flex items-center'>{questions.Title}</h1>
              <div className="w-auto flex flex-row gap-[5px]">
              {/* <button className='w-auto py-[5px] px-[10px] h-[30px] bg-[#638C6D] hover:bg-[#AAB99A] flex items-center text-white text-bold text-md rounded-[7px]'> {questions.UserQuestionsStatus?.[0]?.status || "Pending"}</button> */}
              <button className="w-auto py-[5px] px-[10px] h-[30px]  flex items-center text-white text-bold text-md rounded-[7px]">
                {questions.UserQuestionsStatus?.[0]?.status === "complete" ? (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                ) : (
                  <FaHourglassHalf className="text-yellow-500 text-2xl" />
                )}
              </button>
              </div>
            </div>

          ))} 
        </div>

      </div>
      )}
      

    </div>
  )
}
