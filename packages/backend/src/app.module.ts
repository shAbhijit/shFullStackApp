import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
    BookModule,
    GenreModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
