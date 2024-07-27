import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, content: '', deleteAction: false };

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
      state.deleteAction = false;
      state.content = '';
    },
    onDeleteAction: (state) => {
      state.deleteAction = true;
    },
    resetDeleteAction: (state) => {
      state.deleteAction = false;
    },
  },
});

export const { openModal, closeModal, onDeleteAction, resetDeleteAction } = responseModalSlice.actions;

export default responseModalSlice.reducer;
