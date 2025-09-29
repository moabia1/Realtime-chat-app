import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js"
import chatReducer from "./slice/chatSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  }
});

export default store