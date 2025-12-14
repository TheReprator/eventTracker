export const Appearance = {
  getColorScheme: jest.fn(),
};

export const I18nManager = {
  isRTL: false,
  allowRTL: jest.fn(),
  forceRTL: jest.fn(),
};

export default {
  Appearance,
  I18nManager,
};
