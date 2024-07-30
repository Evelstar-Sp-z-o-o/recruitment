import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { RootState } from '@/src/redux/store';
import { hideSnackbar } from '@/src/redux/slices/snackbar-slice';

const GlobalSnackbar: React.FC = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state: RootState) => state.snackbar);

    const handleClose = () => {
        dispatch(hideSnackbar());
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;