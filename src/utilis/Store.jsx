import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./AppSlice";
import ChatReducer from "./ChatSlice";

const store = configureStore({
  reducer: {
    app: AppReducer,
    chat: ChatReducer,
  },
});
export default store;
