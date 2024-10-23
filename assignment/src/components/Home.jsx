import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, deleteUser } from '../redux/userSlice';
import axios from 'axios';

const Home = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

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
  }, [dispatch]);

  useEffect(() => {
    console.log('Current users in Redux store:', users);
  }, [users]); // Logs whenever users array changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      dispatch(deleteUser(id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.email}>
            {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
