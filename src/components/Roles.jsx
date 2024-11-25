import { useState } from 'react';
import { useRoles } from '../context/RolesContext';
import { usePermissions } from '../context/PermissionsContext';
import './shared.css';

function Roles() {
  const { roles, addRole, deleteRole } = useRoles();
  const { permissions } = usePermissions();
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRole.name && newRole.permissions.length > 0) {
      addRole(newRole);
      setNewRole({ name: '', permissions: [] });
    }
  };

  const handlePermissionChange = (permissionName) => {
    const updatedPermissions = newRole.permissions.includes(permissionName)
      ? newRole.permissions.filter(p => p !== permissionName)
      : [...newRole.permissions, permissionName];
    
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  return (
    <div className="page-container">
      <h2>Roles</h2>
      
      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-form-column">
          <div className="form-group">
            <input
              type="text"
              placeholder="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Permissions:</label>
            <div className="permissions-grid">
              {permissions.map(permission => (
                <label key={permission.id} className="permission-item">
                  <input
                    type="checkbox"
                    checked={newRole.permissions.includes(permission.name)}
                    onChange={() => handlePermissionChange(permission.name)}
                  />
                  <div className="permission-info">
                    <span className="permission-name">{permission.name}</span>
                    <span className="permission-description">{permission.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn-primary">Add Role</button>
          </div>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(', ')}</td>
                <td>
                  <button className="btn-danger" onClick={() => deleteRole(role.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roles; 