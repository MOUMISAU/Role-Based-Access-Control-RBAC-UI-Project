import { createContext, useContext, useState } from 'react';

const RolesContext = createContext();

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer', permissions: ['read'] },
  ]);

  const addRole = (newRole) => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <RolesContext.Provider value={{ roles, addRole, deleteRole }}>
      {children}
    </RolesContext.Provider>
  );
}

export function useRoles() {
  return useContext(RolesContext);
} 