import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [], // Initialize with an empty array
  },
  reducers: {
    addToFavorites: (state, action) => {
      // Use the payload to add a movie ID to the favorites list
      state.ids.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      // Use the payload to remove a movie ID from the favorites list
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
