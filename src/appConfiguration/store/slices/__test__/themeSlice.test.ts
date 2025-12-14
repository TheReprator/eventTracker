import reducer, { setTheme, toggleTheme } from "@/appConfiguration/store/slices/themeSlice";
import { Appearance } from "react-native";

describe("themeSlice", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("initial state is light when system theme is light", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state.isDark).toBe(false)
  });


  test("initial state is dark when system theme is dark", () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue("dark");

    const state = reducer(undefined, { type: "unknown" });
    expect(state.isDark).toBeTruthy()
  });


  test("setTheme(true) sets dark mode", () => {
    const state = reducer({ isDark: false }, setTheme(true));
    expect(state.isDark).toBe(true);
  });


  test("setTheme(false) sets light mode", () => {
    const state = reducer({ isDark: true }, setTheme(false));
    expect(state.isDark).toBe(false);
  });


  test("toggleTheme switches light → dark", () => {
    const state = reducer({ isDark: false }, toggleTheme());

    expect(state.isDark).toBe(true);
  });

  test("toggleTheme switches dark → light", () => {
    const state = reducer({ isDark: true }, toggleTheme());

    expect(state.isDark).toBe(false);
  });


  test("unknown action does not change state", () => {
    const prevState = { isDark: true };

    const state = reducer(prevState, { type: "UNKNOWN_ACTION" });
    expect(state).toEqual(prevState);
  });
});
