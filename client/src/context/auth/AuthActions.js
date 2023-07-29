import axios from 'axios';
import decode from 'jwt-decode';

export const isTokenValid = (token) => {
  try {
    const decodedToken = decode(token);

    // compare expiration with current time in seconds
    const tokenExpiration = decodedToken.exp;
    const currentTimestamp = Date.now() / 1000;

    if (tokenExpiration > currentTimestamp) {
      console.log('TOKEN VALID');
      return true;
    } else {
      console.log('TOKEN EXPIRED');
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkToken = () => {
  const token = localStorage.getItem('token') || null;
  
  if (token && isTokenValid(token)) {
    return true;
  } else {
    return false;
  }
}

export const getMe = async () => {
  let token = checkToken();

  if (!token) {
    console.log('User not logged in');
    return false;
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
