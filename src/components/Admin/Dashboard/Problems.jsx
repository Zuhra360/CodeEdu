import React, { useState } from 'react';
import { useFetchQuestionsQuery, useDeleteQuestionMutation, useAddQuestionMutation } from "../../../Redux/Slice/questionsApiSlice";


export const Problems = () => {
    const { data: questions, error, isLoading } = useFetchQuestionsQuery();
    const { refetch } = useFetchQuestionsQuery();
    const [deleteQuestion] = useDeleteQuestionMutation();
    const [addQuestion] = useAddQuestionMutation();
    const [question, setQuestion] = useState('');
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching questions: {error.message}</p>;

    const handleDelete = async (id) => {
      try {
          await deleteQuestion(id);
          refetch();
      } catch (error) {
          console.error('Error deleting question:', error);
      }
  };
  const handleAddQuestion = async () => {
    if (!question.trim()) {
        console.error('Question cannot be empty');
        return;
    }

    try {
        await addQuestion({ Question: question }).unwrap();
        refetch();
        setQuestion(''); // Clear the input after successful addition
    } catch (error) {
        console.error('Error adding question:', error);
    }
};


  return (
     <div className='md:w-[calc(100%-290px)] w-[calc(100%-190px)] p-[10px] absolute md:left-[250px] left-[190px] h-[600px] bg-[#EEEEEE] rounded-[10px] flex flex-col gap-[10px]'>
          
          <div className="w-[calc(100%-10px)] h-auto  p-[10px] flex justify-between flex-row items-center bg-white rounded-[10px]">
            <input className='text-md leading-[16px] w-[1100px]'
             type='text'
             placeholder='Question in detail'
             value={question}
             onChange={(e) => setQuestion(e.target.value)}
             required/>
            <div className="w-auto h-full flex items-center flex-row gap-[10px] ">
              <button onClick={handleAddQuestion} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879]  text-md font-medium  text-white rounded-[10px] ">Add</button>
            </div>
          </div>

          <div className="w-[calc(100%-10px)] h-full overflow-auto p-[10px] flex gap-[5px] flex-col items-center bg-white rounded-[10px]">
            {questions?.map((question) => (
               <div key={question.id} className='w-[calc(100%-10px)] h-auto  md:p-[10px] p-0 flex justify-between flex-row items-center bg-gray-100 rounded-[10px]'>
                <h1 className=' text-md font-medium '>{question.Question}</h1>
                <button onClick={() => handleDelete(question.id)} className="w-auto h-[30px] py-[1px] px-[10px] bg-[#213555] text-md font-medium hover:bg-[#3E5879] text-white rounded-[10px] " >Delete</button>
               </div>

            ))}
           

          </div>
    
           
    </div>
  )
}
