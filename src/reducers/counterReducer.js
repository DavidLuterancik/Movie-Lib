import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "lang",
  initialState: {
    lang: 0,
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = (action.payload)
    },
    // You can add more reducers here for complex state updates
  },
});

export const { setLang } = counterSlice.actions;
export default counterSlice.reducer;
