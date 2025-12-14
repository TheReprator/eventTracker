import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from '../../store/slices/themeSlice';
import { AppThemeProvider, useAppTheme } from "../ThemeContext";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react-native/build/render-hook";
import { DarkAppTheme, LightAppTheme } from "../theme";
import { act } from "@testing-library/react-native";

const themeMockReducer = combineReducers({
    theme: themeReducer
})

const renderWithMockThemeStore = (preloadedState?: any) => {
    const store = configureStore({
        reducer: themeMockReducer,
        preloadedState,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
            <AppThemeProvider>{children}</AppThemeProvider>
        </Provider>
    );

    return {
        store,
        ...renderHook(() => useAppTheme(), { wrapper }),
    };
};

describe("ThemeContext", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("throws error when used outside ReduxThemeProvider", () => {
        expect(() => renderHook(() => useAppTheme()))
            .toThrow("useAppTheme must be used inside ReduxThemeProvider");
    });


    test("exposes theme, dart status from Redux state", () => {
        const { result } = renderWithMockThemeStore()

        expect(result.current.isDark).toBe(false)
        expect(result.current.theme).toBe(LightAppTheme)
    });


    test("toggleTheme toggles theme", () => {
        const { result, store } = renderWithMockThemeStore();

        act(() => {
            result.current.toggleTheme();
        });

        const state = store.getState();

        expect(state.theme.isDark).toBeTruthy();
    });

    test("uses DarkAppTheme when isDark is true", () => {
        const { result } = renderWithMockThemeStore({
            theme: { isDark: true },
        });

        expect(result.current.isDark).toBe(true);
        expect(result.current.theme).toBe(DarkAppTheme);
    });


    test("theme switches from light to dark after toggleTheme", () => {
        const { result } = renderWithMockThemeStore();

        const initialTheme = result.current.theme;

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.isDark).toBe(true);
        expect(result.current.theme).not.toBe(initialTheme);
        expect(result.current.theme).toBe(DarkAppTheme);
    });


    test("theme object is memoized when isDark does not change", () => {
        const { result } = renderWithMockThemeStore();

        const theme1 = result.current.theme;
        const theme2 = result.current.theme;

        expect(theme1).toBe(theme2);
    });

});