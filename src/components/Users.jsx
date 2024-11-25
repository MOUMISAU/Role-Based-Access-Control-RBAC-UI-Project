import { useState } from 'react';
import { useRoles } from '../context/RolesContext';
import './shared.css';

function Users() {
  const { roles } = useRoles();
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: roles[0]?.name.toLowerCase() || 'user', status: 'active' });
  const [editingUser, setEditingUser] = useState(null);

  const addUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', role: roles[0]?.name.toLowerCase() || 'user', status: 'active' });
    }
  };

  const startEditing = (user) => {
    setEditingUser({ ...user });
  };

  const saveEdit = () => {
    if (editingUser && editingUser.name && editingUser.email) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const toggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="page-container">
      <h2>Users</h2>
      
      <div className="form-container">
        <form onSubmit={addUser} className="add-form">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            {roles.map(role => (
              <option key={role.id} value={role.name.toLowerCase()}>
                {role.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary">Add User</button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          name: e.target.value
                        })}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          email: e.target.value
                        })}
                      />
                    </td>
                    <td>
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          role: e.target.value
                        })}
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.name.toLowerCase()}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={editingUser.status}
                        onChange={(e) => setEditingUser({
                          ...editingUser,
                          status: e.target.value
                        })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn-primary" onClick={saveEdit}>Save</button>
                      <button className="btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                    <td>
                      <span 
                        className={`status-badge ${user.status}`}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-secondary" onClick={() => startEditing(user)}>Edit</button>
                      <button className="btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users; 