import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StudentsPage from '../pages/StudentsPage/StudentsPage';

describe('StudentsPage Form Validation', () => {
  it('shows validation errors when submitting empty form', () => {
    render(<StudentsPage />);

    const submitButton = screen.getByText('Register Student');

    fireEvent.click(submitButton);

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Department is required.')).toBeInTheDocument();
    expect(screen.getByText('Age is required.')).toBeInTheDocument();
  });
});