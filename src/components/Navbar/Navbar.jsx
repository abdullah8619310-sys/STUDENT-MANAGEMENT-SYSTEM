import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>Student Management System</div>

      <div className='navbar-links'>
        <NavLink to='/' end className={linkClass}>
          Home
        </NavLink>

        <NavLink to='/students' className={linkClass}>
          Students
        </NavLink>

        <NavLink to='/about' className={linkClass}>
          About
        </NavLink>

        <span className='nav-user'>
          {user?.name} ({user?.role})
        </span>

        <button type='button' className='logout-button' onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

