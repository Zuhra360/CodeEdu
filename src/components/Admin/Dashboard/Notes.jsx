import React, { useState } from 'react';
import { useAddNoteMutation, useDeleteNoteMutation, useFetchNotesQuery } from '../../../Redux/Slice/questionsApiSlice';

export const Notes = () => {
  const { data: notes, error, isLoading } = useFetchNotesQuery(); // Fetches questions with their notes

  const [addNote] = useAddNoteMutation(); // Mutation to add notes
  const [deleteNote] = useDeleteNoteMutation(); // Mutation to delete notes
  const [note, setNote] = useState(''); // State for the new note
  const [noteTitle, setNoteTitle] = useState('');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching notes: {error.message}</p>;

  const handleAddNote = async () => {
    if (!noteTitle.trim() || !note.trim()) {
        console.error('Note cannot be empty');
        return;
    }
    try {
        await addNote({ Notetitle: noteTitle , Note: note  }).unwrap();
        setNote('');
        setNoteTitle('');
     
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
    <div className='md:w-[calc(100%-290px)] w-[calc(100%-100px)] p-[10px] absolute md:left-[250px] left-[90px] md:h-[600px] h-[400px] bg-[#EEEEEE] rounded-[10px] flex flex-col gap-[10px]'>
          
          <div className="w-[calc(100%-10px)] h-auto  p-[10px] flex justify-between md:flex-row flex-col md:gap-[5px] gap-[10px] items-center bg-white rounded-[10px]">
            <input className='text-md leading-[16px] w-1/3 border-[1px] border-black'
             type='text'
             placeholder='Title'
             value={noteTitle}
             onChange={(e) => setNoteTitle(e.target.value)}
             required/>
              <input className='text-md leading-[16px] w-2/3 border-[1px] border-black'
             type='text'
             placeholder='Notes in detail'
             value={note}
             onChange={(e) => setNote(e.target.value)}
             required/>
            <div className="w-auto h-full flex items-center flex-row gap-[10px] ">
              <button onClick={handleAddNote} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#638C6D] hover:bg-[#AAB99A] text-md font-medium  text-white rounded-[10px] ">Add</button>
            </div>
          </div>

          <div className="w-[calc(100%-10px)] h-full overflow-auto p-[10px] flex gap-[5px] flex-col items-center bg-white rounded-[10px]">
            {notes ?.map((note) => (
               <div key={note.id} className='w-[calc(100%-10px)] h-auto  p-[10px] flex justify-between flex-row items-center bg-gray-100 rounded-[10px]'>
                  <div className='flex flex-col gap-[8px]'>
                      <h1 className=' text-2xl font-medium text-[#5D8736]'>{note.Notetitle}</h1>
                      <h1 className=' text-md font-medium text-gray-700'>{note.Note}</h1>

                  </div>
                <button onClick={() => handleDeleteNote(note.id)} className="w-[80px] h-[30px] py-[1px] px-[10px] bg-[#638C6D] hover:bg-[#AAB99A] text-md font-medium  text-white rounded-[10px] " >Delete</button>
               </div>

            ))}
           

          </div>
               
    </div>
  )
}
