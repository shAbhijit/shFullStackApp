import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getBooks(page: number, limit: number) {
    const parsedLimit = Number(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      throw new Error('Invalid limit parameter');
    }

    const skip = (page - 1) * parsedLimit;
    return this.prisma.book.findMany({
      skip,
      take: parsedLimit,
    });
  }

  async getBookById(id: number) {
    return this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
  }
}
