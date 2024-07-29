import { Box, Button, Typography } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import React from 'react'

export interface Props {
    errorText: string
    refetchFn: () => void
}

const containerStyles = {
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}

const errorTextStyles = {
    marginBottom: '20px',
}

const FetchErrorWrapper: React.FC<Props> = ({ refetchFn, errorText }) => {
    return (
        <Box sx={containerStyles}>
            <Typography sx={errorTextStyles}>{errorText}</Typography>
            {refetchFn && (
                <Button startIcon={<ReplayIcon />} onClick={() => refetchFn()}>
                    Try again
                </Button>
            )}
        </Box>
    )
}

export default FetchErrorWrapper
