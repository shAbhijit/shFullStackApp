import axios from 'axios';
import { fetchBooks, fetchGenres } from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  it('fetches books successfully', async () => {
    const books = [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: books });

    const result = await fetchBooks(1, 10);
    expect(result).toEqual(books);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/api/books', {
      params: { page: 1, limit: 10 },
    });
  });

  it('fetches genres successfully', async () => {
    const genres = [
      { id: 1, name: 'Fiction' },
      { id: 2, name: 'Non-Fiction' },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: genres });

    const result = await fetchGenres();
    expect(result).toEqual(genres);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/api/genres');
  });
});
