import reducer, { LanguageType, setLanguage, toggleLanguage } from "@/appConfiguration/store/slices/localizationSlice";

describe("localizationSlice", () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
      { language: LanguageType.ENGLISH, isRTL: false })
  })

  it("sets language to Arabic", () => {
    const state = reducer(undefined, setLanguage(LanguageType.ARABIC));
    expect(state.language).toBe(LanguageType.ARABIC);
    expect(state.isRTL).toBe(true);
  });

  it("sets language to English", () => {
    const state = reducer(undefined, setLanguage(LanguageType.ENGLISH));
    expect(state.language).toBe(LanguageType.ENGLISH);
    expect(state.isRTL).toBe(false);
  });

  it("toggles language to Arabic", () => {
    const initial = reducer(undefined, toggleLanguage());
    expect(initial.language).toBe(LanguageType.ARABIC);
  });
});
