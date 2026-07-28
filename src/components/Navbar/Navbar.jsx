import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-brand">Student Management System</div>
      <div className="navbar-links">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          Students
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
