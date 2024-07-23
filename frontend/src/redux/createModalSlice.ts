import { createSlice } from '@reduxjs/toolkit';

const createModalSlice = createSlice({
  name: 'createModal',
  initialState: { isOpen: false },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = createModalSlice.actions;
export default createModalSlice.reducer;
