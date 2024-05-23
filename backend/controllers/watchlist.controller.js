import prisma from "./../prismaClient/index.js";

export const addWatchlistController = async (req, res) => {
  try {
    const { movieId } = req.body;
    const watchlist = await prisma.watchlist.findFirst({
      where: { userId: req.user.id },
    });

    if (!watchlist)
      await prisma.watchlist.create({
        data: {
          user: {
            connect: { id: req.user.id },
          },
          userId: req.user.id,
        },
      });

    await prisma.watchlist.update({
      where: {
        id: watchlist.id,
      },
      data: {
        watchListMovies: {
          create: {
            movieId,
          },
          connect: { id: watchlist.id },
        },
      },
    });
    return res.status(200).json({ message: "Film added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
