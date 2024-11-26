import { useState, useEffect } from 'react';
import axios from 'axios';

type Permission = {
  id: number;
  name: string;
  description: string;
};

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState({ name: '', description: '' });
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

  // Fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await axios.get('/api/permissions');
      setPermissions(response.data);
    };
    fetchPermissions();
  }, []);

  // Add permission
  const handleAddPermission = async () => {
    if (newPermission.name && newPermission.description) {
      const response = await axios.post('/api/permissions', newPermission);
      setPermissions([...permissions, response.data]);
      setNewPermission({ name: '', description: '' });
    }
  };

  // Update permission
  const handleUpdatePermission = async (id: number) => {
    if (editingPermission) {
      const response = await axios.put(`/api/permissions/${id}`, editingPermission);
      setPermissions(
        permissions.map((perm) =>
          perm.id === id ? { ...perm, ...response.data } : perm
        )
      );
      setEditingPermission(null);
    }
  };

  // Delete permission
  const handleDeletePermission = async (id: number) => {
    await axios.delete(`/api/permissions/${id}`);
    setPermissions(permissions.filter((perm) => perm.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Manage Permissions</h1>

      {/* Add Permission */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Permission</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Permission Name"
            className="border p-2 rounded w-1/3"
            value={newPermission.name}
            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Permission Description"
            className="border p-2 rounded w-2/3"
            value={newPermission.description}
            onChange={(e) =>
              setNewPermission({ ...newPermission, description: e.target.value })
            }
          />
          <button
            onClick={handleAddPermission}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Permissions List */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Permissions List</h2>
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
            {permissions.map((perm) => (
              <tr key={perm.id}>
                <td className="border p-2">{perm.id}</td>
                <td className="border p-2">
                  {editingPermission?.id === perm.id ? (
                    <input
                      type="text"
                      value={editingPermission.name}
                      onChange={(e) =>
                        setEditingPermission({ ...editingPermission, name: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    perm.name
                  )}
                </td>
                <td className="border p-2">
                  {editingPermission?.id === perm.id ? (
                    <input
                      type="text"
                      value={editingPermission.description}
                      onChange={(e) =>
                        setEditingPermission({
                          ...editingPermission,
                          description: e.target.value,
                        })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    perm.description
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  {editingPermission?.id === perm.id ? (
                    <>
                      <button
                        onClick={() => handleUpdatePermission(perm.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPermission(null)}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingPermission(perm)}
                        className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePermission(perm.id)}
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
