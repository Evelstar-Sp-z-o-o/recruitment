import { createSlice } from '@reduxjs/toolkit';

const editModalSlice = createSlice({
  name: 'editModal',
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

export const { openModal, closeModal } = editModalSlice.actions;
export default editModalSlice.reducer;
