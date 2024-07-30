import AppBar from '@mui/material/AppBar';
import { Box, List, ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountBoxOutlined, HomeOutlined } from '@mui/icons-material';
import AccountLink from '../ui/account-link';

const listContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const listItemStyles = {
    padding: 1,
};

const largeIconStyles = {
    color: 'black',
};

const appBarStyles = { boxShadow: 'none', maxWidth: 'md', margin: 'auto', px: 2 };

const Header = () => {
    return (
        <AppBar position="static" color="transparent" sx={appBarStyles}>
            <List sx={listContainerStyles}>
                <Link to='/posts'>
                    <ListItemButton sx={listItemStyles}>
                        <ListItemIcon>
                            <HomeOutlined sx={largeIconStyles} fontSize="large" />
                        </ListItemIcon>
                    </ListItemButton>
                </Link>
                <Link to='/my-profile'>
                    <ListItemButton sx={listItemStyles}>
                        <ListItemIcon>
                            <AccountBoxOutlined sx={largeIconStyles} fontSize="large" />
                        </ListItemIcon>
                    </ListItemButton>
                </Link>
                <Box ml='auto' mt={0}>
                    <AccountLink />
                </Box>
            </List>
        </AppBar>
    );
};

export default Header;
