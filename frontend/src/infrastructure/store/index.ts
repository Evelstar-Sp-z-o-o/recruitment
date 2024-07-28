import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import apiService from './services/apiService';
import userSlice from './slices/user';

const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
