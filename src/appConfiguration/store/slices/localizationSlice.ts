import { defaultLocale } from '@/appConfiguration/localization/LocaleContext';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LanguageType {
  ARABIC = "ar",
  ENGLISH = "en",
}

const systemLang =
  defaultLocale()?.languageCode === "ar" ? LanguageType.ARABIC : LanguageType.ENGLISH;

const initialState = {
  language: systemLang,
  isRTL: systemLang === LanguageType.ARABIC,
};

const slice = createSlice({
  name: "localization",
  initialState,
  reducers: {

    setLanguage(state, action: PayloadAction<LanguageType>) {
      state.language = action.payload;
      state.isRTL = action.payload === LanguageType.ARABIC;
    },
    toggleLanguage(state) {
      const next =
        state.language === LanguageType.ENGLISH
          ? LanguageType.ARABIC
          : LanguageType.ENGLISH;

      state.language = next;
      state.isRTL = next === LanguageType.ARABIC;
    }
  },
});

export const { setLanguage, toggleLanguage } = slice.actions;
export default slice.reducer;
