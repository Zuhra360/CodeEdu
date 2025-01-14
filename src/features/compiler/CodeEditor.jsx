import { Editor } from '@monaco-editor/react'

const CodeEditor = () => {
    
  return (
    <div className='w-full h-full flex flex-col gap-[5px]'>
         <Editor 
         height="35vh" 
         theme="vs-dark"
         defaultLanguage="javascript" 
         defaultValue="// some comment" 
         value={value}
         onMount={onMount}
         onChange={(value) => setValue(value)}/>
         
        
    </div>
  )
}

export default CodeEditor