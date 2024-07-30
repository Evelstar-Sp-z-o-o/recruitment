import { describe, test, expect } from 'vitest';

import reducer, { showSnackbar, hideSnackbar } from '../redux/slices/snackbar-slice';

describe('snackbarSlice', () => {
  const initialState = {
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  };

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle showSnackbar', () => {
    const action = showSnackbar({ message: 'Test message', severity: 'error' });
    const expectedState = {
      open: true,
      message: 'Test message',
      severity: 'error' as 'success' | 'error' | 'warning' | 'info',
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle showSnackbar with default severity', () => {
    const action = showSnackbar({ message: 'Default severity message' });
    const expectedState = {
      open: true,
      message: 'Default severity message',
      severity: 'success',
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle hideSnackbar', () => {
    const action = hideSnackbar();
    const stateWithSnackbarOpen = {
      open: true,
      message: 'Test message',
      severity: 'warning' as 'success' | 'error' | 'warning' | 'info',
    };

    const expectedState = {
      open: false,
      message: '',
      severity: 'success',
    };

    expect(reducer(stateWithSnackbarOpen, action)).toEqual(expectedState);
  });
});
