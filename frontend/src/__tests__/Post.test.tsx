import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Post from '@/src/components/Post';
import postsReducer from '@/src/store/postsSlice';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

const theme = createTheme();

describe('Post', () => {
  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Post postId="1" text="Test post" author="Test Author" created={new Date()} />
            </ThemeProvider>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
