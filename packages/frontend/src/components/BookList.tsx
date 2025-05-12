import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface BookListProps {
  books: any[];
  onSelectBook: (book: any) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onSelectBook }) => {
  return (
    <List>
      {books.map((book) => (
        <ListItem key={book.id} onClick={() => onSelectBook(book)} style={{ cursor: 'pointer' }}>
          <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;
