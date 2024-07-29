import { Link } from 'react-router-dom';

import { Adb as AdbIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const iconStyles = { mr: 1, mb: 4 };
const textStyles = {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'lightblue',
    textDecoration: 'none',

};

const Logo = () => {
    return (
        <Link to={'/posts'} style={{ display: 'flex' }}>
            <AdbIcon sx={iconStyles} />
            <Typography variant="h6" noWrap sx={textStyles}>
                Twitter
            </Typography>
        </Link>
    );
};

export default Logo;
