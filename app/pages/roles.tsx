import { useState, useEffect } from 'react';
import axios from 'axios';

type Role = {
  id: number;
  name: string;
  description: string;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    };
    fetchRoles();
  }, []);

  // Add role
  const handleAddRole = async () => {
    if (newRole.name && newRole.description) {
      const response = await axios.post('/api/roles', newRole);
      setRoles([...roles, response.data]);
      setNewRole({ name: '', description: '' });
    }
  };

  // Update role
  const handleUpdateRole = async (id: number) => {
    if (editingRole) {
      const response = await axios.put(`/api/roles/${id}`, editingRole);
      setRoles(roles.map((role) => (role.id === id ? response.data : role)));
      setEditingRole(null);
    }
  };

  // Delete role
  const handleDeleteRole = async (id: number) => {
    await axios.delete(`/api/roles/${id}`);
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Manage Roles</h1>

      {/* Add Role */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Role Name"
            className="border p-2 rounded w-1/4"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded w-1/2"
            value={newRole.description}
            onChange={(e) =>
              setNewRole({ ...newRole, description: e.target.value })
            }
          />
          <button
            onClick={handleAddRole}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Roles List */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Roles List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="border p-2">{role.id}</td>
                <td className="border p-2">
                  {editingRole?.id === role.id ? (
                    <input
                      type="text"
                      value={editingRole.name}
                      onChange={(e) =>
                        setEditingRole({ ...editingRole, name: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    role.name
                  )}
                </td>
                <td className="border p-2">
                  {editingRole?.id === role.id ? (
                    <input
                      type="text"
                      value={editingRole.description}
                      onChange={(e) =>
                        setEditingRole({
                          ...editingRole,
                          description: e.target.value,
                        })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    role.description
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  {editingRole?.id === role.id ? (
                    <>
                      <button
                        onClick={() => handleUpdateRole(role.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingRole(null)}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingRole(role)}
                        className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
