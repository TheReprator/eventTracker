const actual = jest.requireActual("redux-persist");

export const persistReducer = jest.fn((_cfg, reducer) => reducer);

export const persistStore = jest.fn(() => ({
  flush: jest.fn(),
  purge: jest.fn(),
}));

export default {
  ...actual,
  persistReducer,
  persistStore,
};
