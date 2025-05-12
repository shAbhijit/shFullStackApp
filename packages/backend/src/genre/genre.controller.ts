import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @Get()
  getGenres() {
    return this.genreService.getGenres();
  }
}
