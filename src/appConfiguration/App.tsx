import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { store, persistor } from '@/appConfiguration/store/rootStore';
import i18n from '@/appConfiguration/localization/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { AppThemeProvider, useAppTheme } from './theme/ThemeContext';
import { LocaleProvider } from './localization/LocaleContext';

const AppContent = () => {

  const { isDark } = useAppTheme();
  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <AppNavigator />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        onBeforeLift={() => {
          const state = store.getState();
          const lang = state.localization.language;
          i18n.changeLanguage(lang);
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