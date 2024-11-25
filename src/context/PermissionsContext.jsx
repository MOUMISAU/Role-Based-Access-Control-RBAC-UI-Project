import { createContext, useContext, useState } from 'react';

const PermissionsContext = createContext();

export function PermissionsProvider({ children }) {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'read', description: 'Can read content' },
    { id: 2, name: 'write', description: 'Can create and edit content' },
    { id: 3, name: 'delete', description: 'Can delete content' },
  ]);

  const addPermission = (newPermission) => {
    setPermissions([...permissions, { ...newPermission, id: permissions.length + 1 }]);
  };

  const deletePermission = (id) => {
    setPermissions(permissions.filter(permission => permission.id !== id));
  };

  return (
    <PermissionsContext.Provider value={{ permissions, addPermission, deletePermission }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  return useContext(PermissionsContext);
} 