import React, { createContext, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/appConfiguration/store/rootStore';
import { toggleLanguage, setLanguage, LanguageType } from '@/appConfiguration/store/slices/localizationSlice';
import { useTranslation } from 'react-i18next';

export interface LocaleContextType {
  language: LanguageType;
  isRTL: boolean;
  t: (key: string, options?: any) => string;
  changeLanguage: (lang: LanguageType) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const dispatch = useDispatch();

  const { language, isRTL } = useSelector((s: RootState) => s.localization);

  const { t, i18n } = useTranslation();

  const value = useMemo<LocaleContextType>(() => ({
    language,
    isRTL,

    t: (key: string, options?: any) => {
      const result = t(key, options);
      return typeof result === "string" ? result : String(result);
    },

    changeLanguage: (lang: LanguageType) => {
      dispatch(setLanguage(lang));
      i18n.changeLanguage(lang);
    },

    toggleLocale: () => {
      dispatch(toggleLanguage());
    }
  }), [language, isRTL, t]);


  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useAppLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useAppLocale must be used inside LocaleProvider");
  return ctx;
};