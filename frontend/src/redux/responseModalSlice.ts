import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, content: '' };

const responseModalSlice = createSlice({
  name: 'responseModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.content = action.payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = responseModalSlice.actions;

export default responseModalSlice.reducer;
