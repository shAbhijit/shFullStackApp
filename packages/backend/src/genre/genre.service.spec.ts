import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { PrismaService } from '../prisma/prisma.service';

describe('GenreService', () => {
  let service: GenreService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService, PrismaService],
    }).compile();

    service = module.get<GenreService>(GenreService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all genres', async () => {
    const genres = [
      { id: 1, name: 'Fiction' },
      { id: 2, name: 'Non-Fiction' },
    ];
    jest.spyOn(prisma.genre, 'findMany').mockResolvedValueOnce(genres);

    expect(await service.getGenres()).toEqual(genres);
  });
});