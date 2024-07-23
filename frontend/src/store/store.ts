import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;