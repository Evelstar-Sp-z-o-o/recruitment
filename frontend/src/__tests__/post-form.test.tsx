import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from '../components/base/post-form';
import { PostFormData } from '@/src/types';
import { describe, test, expect, vi } from 'vitest';

// Mock onSubmit function
const mockOnSubmit = vi.fn();

describe('PostForm Component', () => {
    const initialValues: PostFormData = {
        body: 'Initial post content',
    };

    // test('renders form with initial values', () => {
    //     const el = render(<PostForm onSubmit={mockOnSubmit} initialValues={initialValues} isPending={false} />);

    //     // Check if the initial text is rendered
    //     expect(screen.getByPlaceholderText('What do you want to share?')).toHaveValue('Initial post content');
    //     expect(el.getByText('21/500 characters'));
    // });

    // test('updates character count on input change', async () => {
    //     render(<PostForm onSubmit={mockOnSubmit} initialValues={initialValues} isPending={false} />);

    //     // Get the input field and change its value
    //     const inputField = screen.getByPlaceholderText('What do you want to share?');
    //     fireEvent.change(inputField, { target: { value: 'Updated content' } });

    //     // Verify character count
    //     await waitFor(() => expect(screen.getByText('14/500 characters')).toBeInTheDocument())
    // });

    test('disables submit button when form is invalid or not dirty', async () => {
        render(<PostForm onSubmit={mockOnSubmit} initialValues={initialValues} isPending={false} />);

        // Check initial state
        expect(screen.getByText('Publish post')).toBeDisabled();

        // Change input value to make form dirty
        fireEvent.change(screen.getByPlaceholderText('What do you want to share?'), { target: { value: 'Updated content' } });

        // After changing input, the button should be enabled
        await waitFor(() => expect(screen.getByText('Publish post')).toBeEnabled());
    });

    test('displays error message when input exceeds character limit', async () => {
        render(<PostForm onSubmit={mockOnSubmit} initialValues={initialValues} isPending={false} />);

        // Change input value to exceed character limit
        fireEvent.change(screen.getByPlaceholderText('What do you want to share?'), { target: { value: 'a'.repeat(501) } });

        // Wait for the error message to appear
        await waitFor(() => expect(screen.getByText('Description cannot exceed 500 characters')).toBeInTheDocument());
    });

});
