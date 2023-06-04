import axios from 'axios';

const movieDbEndpoint = 'https://api.themoviedb.org/3'

export const searchMovie = async (query) => await axios.get(`${movieDbEndpoint}/search/movie?api_key=${import.meta.env.VITE_DB_API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`);

export const fetchMovies = async (page) => await axios.get(`${movieDbEndpoint}/movie/popular?api_key=${import.meta.env.VITE_DB_API_KEY}&page=${page}`);
