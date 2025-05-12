-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publishedAt" INTEGER NOT NULL,
    "coverImage" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
