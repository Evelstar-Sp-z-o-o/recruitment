import { configureStore } from '@reduxjs/toolkit';

import responseModalReducer from './responseModalSlice';

const store = configureStore({
  reducer: {
    responseModal: responseModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
