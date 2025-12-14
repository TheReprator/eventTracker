export const persistor = {
  flush: jest.fn(() => Promise.resolve()),
};

export const store = {
  getState: jest.fn(),
};
