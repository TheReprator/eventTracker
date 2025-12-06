import { Middleware } from '@reduxjs/toolkit';
import { persistor, store } from '../rootStore';
import i18n from '@/appConfiguration/localization/i18n';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import type { RootState } from '../rootStore';

export const localizationEffectMiddleware: Middleware<{}, RootState> =
  (storeAPI) => {
    let lastLang: string | null = null;

    return next => action => {
      const result = next(action);

      const { language } = storeAPI.getState().localization;

      const changed = lastLang !== null && lastLang !== language;
      lastLang = language;

      if (!changed) return result;

      persistor.flush().then(() => {
        const { language: finalLang, isRTL: finalRTL } = store.getState().localization;
        applyLocalization(finalLang, finalRTL);
      });

      return result;
    };
  };


export const applyLocalization = (
  language: string,
  isRTL: boolean
) => {

  i18n.changeLanguage(language);

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    
    RNRestart.Restart();
  }
};