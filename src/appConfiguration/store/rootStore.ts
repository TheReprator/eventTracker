import { configureStore, combineReducers, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import localizationReducer from './slices/localizationSlice';
import eventReducer from '@/features/event/store/homeSlice';
import favoritesReducer from '@/features/event/store/favoritesSlice';
import themeReducer from './slices/themeSlice';
import { localizationEffectMiddleware } from './slices/localizationEffectMiddleware';
import { homeApi } from '@/features/event/api/eventApi';

const rootReducer = combineReducers({
  localization: localizationReducer,
  theme: themeReducer,

  // ⭐ Your new slices
  favorites: favoritesReducer,
  home: eventReducer,

  // ⭐ Required for RTK Query
  [homeApi.reducerPath]: homeApi.reducer,
});

const persistConfig = { key: 'root', storage: AsyncStorage, whitelist: ['favorites', 'localization', 'theme'] };

const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisted,
  middleware: ((getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(localizationEffectMiddleware)
      .concat(homeApi.middleware)
      .concat(__DEV__ ? logger : [])
  ) as ConfigureStoreOptions['middleware'],
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
