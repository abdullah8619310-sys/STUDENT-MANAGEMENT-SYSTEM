import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';

function getInitials(name) {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" end className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3Z"
                fill="currentColor"
              />
              <path
                d="M5 10.18V15c0 1.66 3.13 3 7 3s7-1.34 7-3v-4.82l-7 3.18-7-3.18Z"
                fill="currentColor"
                opacity="0.55"
              />
            </svg>
          </span>
          <span>Student Management System</span>
        </NavLink>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={menuOpen ? 'navbar-links open' : 'navbar-links'}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/students" className={linkClass} onClick={closeMenu}>
            Students
          </NavLink>

          <NavLink to="/about" className={linkClass} onClick={closeMenu}>
            About
          </NavLink>

          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="user-avatar" aria-hidden="true">
                {getInitials(user?.name)}
              </span>
              <span className="nav-user">
                <span className="nav-user-name">{user?.name}</span>
                <span className="badge badge-primary">{user?.role}</span>
              </span>

              <button
                type="button"
                className="btn btn-danger-outline btn-sm"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-primary btn-sm navbar-login"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
