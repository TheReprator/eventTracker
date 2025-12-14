import { changeLanguage } from "./i18n.mock";

export const useTranslation = jest.fn(() => ({
  t: (key: string) => `translated:${key}`,
  i18n: {
    changeLanguage,
  },
}));
