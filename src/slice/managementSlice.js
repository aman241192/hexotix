import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const managementSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },

    editStudent: (state, action) => {
      console.log("edit data from store", action.payload);

      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index === -1) {
        console.log("no object found");
      } else {
        state[index] = action.payload;
      }

      console.log("index", index);
    },
    deleteStudent: (state, action) => {
      console.log("from store", action.payload);

      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addStudent, editStudent, deleteStudent } =
  managementSlice.actions;

export default managementSlice.reducer;
