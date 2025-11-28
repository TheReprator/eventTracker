import { NAVIGATION_STATE_KEY } from '@/appConfiguration/theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

export enum LanguageType {
  ARABIC = "ar",
  ENGLISH = "en"
}

type State = { language: LanguageType; isRTL: boolean };

const initialState: State = { language: I18nManager.isRTL ? LanguageType.ARABIC : LanguageType.ENGLISH , isRTL: I18nManager.isRTL };

const slice = createSlice({
  name: 'localization',
  initialState,
  reducers: {

    toggleLanguage(state) {
      state.language = state.language === LanguageType.ENGLISH ? LanguageType.ARABIC : LanguageType.ENGLISH;
      state.isRTL = state.language === LanguageType.ARABIC;
      i18next.changeLanguage(state.language);
      
      if (I18nManager.isRTL !== state.isRTL) {
        AsyncStorage.removeItem(NAVIGATION_STATE_KEY);

        I18nManager.forceRTL(state.isRTL);
        I18nManager.allowRTL(state.isRTL);
        RNRestart.Restart();
      }
    },

    setLanguage(state, action: PayloadAction<LanguageType>) {
      state.language = action.payload;
      state.isRTL = state.language === LanguageType.ARABIC;
      i18next.changeLanguage(state.language);
      //I18nManager.forceRTL(state.isRTL);
    }

  }
});

export const { toggleLanguage, setLanguage } = slice.actions;
export default slice.reducer;
