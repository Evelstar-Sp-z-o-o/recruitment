import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Alert,
  Snackbar,
  Slide,
  Grid,
} from '@mui/material';

import EditPost from './components/EditPost';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const App: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Router>
      <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: 'auto' }}>
            <Link to="/create" style={{ color: '#fff', textDecoration: 'none' }}>
              Create Post
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        role="main"
        sx={{ padding: '80px 1rem', minHeight: '100vh', bgcolor: '#0d1117', color: '#e6edf3' }}
        // lg={{ maxWidth: 'unset' }}
      >
        <Container>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </Container>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ background: '#121212' }}>
            <BottomNavigationAction sx={{ color: '#e6edf3' }} label="Aktualności" icon={<RestoreIcon />} />
            <BottomNavigationAction sx={{ color: '#e6edf3' }} label="Ulubione" icon={<FavoriteIcon />} />
            <BottomNavigationAction sx={{ color: '#e6edf3' }} label="Archiwum" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Paper>
        <Snackbar
          open={open}
          autoHideDuration={2500}
          onClose={handleClose}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          style={{ marginTop: '4rem' }}
        >
          <Alert>Nic nie robię. Jestem tutaj dla wyglądu 😊</Alert>
        </Snackbar>
      </Grid>
    </Router>
  );
};

export default App;
