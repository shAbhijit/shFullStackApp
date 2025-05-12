import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookService', () => {
  let service: BookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, PrismaService],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    const books = [{
      id: 1,
      title: 'Test Book',
      genreId: 1,
      genre: 'Fiction',
      author: 'Author Name',
      summary: 'A test book summary',
      publishedAt: 2023,
      coverImage: null
    }];
    jest.spyOn(prisma.book, 'findMany').mockResolvedValueOnce(books);

    expect(await service.getBooks(1, 10)).toEqual(books);
  });

  it('should return a book by id', async () => {
    const book = {
      id: 1,
      title: 'Test Book',
      genreId: 1,
      genre: 'Fiction',
      author: 'Author Name',
      summary: 'A test book summary',
      publishedAt: 2023,
      coverImage: null
    };
    jest.spyOn(prisma.book, 'findUnique').mockResolvedValueOnce(book);
    expect(await service.getBookById(1)).toEqual(book);
  });
});
