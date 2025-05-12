import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get paginated list of books' })
  @ApiQuery({ name: 'page', required: true, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: true, description: 'Number of items per page' })
  @Get()
  getBooks(@Query('page') page: number, @Query('limit') limit: number) {
    return this.bookService.getBooks(page, limit);
  }

  @ApiOperation({ summary: 'Get a book by its ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the book' })
  @Get(':id')
  getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(id);
  }
}
