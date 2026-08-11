import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import StudentsPage from '../pages/StudentsPage/StudentsPage';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('StudentsPage Form Validation', () => {
  it('shows validation errors when submitting empty form', () => {
    localStorage.setItem(
      'token',
      'test-token'
    );

    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        name: 'Test Admin',
        role: 'ADMIN',
      })
    );

    render(
      <BrowserRouter>
        <AuthProvider>
          <StudentsPage />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Register Student'));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Department is required.')).toBeInTheDocument();
    expect(screen.getByText('Roll number is required.')).toBeInTheDocument();
  });
});
