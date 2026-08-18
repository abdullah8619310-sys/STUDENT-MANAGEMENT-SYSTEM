import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '../components/Navbar/Navbar';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('shows a Login link and hides the logout button when logged out', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
