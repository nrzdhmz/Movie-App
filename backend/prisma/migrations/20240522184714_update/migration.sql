/*
  Warnings:

  - You are about to drop the `WatchListMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchListMovies" DROP CONSTRAINT "WatchListMovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "WatchListMovies" DROP CONSTRAINT "WatchListMovies_watchListId_fkey";

-- AlterTable
ALTER TABLE "MovieItem" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "WatchListMovies";

-- CreateTable
CREATE TABLE "_UserWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserWatchlist_AB_unique" ON "_UserWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_UserWatchlist_B_index" ON "_UserWatchlist"("B");

-- AddForeignKey
ALTER TABLE "_UserWatchlist" ADD CONSTRAINT "_UserWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "MovieItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWatchlist" ADD CONSTRAINT "_UserWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
