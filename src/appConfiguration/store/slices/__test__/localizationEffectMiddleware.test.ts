import i18n from '@/appConfiguration/localization/i18n';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import * as rootStore from '@/appConfiguration/store/rootStore';
import { localizationEffectMiddleware } from '../localizationEffectMiddleware';

jest.mock('@/appConfiguration/localization/i18n', () => ({
  changeLanguage: jest.fn()
}));

jest.mock('react-native', () => ({
  I18nManager: {
    isRTL: false,
    allowRTL: jest.fn(),
    forceRTL: jest.fn()
  }
}));

jest.mock('../../rootStore', () => ({
  persistor: { flush: jest.fn(() => Promise.resolve()) },
  store: {
    getState: jest.fn(() => ({
      localization: { language: 'ar', isRTL: true },
    })),
  },
}));

const createMiddlewareEnv = (initialLang = 'en', initialRTL = false) => {
  const getState = () => ({
    localization: { language: initialLang, isRTL: initialRTL }
  });

  const storeAPI = { getState, dispatch: jest.fn() };
  const next = jest.fn(action => action);

  const middleware = localizationEffectMiddleware(storeAPI);
  return { middleware, next, storeAPI };
};

describe('localizationEffectMiddleware', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  
  test('does NOT run applyLocalization when language has not changed', async () => {
    const { middleware, next } = createMiddlewareEnv('en', false);

    // first dispatch initializes lastLang
    middleware(next)({ type: 'INIT' });

    // language still "en"
    middleware(next)({ type: 'SAME_LANGUAGE' });

    expect(rootStore.persistor.flush).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
    expect(RNRestart.Restart).not.toHaveBeenCalled();
  });



  test('runs applyLocalization when language changes', async () => {
    const env = createMiddlewareEnv('en', false);
    const { middleware, next, storeAPI } = env;

    // 1st dispatch initializes lastLang = "en"
    middleware(next)({ type: 'INIT' });

    // Change storeAPI.getState to simulate updated language
    storeAPI.getState = () => ({
      localization: { language: 'ar', isRTL: true }
    });

    // Mock rootStore.store.getState for applyLocalization()
    (rootStore.store.getState as jest.Mock).mockReturnValue({
      localization: { language: 'ar', isRTL: true }
    });

    // 2nd dispatch triggers change
    middleware(next)({ type: 'CHANGE_LANG' });

    expect(rootStore.persistor.flush).toHaveBeenCalled();

    await Promise.resolve();

    expect(i18n.changeLanguage).toHaveBeenCalledWith('ar');
    expect(I18nManager.allowRTL).toHaveBeenCalledWith(true);
    expect(I18nManager.forceRTL).toHaveBeenCalledWith(true);
    expect(RNRestart.Restart).toHaveBeenCalled();
  });



  test('does NOT restart app if RTL has NOT changed', async () => {
    const { middleware, next } = createMiddlewareEnv('ar', true);

    middleware(next)({ type: 'INIT' });

    // Now store reports same RTL setting
    (rootStore.store.getState as jest.Mock).mockReturnValue({
      localization: { language: 'ar', isRTL: true }
    });

    middleware(next)({ type: 'LANG_UNCHANGED' });

    expect(rootStore.persistor.flush).not.toHaveBeenCalled();
    expect(RNRestart.Restart).not.toHaveBeenCalled();
  });
});
