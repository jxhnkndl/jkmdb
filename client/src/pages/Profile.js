import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Stat from '../components/Stat';
import MovieContainer from '../components/MovieContainer';
import EmptyWatchlist from '../components/EmptyWatchlist';
import Auth from '../utils/auth';
import { deleteMovie } from '../context/movie/MovieActions';

function Profile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

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
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setRefetch((prev) => !prev);
    } catch (err) {
      console.table(err);
    }
  };

  return (
    <section className="mt-8 mb-24 flex-grow flex justify-center items-center">
      {loading || !userData ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* watchlist */}
          <div className="col-span-1">
            <p className="text-center text-4xl md:text-5xl ">
              Welcome back{' '}
              <span className=" font-semibold ">{userData.user.username}</span>!
            </p>
          </div>
          <div className="col-span-1">
            {userData.user.watchlist && userData.user.watchlist.length > 0 ? (
              <MovieContainer
                display={'grid'}
                data={userData.user.watchlist}
                handleDelete={handleDelete}
              />
            ) : (
              <EmptyWatchlist username={userData.user.username} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
