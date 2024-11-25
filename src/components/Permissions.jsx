import { useState } from 'react';
import { usePermissions } from '../context/PermissionsContext';
import './shared.css';

function Permissions() {
  const { permissions, addPermission, deletePermission } = usePermissions();
  const [newPermission, setNewPermission] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPermission.name && newPermission.description) {
      addPermission(newPermission);
      setNewPermission({ name: '', description: '' });
    }
  };

  return (
    <div className="page-container">
      <h2>Permissions</h2>
      
      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            placeholder="Permission Name"
            value={newPermission.name}
            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newPermission.description}
            onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
          />
          <button type="submit" className="btn-primary">Add Permission</button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Permission Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(permission => (
              <tr key={permission.id}>
                <td>{permission.name}</td>
                <td>{permission.description}</td>
                <td>
                  <button className="btn-danger" onClick={() => deletePermission(permission.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Permissions; 