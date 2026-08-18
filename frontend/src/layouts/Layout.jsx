import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="app-footer-inner">
          <span>
            <strong>Student Management System</strong> &mdash; Arbisoft AI
            Internship 2026
          </span>
          <span>Built with React, Express &amp; PostgreSQL</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
