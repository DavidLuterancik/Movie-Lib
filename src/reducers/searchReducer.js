import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieSearch: "",
    movies: [],
    moviePage: 1,
    movieTotal: null,
  },
  reducers: {
    setMovieSearch: (state, action) => {
      state.movieSearch = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setMoviePage: (state, action) => {
      state.moviePage = action.payload;
    },
    setMovieTotal: (state, action) => {
      state.movieTotal = action.payload;
    },
  },
});

export const { setMovieSearch, setMovies, setMoviePage, setMovieTotal } =
  searchSlice.actions;
export default searchSlice.reducer;
