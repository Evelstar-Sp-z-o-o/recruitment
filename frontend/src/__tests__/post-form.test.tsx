import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from '../components/base/post-form';
import { PostFormData } from '@/src/types';
import { describe, test, expect, vi } from 'vitest';

const mockOnSubmit = vi.fn();

describe('PostForm Component', () => {
    const initialValues: PostFormData = {
        body: 'Initial post content',
    };

    test('disables submit button when form is invalid or not dirty', async () => {
        render(<PostForm onSubmit={mockOnSubmit} initialValues={initialValues} isPending={false} />);

        expect(screen.getByText('Publish post')).toBeDisabled();


        fireEvent.change(screen.getByPlaceholderText('What do you want to share?'), { target: { value: 'Updated content' } });

        await waitFor(() => expect(screen.getByText('Publish post')).toBeEnabled());
    });

    test('displays error message when input exceeds character limit', async () => {
        render(<PostForm onSubmit={mockOnSubmit} initialValues={initialValues} isPending={false} />);

        fireEvent.change(screen.getByPlaceholderText('What do you want to share?'), { target: { value: 'a'.repeat(501) } });

        await waitFor(() => expect(screen.getByText('Description cannot exceed 500 characters')).toBeInTheDocument());
    });

});
