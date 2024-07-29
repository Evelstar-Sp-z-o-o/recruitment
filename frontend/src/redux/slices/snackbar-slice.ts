import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'success',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity?: 'success' | 'error' | 'warning' | 'info' }>,
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'success';
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = '';
      state.severity = 'success';
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
