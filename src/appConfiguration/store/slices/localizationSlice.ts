import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as RNLocalize from "react-native-localize";

export enum LanguageType {
  ARABIC = "ar",
  ENGLISH = "en",
}

const localeMap: Record<LanguageType, string> = {
  [LanguageType.ENGLISH]: "en-gb",
  [LanguageType.ARABIC]: "ar-sa",
};

export const getAppLocaleTag = (lang: LanguageType): string => {
  return localeMap[lang];
};

const locales = RNLocalize.getLocales();
const deviceLang = locales[0]?.languageCode;

const systemLang =
  deviceLang === "ar" ? LanguageType.ARABIC : LanguageType.ENGLISH;

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
