import { configureStore, combineReducers } from '@reduxjs/toolkit';
import aadharApi from '../api/axiosApi';
import aadharSlice from './aadharSlice';

const rootReducer = combineReducers({
  aadharSlice: aadharSlice.reducer,
  [aadharApi.reducerPath]: aadharApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aadharApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;