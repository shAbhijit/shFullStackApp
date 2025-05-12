import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

interface FiltersProps {
  genres: any[];
  onFilterChange: (filters: { genre: string; author: string; year: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({ genres, onFilterChange }) => {
  const [filters, setFilters] = useState({ genre: '', author: '', year: '' });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name) {
      const updatedFilters = { ...filters, [name]: value as string };
      setFilters(updatedFilters);
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div>
      <FormControl fullWidth style={{ marginBottom: '16px' }}>
        <InputLabel>Genre</InputLabel>
        <Select
          name="genre"
          value={filters.genre}
          onChange={(event) =>
            handleChange({
              target: { name: 'genre', value: event.target.value },
            } as React.ChangeEvent<{ name?: string; value: unknown }>)
          }
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.name}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="author"
        label="Author"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '16px' }}
        value={filters.author}
        onChange={handleChange}
      />
      <TextField
        name="year"
        label="Year"
        variant="outlined"
        fullWidth
        value={filters.year}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filters;
