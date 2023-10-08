import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    data: [],
    page: 1,
    total: null,
    scroll: 0,
  },
  reducers: {
    setStateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStateData: (state, action) => {
      state.data = action.payload;
    },
    setStatePage: (state, action) => {
      state.page = action.payload;
    },
    setStateTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setStateData, setStateSearchTerm, setStatePage, setStateTotal } =
  searchSlice.actions;
export default searchSlice.reducer;
