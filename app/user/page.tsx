"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  roles: { roleId: number }[];
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', roles: [] });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser.name && newUser.email) {
      try{
       
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', roles: [] }); 
      }
    catch(error){
      console.error(error)
    }
    }
  };

  const handleUpdateUser = async (id: number) => {
    if (editingUser) {
      const response = await axios.put(`/api/users/${id}`, editingUser);
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`/api/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="User Name"
            className="border p-2 rounded w-1/4"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="User Email"
            className="border p-2 rounded w-1/4"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Users List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-2">
                  {editingUser?.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, email: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  {editingUser?.id === user.id ? (
                    <>
                      <button
                        onClick={() => handleUpdateUser(user.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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