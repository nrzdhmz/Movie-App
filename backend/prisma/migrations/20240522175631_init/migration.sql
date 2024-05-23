-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Watching', 'Finished', 'PlanningToWatch');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchListMovies" (
    "id" SERIAL NOT NULL,
    "watchListId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "WatchListMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieItem" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PlanningToWatch',

    CONSTRAINT "MovieItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_key" ON "Watchlist"("userId");

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchListMovies" ADD CONSTRAINT "WatchListMovies_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchListMovies" ADD CONSTRAINT "WatchListMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "MovieItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
