import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, deleteUser, updateUser } from '../redux/userSlice'; 
import axios from 'axios';
import './Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Home = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null); 
  const [formData, setFormData] = useState({ email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, [dispatch,users]);

  const handleDelete = async (id) => {
    try {
      console.log('Deleting user with id:', id);
      await axios.delete(`/api/users/${id}`);
      dispatch(deleteUser(id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    if (!editingUser) return;

    try {
      const response = await axios.put(`/api/users/${editingUser._id}`, formData);
      dispatch(updateUser(response.data)); 
      setEditingUser(null); 
      setFormData({ email: '' });
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); 
    setFormData({ email: user.email }); 
  };

  return (
    <div className="user-list-container">
      <h2 className="text-center mb-4">User List</h2>

      {editingUser && ( 
        <form onSubmit={handleUpdate} className="mb-4">
          <h3>Edit User</h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary ml-2">Update</button>
          <button type="button" onClick={() => setEditingUser(null)} className="btn btn-secondary ml-2">Cancel</button>
        </form>
      )}

      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            <span>{user.email}</span>
            <button
              className="edit-button btn btn-info btn-sm mr-2"
              onClick={() => handleEdit(user)} 
            >
              Edit
            </button>

            <button
              className="delete-button btn btn-danger btn-sm"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
