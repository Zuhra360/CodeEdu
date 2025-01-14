import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
        prepareHeaders: (headers, { getState }) => {
            const jwtToken = getState().auth?.user?.jwtToken; // Assuming auth slice
            headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY);
            if (jwtToken) {
                headers.set('Authorization', `Bearer ${jwtToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: () => '/users', // Supabase "users" table
        }),
        fetchUserById: builder.query({
            query: (userId) => `/users?id=eq.${userId}`,
        }),
        
        addUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users?id=eq.${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useFetchUsersQuery, useFetchUserByIdQuery, useAddUserMutation,  useDeleteUserMutation } = usersApi;
export default usersApi;