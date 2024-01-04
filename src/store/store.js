import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/authSlice";
import postSlice from "../services/postSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});

export default store;
