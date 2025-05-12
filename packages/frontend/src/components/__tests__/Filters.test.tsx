import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters';

describe('Filters Component', () => {
  const genres = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
  ];
  const mockOnFilterChange = jest.fn();

  it('renders correctly', () => {
    render(<Filters genres={genres} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter is changed', () => {
    render(<Filters genres={genres} onFilterChange={mockOnFilterChange} />);

    fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Fiction' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ genre: 'Fiction', author: '', year: '' });

    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'John Doe' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ genre: '', author: 'John Doe', year: '' });

    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2023' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ genre: '', author: '', year: '2023' });
  });
});
