import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { store, persistor } from '@/appConfiguration/store/rootStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { AppThemeProvider, useAppTheme } from './theme/ThemeContext';
import { LocaleProvider } from './localization/LocaleContext';
import { applyLocalization } from './store/slices/localizationEffectMiddleware';

const AppContent = () => {

  const { isDark } = useAppTheme();
  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <AppNavigator />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        onBeforeLift={() => {
          const { language, isRTL } = store.getState().localization;
          applyLocalization(language, isRTL);
        }}
        loading={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        }
      >
        <AppThemeProvider>
          <SafeAreaProvider>
            <LocaleProvider>
              <AppContent />
            </LocaleProvider>
          </SafeAreaProvider>
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;