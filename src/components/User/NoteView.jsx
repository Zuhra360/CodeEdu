import { useEffect, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import supabase from "../../config/supabaseClient";
import { MdArrowForwardIos , MdArrowBackIos} from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Noteview = () => {
    
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const navigate = useNavigate();
    const handleGoback = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchNotes = async () => {
          setLoading(true);
          try {
            // Query the Notes table for Note and Notetitle columns
            const { data, error } = await supabase
              .from("Notes")
              .select("Note, Notetitle");
    
            if (error) throw error;
    
            setNotes(data);
          } catch (error) {
            console.error("Error fetching notes:", error.message);
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchNotes();
      }, []);
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
      };
    
      const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? notes.length - 1 : prevIndex - 1
        );
      };
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
    
    
  return (
    
    <div className='w-11/12 p-[10px] md:h-[650px] sm:h-auto bg-inherit rounded-[10px] flex items-center justify-center md:flex-row flex-col gap-[20px]'>
      
      {notes.length > 0 ? (
         <div className="w-full flex flex-col items-center  gap-[20px]">
         <div className="w-full flex flex-row md:gap-[40px] gap-[15px] justify-center items-center">
           <button
             onClick={handlePrevious}
             className="text-gray-900 hover:text-gray-800"
           >
             <MdArrowBackIos className="w-[40px] h-[40px] text-gray-800" />
           </button>
           <div className="md:w-1/2 w-2/3 h-auto bg-white p-[20px] flex flex-col gap-[15px] rounded-[5px] shadow-md">
             <h2 className="text-2xl md:font-bold font-semibold text-center  ">{notes[currentIndex].Notetitle}</h2>
             <p className="md:text-md text-sm md:font-medium font-normal text-gray-800">{notes[currentIndex].Note}</p>
           </div>
           <button
             onClick={handleNext}
             className="text-gray-900 hover:text-gray-800"
           >
             <MdArrowForwardIos className="w-[40px] h-[40px] text-gray-800" />
           </button>
         </div>
         <p className="text-sm text-gray-500">
           {currentIndex + 1} of {notes.length}
         </p>
         <button onClick={handleGoback} className="w-auto px-[10px] py-[5px] flex flex-row items-center gap-[10px] bg-black text-white text-md font-normal rounded-[10px]"> <TbArrowBackUp className="text-xl"/> Go Back</button>
       </div>

      ) : (
        <p>No notes found</p>
      )}
    </div>
  )
}
