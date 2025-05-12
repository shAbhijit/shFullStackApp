import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import { fetchBooks, fetchGenres } from './services/api';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Filters from './components/Filters';
import './App.css';

function App() {
  const [books, setBooks] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<{ id: number; title: string; author: string; genre: string; publishedAt: number; summary: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [booksData, genresData] = await Promise.all([
          fetchBooks(page, 10),
          fetchGenres(),
        ]);
        setBooks((prevBooks) => [...prevBooks, ...booksData]);
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Book Explorer
      </Typography>
      <Filters genres={genres} onFilterChange={() => {}} />
      <BookList books={books} onSelectBook={setSelectedBook} />
      {loading && <CircularProgress />}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadMore}
        disabled={loading}
        style={{ marginTop: '16px' }}
      >
        Load More
      </Button>
      <BookDetails book={selectedBook} />
    </Container>
  );
}

export default App;
