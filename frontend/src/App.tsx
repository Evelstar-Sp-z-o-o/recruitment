import { FC, useState, Fragment } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { blue, grey } from '@mui/material/colors';

import Logo from './assets/logo.svg?react';
import Avt from './assets/userIcon.svg';
import { useGetPostsQuery } from './store';
import './styles/main.scss';

const formatDate = (date) => {
  const dateToConvert = new Date(date);

  return `${dateToConvert.getDate()}.${
    dateToConvert.getMonth() && dateToConvert.getMonth() + 1 > 9
      ? dateToConvert.getMonth() + 1
      : `0${dateToConvert.getMonth() + 1}`
  }.${dateToConvert.getFullYear()}, ${dateToConvert.getHours()}:${
    dateToConvert.getMinutes() && dateToConvert.getMinutes() > 9
      ? dateToConvert.getMinutes()
      : `0${dateToConvert.getMinutes()}`
  }`;
};

interface IAddNewPostProps {
  isFixed?: boolean;
}

const AddNewPost: FC<IAddNewPostProps> = ({ isFixed }) => {
  return (
    <Tooltip title={'Add new post'}>
      <IconButton
        sx={{
          position: isFixed ? 'fixed' : 'static',
          bottom: '3rem',
          right: '1rem',
        }}
      >
        <AddIcon
          sx={{
            color: grey['A100'],
            fontSize: '3.5rem',
            bgcolor: blue[700],
            borderRadius: '50%',
            p: 0,
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

interface IMenuProps {
  open: boolean;
  toggleMenu: () => void;
}

const Menu: FC<IMenuProps> = ({ open, toggleMenu }) => {
  return (
    <Drawer component="aside" open={open} onClose={toggleMenu}>
      <Box className="sideMenu">
        <Container className="menuHeader" maxWidth="xl">
          <Avatar alt="User" src={Avt as string} />
          <AddNewPost />
        </Container>
        <MenuList>
          <Link href="/" color="inherit" underline="hover">
            <MenuItem>
              <ListItemText>Home</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/profile" color="inherit" underline="hover">
            <MenuItem>
              <ListItemText>My posts</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/logout" color="inherit" underline="hover">
            <MenuItem sx={{ mt: '3rem' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Box>
    </Drawer>
  );
};

const App: FC = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [open, setOpen] = useState(false);

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      {isLoading ? (
        'Loading'
      ) : (
        <>
          <AppBar position="static" color="default" sx={{ padding: '2rem', position: 'relative' }}>
            <IconButton onClick={toggleMenu(true)} sx={{ width: '4rem', height: '4rem' }}>
              <Avatar alt="User" src={Avt as string} />
            </IconButton>
            <SvgIcon
              inheritViewBox
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '3rem',
              }}
            >
              <Logo className="logo" />
            </SvgIcon>
          </AppBar>
          {posts && posts.length > 0
            ? posts.map((post, index) => (
                <Fragment key={post.id}>
                  <Card sx={{ p: '1.5rem 1rem' }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} alt="">
                          <TextsmsOutlinedIcon />
                        </Avatar>
                      }
                      title={post.data.author}
                      subheader={`${formatDate(post.data.created)}${
                        post.data.created !== post.data.edited ? ' (edited)' : null
                      }`}
                    />
                    <CardContent>
                      <Typography color="text.secondary">{post.data.body}</Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                      <IconButton aria-label="add to favorites">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <DeleteForeverIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                  {index !== posts.length - 1 ? <Divider /> : null}
                </Fragment>
              ))
            : 'Nothing to see...'}

          <Menu open={open} toggleMenu={toggleMenu(false)} />
          <AddNewPost isFixed />
          <Container
            component="footer"
            className="footer"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: '2rem',
            }}
          >
            TWIXER
          </Container>
        </>
      )}
    </Box>
  );
};

export default App;
