import axios from 'axios'
import React, { useState } from 'react'

export const Chatbot = () => {
   const [question, setQuestion] = useState("");
   const [answer, setAnswer] = useState("");
   async function generateAnwser(){
        setAnswer('loading..')
        const response = await axios({
            url: import.meta.env.VITE_GEMINI_API_URL,
            method: "post",
            data: {
                "contents": [{
                  "parts":[{"text": question}]
                  }]
                 },
        });
       setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    }
  return (
    <div className='w-full h-full flex items-center flex-col gap-[10px]'>
        <textarea value={question}
         onChange={(e) => setQuestion(e.target.value)}
         placeholder='type here!!!'
         className='w-full p-[5px] h-[100px] bg-black text-md font-semibold text-white border border-gray-600 rounded-[7px]'></textarea>
         {/* <input value={question}
         onChange={(e) => setQuestion(e.target.value)}
         className='w-full h-[120px] bg-white text-black'/> */}
         <button onClick={generateAnwser} className='w-full h-[40px] p-[10px] bg-green-600 hover:bg-green-400 text-lg font-bold text-white flex items-center justify-center rounded-[10px] '>Generate Answer</button>
         <pre className='w-full h-full bg-black text-white max-h-[800px] overflow-auto p-4 border border-gray-600 rounded'>{answer}</pre>
    </div>
   
  )
}
