"use client"
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {apiSlice} from '../api/api-slice';
import userSlice from './userSlice';
import storage from "redux-persist/lib/storage"
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer =persistReducer(persistConfig, combineReducers({
  userSlice: userSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
}));


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;