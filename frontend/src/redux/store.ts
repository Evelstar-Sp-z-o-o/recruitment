import { configureStore } from '@reduxjs/toolkit';

import createModalReducer from './createModalSlice';
import editModalReducer from './editModalSlice';

const store = configureStore({
  reducer: {
    createModal: createModalReducer,
    editModal: editModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
