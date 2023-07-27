import axios from 'axios';

const TOKEN = localStorage.getItem('token') || null;

export const registerUser = async (newUser) => {
  const data = await axios.post('/api/users', {
    data: newUser,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};
