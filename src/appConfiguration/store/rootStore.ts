import { configureStore, combineReducers, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

// import homeReducer from '../../features/home/store/homeSlice';
// import eventDetailReducer from '../../features/eventDetail/store/eventDetailSlice';
import localizationReducer from './slices/localizationSlice';
import themeReducer from './slices/themeSlice';
import { localizationEffectMiddleware } from './slices/localizationEffectMiddleware';

const rootReducer = combineReducers({
  // home: homeReducer,
  // eventDetail: eventDetailReducer,
  localization: localizationReducer,
  theme: themeReducer
});

const persistConfig = { key:'root', storage: AsyncStorage, whitelist:['home','localization','theme'] };

const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisted,
  middleware: ((getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(localizationEffectMiddleware)
      .concat(__DEV__ ? logger : [])
  ) as ConfigureStoreOptions['middleware'],
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
