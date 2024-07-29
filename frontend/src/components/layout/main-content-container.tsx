import { Box } from '@mui/material'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const containerStyles = {
  flexGrow: 1,
  padding: 0,
  minHeight: 'calc(100vh - 64px - 64px - 36px)',
  borderRight: '1px solid lightgray',
  borderLeft: { xs: '1px solid lightgray', sm: 'none' }
}

const MainContentContainer: React.FC<Props> = ({ children }) => {
  return (
    <Box component="main" sx={containerStyles}>
      {children}
    </Box>
  )
}

export default MainContentContainer
