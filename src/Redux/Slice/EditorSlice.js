import { createSlice } from "@reduxjs/toolkit";

export const editorSlice = createSlice({
    name: "editor",
    initialState: {
      code: "// Write your JavaScript code here\nconsole.log('Hello, World!');",
      output: "",
    },
    reducers: {
      setCode: (state, action) => {
        state.code = action.payload; 
      },
      setOutput: (state, action) => {
        state.output = action.payload; 
      },
    },
});

export const { setCode, setOutput } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;