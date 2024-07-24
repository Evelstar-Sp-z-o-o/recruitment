import { postsApi } from '@/src/store/api/posts';
import { configureStore } from '@reduxjs/toolkit';

export * from './api/posts.ts';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});
