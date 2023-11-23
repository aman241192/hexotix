import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredData: [],
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    addRegistrationData: (state, action) => {
      const isExist = state.registeredData.find(
        (item) => item.email === action.payload.email
      );

      if (!isExist) {
        state.registeredData.push(action.payload);
      } else {
        alert("This email already exists");
      }
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRegistrationData, incrementByAmount } =
  registrationSlice.actions;

export default registrationSlice.reducer;
