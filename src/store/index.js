import { configureStore } from "@reduxjs/toolkit";
import  usertokenSlice  from "./slices/userTokenSlice";
// import { usertokenSlice } from "../../src/store/slices/userTokenSlice";

export const store = configureStore({
  reducer: {
    user: usertokenSlice,
  },
});


// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
