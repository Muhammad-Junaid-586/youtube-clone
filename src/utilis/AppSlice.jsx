import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    open: true,
    videos: [],
    category: "All",
  },
  reducers: {
    toggleOpen: (state, action) => {
      state.open = !state.open;
    },
    setHomeVideos: (state, action) => {
      state.videos = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export default AppSlice.reducer;
export const { toggleOpen, setHomeVideos, setCategory } = AppSlice.actions;
