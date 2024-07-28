import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  username: string;
};

const initialState: State = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = '';
    },
  },
});

export const { setUsername, clearUsername } = userSlice.actions;

export default userSlice;
