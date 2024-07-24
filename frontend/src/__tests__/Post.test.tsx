import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Post from '@/src/components/Post';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import { createTestStore } from './utils';

// Mockowanie useNavigate i useDispatch
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Post Component', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  // Konfiguracja mocków przed każdym testem
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  // Przykładowe dane postu
  const post = {
    id: '1',
    data: {
      body: 'Sample Post Body',
      author: 'Author Name',
      created: Math.floor(Date.now() / 1000) - 10000,
      edited: Math.floor(Date.now() / 1000),
    },
  };

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={createTestStore()}>
        <Post post={post} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render post details correctly', () => {
    const { getByText } = render(
      <Provider store={createTestStore()}>
        <Post post={post} />
      </Provider>,
    );

    expect(getByText('Sample Post Body')).toBeInTheDocument();
    expect(getByText(`ID: ${post.id}`)).toBeInTheDocument();
    expect(getByText(`Author: ${post.data.author}`)).toBeInTheDocument();
    expect(getByText(`Created: ${new Date(post.data.created * 1000).toLocaleString()}`)).toBeInTheDocument();
    expect(getByText(`Edited: ${new Date(post.data.edited * 1000).toLocaleString()}`)).toBeInTheDocument();
  });

  it('should handle edit button click', () => {
    const { getByText } = render(
      <Provider store={createTestStore()}>
        <Post post={post} />
      </Provider>,
    );

    fireEvent.click(getByText('Edit'));
    expect(mockNavigate).toHaveBeenCalledWith(`/edit/${post.id}`);
  });

  it('should handle delete button click', () => {
    const { getByText } = render(
      <Provider store={createTestStore()}>
        <Post post={post} />
      </Provider>,
    );

    fireEvent.click(getByText('Delete'));
    expect(mockDispatch).toHaveBeenCalledWith(deletePost(post.id));
  });
});

