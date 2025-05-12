import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Biography'];

  // Seed genres
  for (const genre of genres) {
    await prisma.genre.create({
      data: { name: genre },
    });
  }

  // Seed books
  for (let i = 1; i <= 1000; i++) {
    await prisma.book.create({
      data: {
        title: `Book Title ${i}`,
        author: `Author ${i}`,
        genre: genres[i % genres.length],
        summary: `This is the summary of Book Title ${i}.`,
        publishedAt: 2000 + (i % 20),
        coverImage: null,
      },
    });
  }

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
