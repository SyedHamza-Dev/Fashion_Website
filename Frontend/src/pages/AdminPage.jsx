import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import your modal component

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({ username: user.username, email: user.email }); // Populate edit form
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/admin/users/delete/${selectedUser._id}`);
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  const handleEditConfirm = async () => {
    try {
      const response = await axios.put(`/api/admin/users/update/${selectedUser._id}`, editFormData);
      setUsers(users.map(user => (user._id === selectedUser._id ? response.data : user)));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to edit user.');
    }
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({ ...prevData, [name]: value })); // Update form data
  };

  return (
    <div className="container mx-auto my-5 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 mr-2"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                  onClick={() => handleDeleteClick(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedUser ? selectedUser.username : ''}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onConfirm={handleEditConfirm}
        title="Edit User"
        message={
          <div className="flex flex-col">
            <label className="mb-2">
              Username:
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1"
              />
            </label>
            <label className="mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleInputChange}
                className="border rounded p-2 mt-1"
              />
            </label>
          </div>
        }
        confirmText="Update"
        cancelText="Cancel"
      />
    </div>
  );
};

export default AdminPage;
