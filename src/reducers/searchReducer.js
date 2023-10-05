import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieSearch: "",
    movies: [],        
  },
  reducers: {
    setMovieSearch: (state, action) => {
      state.movieSearch = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovieSearch, setMovies } = searchSlice.actions;
export default searchSlice.reducer;