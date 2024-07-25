import { Provider } from 'react-redux';

import { describe, it, expect } from 'vitest';

import App from '@/src/App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { createTestStore } from './utils';

// Upewnij się, że masz tę funkcję do tworzenia testowego store

describe('App component', () => {
  it('renders Navbar and BottomNav', () => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>,
    );

    // Sprawdza, czy Navbar jest renderowany
    expect(screen.getByRole('top-navigation')).toBeInTheDocument();

    // Sprawdza, czy BottomNav jest renderowany
    expect(screen.getByRole('bottom-navigation')).toBeInTheDocument();
  });

  it('renders the main container', () => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>,
    );

    // Sprawdza, czy główny kontener jest renderowany
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('applies global styles', () => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>,
    );

    // Sprawdza, czy globalne style są stosowane
    const body = document.body;
    expect(body).toHaveStyle('background-color: #0d1117');
    expect(body).toHaveStyle('color: #e6edf3');
    expect(body).toHaveStyle('margin: 0');
    expect(body).toHaveStyle('padding: 0');
  });
});
