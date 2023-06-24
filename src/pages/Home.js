import React, { useState, useEffect } from 'react';
import SearchResults from '../components/SearchResults';
import axios from 'axios';

const TOKEN = process.env.REACT_APP_API_TOKEN;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

function Home() {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const showData = await tmdb.get(
        '/trending/tv/day?language=en-US&pages=5'
      );
      const movieData = await tmdb.get(
        '/trending/movie/day?language=en-US&pages=5'
      );

      setShows(showData.data.results);
      setMovies(movieData.data.results);
    };

    // fetchTrending();
  }, []);

  return (
    <div>
      {shows.length >= 0 && movies.length >= 0 && (
        <section>
          <div className='my-10'>
            <p className="text-4xl mb-4">Trending TV</p>
            <SearchResults />
          </div>
          <div className='my-10'>
            <p className="text-4xl mb-4">Trending Movies</p>
            <SearchResults />
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
