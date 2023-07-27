import axios from 'axios';

const TOKEN = process.env.REACT_APP_API_TOKEN;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// init axios instance for interaction with tmdb api
const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export const fetchTrending = async (endpoint) => {
  const totalPages = 5;
  let allResults = [];

  // request 5 pages worth of trending tv results (total 100 titles)
  // combine all results into a single array
  for (let page = 1; page <= totalPages; page++) {
    const response = await tmdb.get(`${endpoint}&page=${page}`);

    allResults = [...allResults, ...response.data.results];
  }

  return allResults;
};

export const searchByTitle = async (endpoint) => {
  const response = await tmdb.get(endpoint);

  return response.data.results || response.data;
};
