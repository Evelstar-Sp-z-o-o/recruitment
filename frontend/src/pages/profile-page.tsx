import { Box, Typography } from '@mui/material';
import BackToMainPageButton from '../components/ui/back-to-main-page-button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const containerStyles = {
    minHeight: 'calc(100vh - 300px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
};

const Profile = () => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <Box sx={containerStyles}>
            <Typography variant="h3" component="h1" fontWeight="bold">
                My profile
            </Typography>
            <Typography mt={2} variant="subtitle1" component="h2" >
                Email: {user.email}
            </Typography>
            <Typography component="p" m={3}>
                Work in progress
            </Typography>
            <BackToMainPageButton />
        </Box>
    );
};

export default Profile;
