import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [GenreService, PrismaService],
  controllers: [GenreController],
})
export class GenreModule {}
