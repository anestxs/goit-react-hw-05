import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGU2YWI1NjdjNzhiNTdkOTFhMzQ0YTNkODAwMWRmNSIsInN1YiI6IjY1ZWMyMGY0NWJjZTllMDE4NjQ2ZWI0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7hgqIMMG9wNj0I2Stipd2jO9CKhybCm-kQti6w6PuH8",
  },
};

export const getTrends = async () => {
  try {
    const response = await axios.get("/trending/movie/day", options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getMovies = async (query) => {
  try {
    const response = await axios.get(`/search/movie`, {
      params: {
        language: "en-US",
        page: 1,
        include_adult: false,
        query,
      },
      ...options,
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, options);
    return response.data.cast;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
