import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import StudentsPage from '../pages/StudentsPage/StudentsPage';
import { AuthProvider } from '../context/AuthContext.jsx';
import { ToastProvider } from '../context/ToastProvider.jsx';
import { getStudents } from '../services/student.service';

vi.mock('../services/student.service', () => ({
  getStudents: vi.fn(),
  createStudent: vi.fn(),
  updateStudent: vi.fn(),
  deleteStudent: vi.fn(),
}));

describe('StudentsPage Form Validation', () => {
  beforeEach(() => {
    getStudents.mockResolvedValue([]);

    localStorage.setItem('token', 'test-token');
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        name: 'Test Admin',
        role: 'ADMIN',
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <AuthProvider>
            <StudentsPage />
          </AuthProvider>
        </ToastProvider>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText('Register Student'));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Department is required.')).toBeInTheDocument();
    expect(screen.getByText('Roll number is required.')).toBeInTheDocument();
  });
});
