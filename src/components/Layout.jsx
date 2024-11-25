import { Link, Outlet } from 'react-router';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>RBAC Admin</h2>
        <ul>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/roles">Roles</Link></li>
          <li><Link to="/permissions">Permissions</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout; 