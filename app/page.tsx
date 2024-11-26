'use client'

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import RolesPage from './pages/roles';
import PermissionsPage from './pages/permissions';
import UsersPage from './pages/users';

export default function Home() {
  return (
    <div className='container'>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/roles">Roles</Link>
          </li>
          <li>
            <Link to="/permissions">Permissions</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
    </div>
  );
}
