import React, { useState } from 'react';
import { useFetchQuestionsQuery, useDeleteQuestionMutation, useAddQuestionMutation } from "../../../Redux/Slice/questionsApiSlice";


export const Problems = () => {
    const { data: questions, error, isLoading } = useFetchQuestionsQuery();
    const { refetch } = useFetchQuestionsQuery();
    const [deleteQuestion] = useDeleteQuestionMutation();
    const [addQuestion] = useAddQuestionMutation();
    const [question, setQuestion] = useState('');
    const [title, setTitle] = useState('');
    const [testcase, setTestcase] = useState('');
    

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
    if (!title.trim() || !question.trim() || !testcase.trim()) {
        console.error('All fields are required');
        return;
    }

    try {
        // await addQuestion({ Question: question }).unwrap();
        await addQuestion({ Title: title, Question: question, Testcase: testcase }).unwrap();
        refetch();
        setQuestion(''); // Clear the input after successful addition
        setTitle('');
        setTestcase('');
    } catch (error) {
        console.error('Error adding question:', error);
    }
};


  return (
     <div className='md:w-[calc(100%-290px)] w-[calc(100%-100px)] p-[10px] absolute md:left-[250px] left-[90px] md:h-[600px] h-[400px] bg-[#EEEEEE] rounded-[10px] flex flex-col gap-[10px]'>
          
          <div className="w-[calc(100%-10px)] h-auto  p-[10px] flex justify-between md:flex-row flex-col md:gap-[2px] gap-[10px] items-center bg-white rounded-[10px]">
              <input
              className="text-md leading-[16px] w-11/12 border-[1px] border-black"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input className='text-md leading-[16px] w-11/12 border-[1px] border-black'
             type='text'
             placeholder='Question in detail'
             value={question}
             onChange={(e) => setQuestion(e.target.value)}
             required/>
             <input
              className="text-md leading-[16px] w-11/12 border-[1px] border-black"
              type="text"
              placeholder="Testcase"
              value={testcase}
              onChange={(e) => setTestcase(e.target.value)}
              required
            />
            <div className="w-auto h-full flex items-center flex-row gap-[10px] ">
              <button onClick={handleAddQuestion} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#638C6D] hover:bg-[#AAB99A] text-md font-medium  text-white rounded-[10px] ">Add</button>
            </div>
          </div>

          <div className="w-[calc(100%-10px)] h-full  overflow-auto p-[10px] flex gap-[5px] flex-col items-center bg-white rounded-[10px]">
            {questions?.map((question) => (
               <div key={question.id} className='w-[calc(100%-10px)] h-auto md:p-[10px] p-0 flex justify-between flex-row items-center bg-gray-100 rounded-[10px]'>
                <div className='w-full h-auto flex flex-col gap-[5px]'>
                  <h1 className=' text-xl font-medium text-[#5D8736]'>{question.Title}</h1>
                  <h1 className=' text-md font-medium text-gray-700'>{question.Question}</h1>
                  <h1 className='text-md font-medium text-gray-700'>{question.Testcase}</h1>
                </div>
                
                <button onClick={() => handleDelete(question.id)} className="w-auto h-[30px] py-[1px] px-[10px] bg-[#638C6D] hover:bg-[#AAB99A] text-md font-medium  text-white rounded-[10px] " >Delete</button>
               </div>

            ))}
           

          </div>
    
           
    </div>
  )
}
