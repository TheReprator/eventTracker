import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import homeReducer from '../../features/home/store/homeSlice';
// import eventDetailReducer from '../../features/eventDetail/store/eventDetailSlice';
import localizationReducer from './slices/localizationSlice';
import themeReducer from './slices/themeSlice';

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
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
