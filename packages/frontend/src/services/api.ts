import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/api';

export const fetchBooks = async (page: number, limit: number) => {
  const response = await axios.get(`${API_BASE_URL}/books`, {
    params: { page, limit },
  });
  console.log('Books response:', response.data);
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${API_BASE_URL}/genres`);
    console.log('Genres response:', response.data);
  return response.data;
};
