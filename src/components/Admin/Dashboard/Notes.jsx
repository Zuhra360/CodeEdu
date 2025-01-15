import React, { useState } from 'react';
import { useAddNoteMutation, useDeleteNoteMutation, useFetchNotesQuery } from '../../../Redux/Slice/questionsApiSlice';

export const Notes = () => {
  const { data: notes, error, isLoading } = useFetchNotesQuery(); // Fetches questions with their notes

  const [addNote] = useAddNoteMutation(); // Mutation to add notes
  const [deleteNote] = useDeleteNoteMutation(); // Mutation to delete notes
  const [note, setNote] = useState(''); // State for the new note

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching notes: {error.message}</p>;

  const handleAddNote = async () => {
    if (!note.trim()) {
        console.error('Note cannot be empty');
        return;
    }
    try {
        await addNote({ Note: note }).unwrap();
        setNote('');
     
    } catch (error) {
        console.error('Error adding note:', error);
    }
  };

    const handleDeleteNote = async (id) => {
      console.log("Deleting note with ID:", id);
      try {
          await deleteNote(id).unwrap();
      
      } catch (error) {
          console.error('Error deleting note:', error);
      }
    };
  return (
    <div className='md:w-[calc(100%-290px)] w-[calc(100%-190px)] p-[10px] absolute md:left-[250px] left-[190px] md:h-[600px] h-[500px] bg-[#EEEEEE] rounded-[10px] flex flex-col gap-[10px]'>
          
          <div className="w-[calc(100%-10px)] h-auto  p-[10px] flex justify-between md:flex-row flex-col md:gap-[2px] gap-[10px] items-center bg-white rounded-[10px]">
            <input className='text-md leading-[16px] w-11/12'
             type='text'
             placeholder='Notes in detail'
             value={note}
             onChange={(e) => setNote(e.target.value)}
             required/>
            <div className="w-auto h-full flex items-center flex-row gap-[10px] ">
              <button onClick={handleAddNote} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-md font-medium  text-white rounded-[10px] ">Add</button>
            </div>
          </div>

          <div className="w-[calc(100%-10px)] h-full overflow-auto p-[10px] flex gap-[5px] flex-col items-center bg-white rounded-[10px]">
            {notes ?.map((note) => (
               <div key={note.id} className='w-[calc(100%-10px)] h-auto  p-[10px] flex justify-between flex-row items-center bg-gray-100 rounded-[10px]'>
                <h1 className=' text-md font-medium '>{note.Note}</h1>
                <button onClick={() => handleDeleteNote(note.id)} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#213555] hover:bg-[#3E5879] text-md font-medium  text-white rounded-[10px] " >Delete</button>
               </div>

            ))}
           

          </div>
               
    </div>
  )
}
