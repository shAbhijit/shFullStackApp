import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from '../BookList';

describe('BookList Component', () => {
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ];
  const mockOnSelectBook = jest.fn();

  it('renders a list of books', () => {
    render(<BookList books={books} onSelectBook={mockOnSelectBook} />);

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
  });

  it('calls onSelectBook when a book is clicked', () => {
    render(<BookList books={books} onSelectBook={mockOnSelectBook} />);

    fireEvent.click(screen.getByText('Book 1'));
    expect(mockOnSelectBook).toHaveBeenCalledWith(books[0]);

    fireEvent.click(screen.getByText('Book 2'));
    expect(mockOnSelectBook).toHaveBeenCalledWith(books[1]);
  });

  it('ensures ListItem is clickable', () => {
    render(<BookList books={books} onSelectBook={mockOnSelectBook} />);

    const listItem = screen.getByText('Book 1').closest('li');
    expect(listItem).toHaveStyle('cursor: pointer');
  });
});
