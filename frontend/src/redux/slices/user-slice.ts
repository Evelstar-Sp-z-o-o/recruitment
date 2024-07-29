import { User } from '@/src/types';
import { getUserFromLocalStorage, saveUserToLocalStorage, removeUserFromLocalStorage } from '@/src/utils/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
