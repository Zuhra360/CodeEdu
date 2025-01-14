import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionsApi = createApi ({
    reducerPath:'questionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
        prepareHeaders: (headers) => {
            headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY);
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`);

            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchQuestions: builder.query({
            query: () => '/Questions',
        }),
        addQuestion: builder.mutation({
            query: (questionData) => ({
                url: '/Questions',
                method: 'POST',
                body: questionData,
            }),
        }),
        deleteQuestion: builder.mutation({
            query: (id) => {
              console.log("Deleting question with ID:", id); // Log the ID being sent
              return {
                url: `/Questions?id=eq.${id}`,
                method: 'DELETE',
              };
            },
          }),
        //   addNote: builder.mutation({
        //     query: (noteData) => ({
        //         url: '/Questions',
        //         method: 'POST',
        //         body: noteData, // { Note: 'Note content' }
        //     }),
        // }),
        // deleteNote: builder.mutation({
        //     query: (id) => ({
        //         url: `/Questions?id=eq.${id}`,
        //         method: 'DELETE',
        //     }),
        // }),
        fetchNotes: builder.query({
          query: () => '/Notes',
          providesTags: ['Notes'],
        }),
          addNote: builder.mutation({
            query: (newNote) => ({
              url: '/Notes',
              method: 'POST',
              body: newNote,
            }),
            invalidatesTags: ['Notes'],
          }),
          deleteNote: builder.mutation({
            query: (id) => ({
              url: `/Notes?id=eq.${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Notes'],
          }),
          
          
    }),
});

export const { useFetchQuestionsQuery, useAddQuestionMutation, useDeleteQuestionMutation, useFetchNotesQuery, useAddNoteMutation, useDeleteNoteMutation } = questionsApi;
export default questionsApi;