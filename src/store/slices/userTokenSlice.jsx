import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const usertokenSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
      },
  },
});


export default usertokenSlice.reducer;
export const { login } = usertokenSlice.actions;

