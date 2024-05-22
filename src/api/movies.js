import axios from 'axios';

/**
 * Searches for a movie using the provided query.
 *
 * @param {string} query - The search query.
 * @param {number} page - The page number of the results to fetch.
 * @returns {Promise<Object>} A promise that resolves to the response object containing the search results.
 */
export const searchMovie = async (query, page) => await axios.get('/api/3/search/movie', {
    params: {
      api_key: import.meta.env.VITE_DB_API_KEY,
      query: query,
      include_adult: false,
      language: 'en-US',
      page: page,
    },
  })

/**
 * Fetches popular movies from the API.
 *
 * @param {number} page - The page number of the results to fetch.
 * @returns {Promise<Object>} A promise that resolves to the response object containing the popular movies.
 */
export const fetchMovies = async (page) => await axios.get(`/api/3/movie/popular?api_key=${import.meta.env.VITE_DB_API_KEY}&page=${page}`);
