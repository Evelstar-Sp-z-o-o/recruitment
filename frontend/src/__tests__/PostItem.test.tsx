import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import postsReducer from '@/src/store/slices/postsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';

import PostItem from '../components/PostItem/PostItem';

const mockPost = {
  data: {
    body: 'This is a test post',
    author: 'John Doe',
    created: new Date().getTime() - 10000,
    edited: new Date().getTime(),
    postId: '1',
  },
  id: 1,
};

const renderComponent = (post, reducedView = false) => {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <PostItem post={post} reducedView={reducedView} />
      </BrowserRouter>
    </Provider>,
  );
};

describe('PostItem', () => {
  it('renders correctly with provided props', () => {
    renderComponent(mockPost);
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles click event to navigate to post details when reducedView is true', () => {
    const { container } = renderComponent(mockPost, true);
    const postWrapper = container.querySelector('div');
    expect(postWrapper).toBeInTheDocument();
    fireEvent.click(postWrapper);
  });

  it('confirms post deletion', () => {
    renderComponent(mockPost);
    fireEvent.click(screen.getByLabelText(/delete/i));
    expect(screen.getByText('Delete post')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
  });
});
