import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Users from './components/Users';
import Roles from './components/Roles';
import Permissions from './components/Permissions';
import { RolesProvider } from './context/RolesContext';
import { PermissionsProvider } from './context/PermissionsContext';

function App() {
  return (
    <PermissionsProvider>
      <RolesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/users" replace />} />
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<Roles />} />
              <Route path="permissions" element={<Permissions />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RolesProvider>
    </PermissionsProvider>
  );
}

export default App;