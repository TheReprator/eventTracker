import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react-native";
import localizationReducer, { LanguageType } from "@/appConfiguration/store/slices/localizationSlice";
import { LocaleProvider, useAppLocale } from "../LocaleContext";
import { changeLanguage } from "./__mock__/i18n.mock";


const rootReducer = combineReducers({
    localization: localizationReducer,
});

const renderWithStore = (preloadedState?: any) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
            <LocaleProvider>{children}</LocaleProvider>
        </Provider>
    );

    return {
        store,
        ...renderHook(() => useAppLocale(), { wrapper }),
    };
};


describe("LocaleContext", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("throws error when used outside LocaleProvider", () => {
        expect(() => renderHook(() => useAppLocale()))
            .toThrow("useAppLocale must be used inside LocaleProvider");
    });

    test("exposes language and RTL from Redux state", () => {
        const { result } = renderWithStore();

        expect(result.current.language).toBe(LanguageType.ENGLISH);
        expect(result.current.isRTL).toBe(false);
    });

    test("changeLanguage dispatches setLanguage and updates state", () => {
        const { result, store } = renderWithStore();

        act(() => {
            result.current.changeLanguage(LanguageType.ARABIC);
        });

        const state = store.getState().localization;

        expect(state.language).toBe(LanguageType.ARABIC);
        expect(state.isRTL).toBe(true);
    });

    test("changeLanguage calls i18n.changeLanguage", () => {
        const { result } = renderWithStore();

        act(() => {
            result.current.changeLanguage(LanguageType.ARABIC);
        });

        expect(changeLanguage)
            .toHaveBeenCalledWith(LanguageType.ARABIC);
    });

    test("toggleLocale toggles language and RTL", () => {
        const { result, store } = renderWithStore();

        act(() => {
            result.current.toggleLocale();
        });

        const state = store.getState().localization;

        expect(state.language).toBe(LanguageType.ARABIC);
        expect(state.isRTL).toBe(true);
    });

    test("t() returns translated string", () => {
        const { result } = renderWithStore();

        const value = result.current.t("home.title");

        expect(value).toBe("translated:home.title");
        expect(typeof value).toBe("string");
    });

    test("t() always returns string even if i18n returns non-string", () => {
        const { useTranslation } = require("react-i18next");

        useTranslation.mockReturnValueOnce({
            t: () => ({ some: "object" }),
            i18n: { changeLanguage },
        });

        const { result } = renderWithStore();

        const value = result.current.t("any.key");

        expect(typeof value).toBe("string");
    });


    test("context updates when language changes", () => {
        const { result } = renderWithStore();

        const initialLang = result.current.language;

        act(() => {
            result.current.changeLanguage(LanguageType.ARABIC);
        });

        expect(result.current.language).not.toBe(initialLang);
    });
});
