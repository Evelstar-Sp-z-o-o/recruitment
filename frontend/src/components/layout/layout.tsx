import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import Container from '@mui/material/Container';

import ErrorBoundaryComponent from '../ui/error-boundary-component';
import Sidebar from './sidebar';
import MainContentContainer from './main-content-container';
import Header from './header';
import GlobalSnackbar from '../ui/snackbar';

const layoutContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

const mainContainerStyles = {
    minHeight: '100vh',
    display: { sm: 'flex' },
    p: 0
};


const Layout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
            <Box sx={layoutContainerStyles}>
                <CssBaseline />
                <Container maxWidth="lg" sx={mainContainerStyles}>
                    {isMobile ? <Header /> : <Sidebar />}
                    <MainContentContainer>
                        <Outlet />
                    </MainContentContainer>
                </Container>
            </Box>
            <GlobalSnackbar />
        </ErrorBoundary>
    );
};

export default Layout;
