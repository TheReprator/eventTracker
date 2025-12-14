import { localizationEffectMiddleware } from "../localizationEffectMiddleware";
import { setLanguage, toggleLanguage, LanguageType } from "../localizationSlice";
import * as rootStore from "../../rootStore";
import i18n from "@/appConfiguration/localization/i18n";
import RNRestart from "react-native-restart";
import { I18nManager } from "react-native";

jest.mock("../../rootStore", () => {
  return require('../../__test__/__mock__/rootStore.mock')
});

jest.mock("@/appConfiguration/localization/i18n", () => {
  return require("../../../localization/__test__/__mock__/i18n.mock");
});


const createEnv = (lang: string, isRTL: boolean) => {
  const storeAPI = {
    getState: jest.fn(() => ({
      localization: { language: lang, isRTL },
    })),
    dispatch: jest.fn(),
  };

  const next = jest.fn(action => action);
  const middleware = localizationEffectMiddleware(storeAPI);

  return { middleware, next, storeAPI };
};


describe("localizationEffectMiddleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("test default", () => {
    const { middleware, next, storeAPI } = createEnv(LanguageType.ENGLISH, false);

    expect(storeAPI.getState().localization.language).toBe(LanguageType.ENGLISH)

    const action = { type: "theme/toggleTheme" }
    middleware(next)(action);

    expect(next).toHaveBeenCalledWith(action)

    expect(rootStore.persistor.flush).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
    expect(RNRestart.Restart).not.toHaveBeenCalled();
  });

  test("ignores actions other than setLanguage / toggleLanguage", () => {
    const { middleware, next, storeAPI } = createEnv(LanguageType.ENGLISH, false);

    expect(storeAPI.getState().localization.language).toBe(LanguageType.ENGLISH)

    const action = { type: "theme/toggleTheme" }
    middleware(next)(action);

    expect(next).toHaveBeenCalledWith(action)

    expect(rootStore.persistor.flush).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
    expect(RNRestart.Restart).not.toHaveBeenCalled();
  });

  test("first localization action does NOT trigger side effects", () => {
    const { middleware, next } = createEnv(LanguageType.ENGLISH, false);

    middleware(next)(setLanguage(LanguageType.ENGLISH));

    expect(rootStore.persistor.flush).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
  });


  test("language change triggers flush then applyLocalization", async () => {
    const { middleware, next, storeAPI } = createEnv(LanguageType.ENGLISH, false);

    middleware(next)(setLanguage(LanguageType.ENGLISH));

    storeAPI.getState.mockReturnValue({
      localization: { language: LanguageType.ARABIC, isRTL: true },
    });

    (rootStore.store.getState as jest.Mock).mockReturnValue({
      localization: { language: LanguageType.ARABIC, isRTL: true },
    });

    middleware(next)(setLanguage(LanguageType.ARABIC));

    expect(rootStore.persistor.flush).toHaveBeenCalled();

    await Promise.resolve();

    expect(i18n.changeLanguage).toHaveBeenCalledWith(LanguageType.ARABIC);
    expect(I18nManager.allowRTL).toHaveBeenCalledWith(true);
    expect(I18nManager.forceRTL).toHaveBeenCalledWith(true);
    expect(RNRestart.Restart).toHaveBeenCalled();
  });


  test("same language → no flush, no restart", () => {
    const { middleware, next } = createEnv(LanguageType.ENGLISH, false);

    middleware(next)(setLanguage(LanguageType.ENGLISH));

    middleware(next)(setLanguage(LanguageType.ENGLISH));

    expect(rootStore.persistor.flush).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
    expect(RNRestart.Restart).not.toHaveBeenCalled();
    expect(I18nManager.allowRTL).not.toHaveBeenCalled();
    expect(I18nManager.forceRTL).not.toHaveBeenCalled();
  });

});
