import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  search: string;
  keyword: string;
  error: string | null;
}

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
    resetError(state) {
      state.error = null;
    },
  },
});

export const { setSearch, setKeyword, setError, resetError } = homeSlice.actions;
export default homeSlice.reducer;
