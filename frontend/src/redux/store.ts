import { configureStore } from '@reduxjs/toolkit';

import snackbarReducer from './slices/snackbar-slice';
import userReducer from './slices/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
