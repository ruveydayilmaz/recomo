import axios from 'axios';

export const searchMovie = async (query) => await axios.get('/api/3/search/movie', {
    params: {
      api_key: import.meta.env.VITE_DB_API_KEY,
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  })

export const fetchMovies = async (page) => await axios.get(`/api/3/movie/popular?api_key=${import.meta.env.VITE_DB_API_KEY}&page=${page}`);
