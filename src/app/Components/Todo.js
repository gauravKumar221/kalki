"use client"
import { useState } from "react";

export default function Todo() {
  // Initial user data
  const [users, setUsers] = useState([]); // Initialize as empty array
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" }); // State for new user form
  const [editingUser, setEditingUser] = useState(null); // State for editing user
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle user edit
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user }); // Populate form with user data
  };

  // Save or update user
  const handleSaveUser = () => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? newUser : user
      );
      setUsers(updatedUsers);
      setEditingUser(null); // Reset editing mode
    } else {
      const newUserWithId = { ...newUser, id: Date.now() }; // Generate a unique id for new user
      setUsers([...users, newUserWithId]);
    }
    setNewUser({ name: "", email: "", role: "User" }); // Clear form
  };

  // Handle user delete
  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  // Handle search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">User Listing</h1>

      {/* Search and Add User */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => setEditingUser(null)} // Reset to show the form for adding new user
        >
          Add New User
        </button>
      </div>

      {/* Add or Edit User Form */}
      <div className="mb-6">
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full md:w-1/3 mb-4 md:mb-0 px-4 py-2 rounded-md border border-gray-300"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full md:w-1/3 mb-4 md:mb-0 px-4 py-2 rounded-md border border-gray-300"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="w-full md:w-1/3 mb-4 md:mb-0 px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          onClick={handleSaveUser}
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center gap-2">
                      <button
                        className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-sm text-gray-700">Showing {filteredUsers.length} of {filteredUsers.length} entries</span>
        </div>
      </div>
    </div>
  );
}
