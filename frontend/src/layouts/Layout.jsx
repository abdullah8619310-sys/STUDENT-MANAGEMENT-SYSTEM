import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
