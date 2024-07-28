import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';

import { setNickname } from '@/src/store/slices/userSlice';
import { render, screen, fireEvent } from '@testing-library/react';

import NicknameModal from '../shared/components/NicknameModal';

const mockStore = configureStore([]);
const initialState = { user: { nickname: '' } };

const renderWithRedux = (component: React.ReactNode, { store = mockStore(initialState) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('NicknameModal', () => {
  it('renders correctly when open', () => {
    renderWithRedux(<NicknameModal nickname="" isOpen={true} closeModal={vi.fn()} />);
    expect(screen.getByText(/Set your eveltter nickname!/i)).toBeInTheDocument();
  });

  it('validates nickname length correctly', () => {
    renderWithRedux(<NicknameModal nickname="" isOpen={true} closeModal={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/set your nickname/i), { target: { value: 'a' } });
    expect(screen.queryByText(/Nickname must be between 1 and 40 characters/i)).toBeNull();

    fireEvent.change(screen.getByLabelText(/set your nickname/i), { target: { value: '' } });
    expect(screen.getByText(/Nickname must be between 1 and 40 characters/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/set your nickname/i), { target: { value: 'a'.repeat(41) } });
    expect(screen.getByText(/Nickname must be between 1 and 40 characters/i)).toBeInTheDocument();
  });

  it('dispatches setNickname when save is clicked with valid nickname', () => {
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    renderWithRedux(<NicknameModal nickname="" isOpen={true} closeModal={vi.fn()} />, { store });
    const input = screen.getByLabelText(/set your nickname/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(input, { target: { value: 'validNickname' } });
    fireEvent.click(saveButton);

    expect(store.dispatch).toHaveBeenCalledWith(setNickname('validNickname'));
  });

  it('does not dispatch setNickname when save is clicked with invalid nickname', () => {
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    renderWithRedux(<NicknameModal nickname="" isOpen={true} closeModal={vi.fn()} />, { store });
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.click(saveButton);
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
