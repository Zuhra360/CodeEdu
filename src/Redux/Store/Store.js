import { configureStore } from "@reduxjs/toolkit";
import { editorReducer } from '../Slice/EditorSlice';
import { usersApi } from '../Slice/usersApiSlice'
import { questionsApi } from "../Slice/questionsApiSlice";

const store = configureStore({
    reducer: {
      editor: editorReducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [questionsApi.reducerPath]: questionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(usersApi.middleware).concat(questionsApi.middleware),
  });

export default store;

