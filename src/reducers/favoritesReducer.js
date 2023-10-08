import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.ids.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
