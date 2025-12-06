import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@assets/locale/en.json';
import ar from '@assets/locale/ar.json';
import { LanguageType } from '../store/slices/localizationSlice';

const resources = {
  en: { translation: en },
  ar: { translation: ar }
};

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: LanguageType.ENGLISH,
    resources: resources,
    interpolation: { escapeValue: false }
  });

export default i18n;