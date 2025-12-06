import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "../types/types";

const initialState: HomeState = {
  search: "",
  keyword: "",
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSearch, setKeyword, setError } = homeSlice.actions;
export default homeSlice.reducer;
