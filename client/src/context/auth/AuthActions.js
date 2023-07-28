import axios from 'axios';

export const getMe = async () => {
  let token = localStorage.getItem('token') || null;

  if (!token) {
    console.log('User not logged in');
    return;
  }

  try {
    const response = await axios.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      token,
      user: response.data.data,
    };
  } catch (err) {
    console.log(err);
  }
};

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
