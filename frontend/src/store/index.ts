import { postsApi } from '@/src/store/api/posts';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUser = null;
const initialLogin = false;

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
  },
});

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLogin,
  reducers: {
    setLogin(_state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const { setLogin } = loginSlice.actions;

export * from './api/posts.ts';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});
