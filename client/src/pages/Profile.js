import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Stat from '../components/Stat';
import MovieContainer from '../components/MovieContainer';
import Auth from '../utils/auth';

function Profile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // get current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!Auth.isLoggedIn()) {
        console.log('User not logged in');
        navigate('/login');
        return;
      }

      try {
        const response = await Auth.getMe();

        setUserData(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <section className="my-8">
      {loading || !userData ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {/* user stats */}
          <div className="col-span-4 lg:col-span-1">
            <div className="card bg-base-200 shadow-xl">
              <Stat title={'Welcome Back'} value={userData.user.username} />
              <Stat title={'Email'} value={userData.user.email} />
              <Stat
                title={'Total Saved'}
                value={userData.user.watchlist.length}
              />
            </div>
          </div>

          {/* watchlist */}
          <div className="col-span-4 lg:col-span-3">
            {userData.user.watchlist && userData.user.watchlist.length > 0 ? (
              <MovieContainer display={'grid'} data={userData.user.watchlist} />
            ) : (
              <p>Nothing Saved</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
