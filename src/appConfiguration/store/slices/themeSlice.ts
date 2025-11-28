import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const slice = createSlice({
  name: 'theme',
  initialState: { isDark: Appearance.getColorScheme() === 'dark' },
  reducers: {
    toggleTheme(state){
      state.isDark = !state.isDark;
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    }
  }
});

export const { toggleTheme, setTheme } = slice.actions;
export default slice.reducer;
