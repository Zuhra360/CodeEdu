import { Editor } from '@monaco-editor/react';
import { useDispatch, useSelector } from "react-redux";
import { setCode, setOutput } from "../../Redux/Slice/EditorSlice"
import { Chatbot } from '../../features/chatbot/Chatbot';

export const LearnwithAi = () => {
  const dispatch = useDispatch();
  const { code, output } = useSelector((state) => state.editor);

  const handleRunCode = () => {
    try {
      // Capture console.log output
      const logOutput = [];
      const originalConsoleLog = console.log;

      console.log = (...args) => {
        logOutput.push(args.join(" "));
        originalConsoleLog(...args);
      };

      // Execute user's code
      new Function(code)();

      // Restore console.log and update Redux output
      console.log = originalConsoleLog;
      dispatch(setOutput(logOutput.join("\n")));
    } catch (err) {
      dispatch(setOutput(`Error: ${err.message}`));
    }
  };
  return (
    <div className='w-11/12 p-[10px] md:h-[650px] sm:h-auto bg-[#EEEEEE] rounded-[10px] flex md:flex-row flex-col gap-[20px]'>
      <div className='md:w-1/3 sm:w-full p-[10px] h-full bg-black text-white flex flex-col  justify-between rounded-[5px] gap-[5px]'>
        <Editor
            height="80vh"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => dispatch(setCode(value))} 
            theme="vs-dark"
          />
        <button onClick={handleRunCode} className='w-[80px] h-[30px] py-[5px] px-[10px] bg-green-600 hover:bg-green-400 text-white text-lg font-semibold rounded-[10px] flex items-center justify-center'>Run</button>
      
      </div>
      <div className='md:w-1/3 sm:w-full p-[10px] h-full bg-black text-white rounded-[5px]'>
        <pre className="text-white">{output}</pre>
      </div>
      <div className='md:w-1/3 sm:w-full p-[10px] h-full bg-black text-black rounded-[5px]'>
        <Chatbot/>    
      </div>

  </div>
  )
}
