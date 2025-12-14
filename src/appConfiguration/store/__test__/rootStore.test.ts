import type { RootState, AppDispatch } from "../rootStore";
import type { Middleware } from "@reduxjs/toolkit";

const passthrough: Middleware =
  () => next => action => next(action);

jest.mock("../slices/localizationEffectMiddleware", () => ({
  localizationEffectMiddleware: passthrough,
}));


describe("Redux Root Store", () => {
  let store: typeof import("../rootStore").store;
  let persistor: typeof import("../rootStore").persistor;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    const mod = require("../rootStore");
    store = mod.store;
    persistor = mod.persistor;
  });

  /* -------------------------------------------------------------- */
  /* 1. Store initializes with correct reducer keys                  */
  /* -------------------------------------------------------------- */
  test("initializes store with correct reducer keys", () => {
    const state = store.getState();

    expect(state).toHaveProperty("localization");
    expect(state).toHaveProperty("theme");
    expect(state).toHaveProperty("favorites");
    expect(state).toHaveProperty("home");
    expect(state).toHaveProperty("homeApi");
  });

  /* -------------------------------------------------------------- */
  /* 2. Persist reducer is configured correctly                     */
  /* -------------------------------------------------------------- */
  test("persistReducer is wired correctly", () => {
    const { persistReducer } = require("redux-persist");

    expect(persistReducer).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "root",
        whitelist: ["favorites", "localization", "theme"],
      }),
      expect.any(Function)
    );
  });

  /* -------------------------------------------------------------- */
  /* 3. Store exposes dispatch & getState                            */
  /* -------------------------------------------------------------- */
  test("store exposes dispatch and getState", () => {
    expect(typeof store.dispatch).toBe("function");
    expect(typeof store.getState).toBe("function");
  });


  /* -------------------------------------------------------------- */
  /* 4. Persistor exposes lifecycle methods                          */
  /* -------------------------------------------------------------- */
  test("persistor exposes flush and purge", () => {
    expect(typeof persistor.flush).toBe("function");
    expect(typeof persistor.purge).toBe("function");
  });


  /* -------------------------------------------------------------- */
  /* 5. Store supports unknown actions                               */
  /* -------------------------------------------------------------- */
  test("dispatching unknown action does not crash", () => {
    const prev = store.getState();
    store.dispatch({ type: "UNKNOWN_ACTION" });
    const next = store.getState();

    expect(next).toEqual(prev);
  });


  /* -------------------------------------------------------------- */
  /* 6. RootState typing compatibility                               */
  /* -------------------------------------------------------------- */
  test("RootState typing compatibility", () => {
    const state: RootState = store.getState();
    expect(state).toBeDefined();
  });


  /* -------------------------------------------------------------- */
  /* 7. AppDispatch typing compatibility                             */
  /* -------------------------------------------------------------- */
  test("AppDispatch typing compatibility", () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(dispatch).toBeDefined();
  });

});
