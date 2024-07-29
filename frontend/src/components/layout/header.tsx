import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import Logo from './logo';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountBoxOutlined, HomeOutlined } from '@mui/icons-material';

const containerStyles = {
    height: '64px', border: '1px solid lightgray',
    padding: {
        sm: 2,
        md: 4
    }
};

const listContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
}

const listItemStyles = {
    padding: 1,
};

const largeIconStyles = {
    color: 'black',
};

const appBarStyles = { boxShadow: 'none', maxWidth: 'md', margin: 'auto' };

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
            </List>
        </AppBar>
    );
};

export default Header;
