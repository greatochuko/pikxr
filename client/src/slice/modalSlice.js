import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: "",
  post: "post2",
  story: {},
  username: "",
  commentId: "",
  cb: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state[Object.keys(action.payload)[1]] =
        action.payload[Object.keys(action.payload)[1]];
    },
    closeModal: (state) => {
      state.open = false;
      state.type = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
