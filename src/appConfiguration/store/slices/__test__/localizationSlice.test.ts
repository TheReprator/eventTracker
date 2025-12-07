import reducer, { LanguageType, setLanguage, toggleLanguage } from "@/appConfiguration/store/slices/localizationSlice";

describe("localizationSlice", () => {
  it("sets language to Arabic", () => {
    const state = reducer(undefined, setLanguage(LanguageType.ARABIC));
    expect(state.language).toBe(LanguageType.ARABIC);
    expect(state.isRTL).toBe(true);
  });

  it("toggles language", () => {
    const initial = reducer(undefined, toggleLanguage());
    expect(initial.language).toBe(LanguageType.ARABIC);
  });
});
