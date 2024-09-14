import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import postReducer from "../slice/postSlice";
import storyReducer from "../slice/storySlice";
import modalReducer from "../slice/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    story: storyReducer,
    modal: modalReducer,
  },
});

export default store;
