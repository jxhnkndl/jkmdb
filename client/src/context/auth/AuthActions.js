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

export const login = async (user) => {
  const data = await axios.post('/api/users/login', {
    data: user,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};
