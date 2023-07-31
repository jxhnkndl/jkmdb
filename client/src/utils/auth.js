import decode from 'jwt-decode';
import axios from 'axios';

class AuthService {
  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
  
    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      return false;
    }
  }

  isTokenValid(token) {
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
  }

  async getMe() {
    const token = this.getToken();
    const loggedIn = this.isLoggedIn();

    try {
      if (!loggedIn) {
        console.log('User must be logged in')
        return;
      }

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
  }

  async registerUser(userData) {
    const response = await axios.post('/api/users', {
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('token', response.data.token);
  
    return response;
  }

  async login(userData) {
    const response = await axios.post('/api/users/login', {
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('token', response.data.token);
  
    return response;
  }

  logout() {
    return localStorage.removeItem('token');
  }
}

const Auth = new AuthService();

export default Auth;
