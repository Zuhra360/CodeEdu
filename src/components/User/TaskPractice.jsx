import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCode, setOutput } from "../../Redux/Slice/EditorSlice";
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import supabase from "../../config/supabaseClient";

export const TaskPractice = ({questions}) => {
  const dispatch = useDispatch();
  const { code, output } = useSelector((state) => state.editor);
  const { id } = useParams(); // Extract id from the URL
  const [question, setQuestion] = useState(null);

  const navigate = useNavigate();
  const handleGoback = () => {
    navigate(-1);
  }
  useEffect(() => {
    const fetchQuestion = async () => {
      const { data, error } = await supabase
        .from("Questions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching question:", error);
        return;
      }

      setQuestion(data);
    };

    fetchQuestion();
  }, [id]);


  const handleRunCode = () => {
    try {
      const logOutput = []; // Array to store console.log outputs
      const originalConsoleLog = console.log; // Save original console.log
  
      // Override console.log to push output to the array
      console.log = (...args) => {
        logOutput.push(args.join(" "));
        originalConsoleLog(...args); // Keep original behavior in the console
      };
  
      // Execute the code
      new Function(code)();
  
      // Restore console.log and dispatch the output
      console.log = originalConsoleLog;
      dispatch(setOutput(logOutput.join("\n"))); // Update output in Redux state
    } catch (err) {
      dispatch(setOutput(`Error: ${err.message}`)); // Show errors
    }
  };

  const handleSubmit = async () => {
    try {
      // Fetch the authenticated user ID
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(); // Updated based on the latest Supabase SDK
  
      if (userError) {
        console.error("Error fetching user ID:", userError);
        return;
      }
  
      const userId = user?.id; // Ensure user ID exists
      if (!userId) {
        console.error("No authenticated user found.");
        return;
      }
  
      const { error } = await supabase
        .from("UserQuestionsStatus")
        .upsert({
          user_id: userId,
          question_id: id, // Use the `id` from `useParams`
          status: "complete", // Mark as complete
        });
  
      if (error) {
        console.error("Error updating status:", error);
      } else {
        console.log("Question marked as complete!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  
  
  return (
    <div className='w-11/12 md:h-[650px] sm:h-auto p-[10px] h-[700px] bg-[#EEEEEE] rounded-[10px] flex md:flex-row flex-col gap-[20px]'>
       {question ? (
         <div className='md:w-1/2 sm:w-full p-[10px] h-full text-md font-medium  bg-white flex flex-col justify-between rounded-[5px]'>
            <h1>{question.Question}</h1> 
            <div className="flex flex-row justify-between">
            <button className="w-[120px] h-[30px] py-[5px] px-[10px] bg-[#3E5879] hover:bg-[#31304D]  text-white font-semibold text-lg rounded-[10px] flex items-center justify-center" onClick={handleSubmit} >Submit</button>
            <button onClick={handleGoback} className='w-[80px] h-[30px] py-[5px] px-[10px] bg-gray-800 text-white hover:bg-gray-600  text-lg font-medium rounded-[10px] flex items-center justify-center'>Back</button>
            </div>
         </div>
       ) : (
        <p>Loading...</p>
       )}
      
      <div className='md:w-1/2 sm:w-full  p-[10px] h-full bg-[#eae8ea] flex flex-col gap-[10px] rounded-[5px]'>
        <div className="w-full h-2/3 flex flex-col gap-[5px]  ">
             
        <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => dispatch(setCode(value))} // Dispatch setCode
            theme="vs-dark"
          />
           
        </div>
        <button onClick={handleRunCode} className='w-[80px] h-[30px] py-[5px] px-[10px] bg-green-600 hover:bg-green-400 text-white font-semibold text-lg rounded-[10px] flex items-center justify-center'>Run</button>
         
        <div className="w-full h-1/2 bg-black max-h-[800px] overflow-auto p-[10px]">   
            <pre className="text-white">{output}</pre>
        </div>
      
      </div>
     

    </div>
  )
}
