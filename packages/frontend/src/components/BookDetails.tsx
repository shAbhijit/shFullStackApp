import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface BookDetailsProps {
  book: any;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  if (!book) return <Typography variant="h6">Select a book to see details</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography color="text.secondary">
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography color="text.secondary">
          <strong>Genre:</strong> {book.genre}
        </Typography>
        <Typography color="text.secondary">
          <strong>Published Year:</strong> {book.publishedAt}
        </Typography>
        <Typography variant="body2">
          <strong>Summary:</strong> {book.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookDetails;
