import axios from "axios";
import prisma from "./../prismaClient/index.js";
import parseRequest from "../utils/parseRequest.js";

// ADD MOVIE TO WATCHLIST
export const addWatchlistController = async (req, res) => {
  try {
    const { movieId } = req.body;
    const watchlist = await prisma.watchlist.findFirst({
      where: { userId: req.user.id },
    });

    const existingMovieInWatchlist = await prisma.watchlist.findFirst({
      where: {
        movieItems: {
          some: {
            movieId,
          },
        },
      },
    });
    if (existingMovieInWatchlist)
      return res
        .status(409)
        .json({ message: `Watchlist Already Contains Movie: ID ${movieId}` });

    const existingMovie = await prisma.movie.findFirst({
      where: {
        imdbId: movieId,
      },
    });

    if (!existingMovie) {
      try {
        const { data: movie } = await axios.get(
          `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`
        );
        if (movie?.Response === "False") {
          return res.status(404).json({ error: "Invalid Movie ID" });
        }

        await prisma.movie.create({
          data: {
            ...parseRequest(movie),
          },
        });
      } catch (err) {
        console.log(err);
        return res.status(404).json({ error: "Error fetching the movie" });
      }
    }

    await prisma.watchlist.update({
      where: {
        id: watchlist.id,
      },
      data: {
        movieItems: {
          create: {
            movieId,
          },
        },
      },
    });
    return res.status(200).json({ message: "Film added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET MOVIES IN THE WATCHLIST
export const getWatchlistController = async (req, res) => {
  try {
    const { userId } = req.params;

    const movieItems = await prisma.watchlist.findFirst({
      where: { userId },
      select: {
        movieItems: {
          select: {
            movie: true,
            status: true,
          },
        },
      },
    });

    res.status(200).json({ movies: movieItems });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE MOVIE STATUS
export const updateMovieStatusController = async (req, res) => {
  try {
    const { movieId, status } = req.body;
    const { id: userId } = req.user;

    const watchlist = await prisma.watchlist.findUnique({
      where: { userId: userId },
      include: { movieItems: true },
    });

    if (!watchlist) {
      throw new Error("Watchlist not found for the user");
    }

    const movieItem = watchlist.movieItems.find(
      item => item.movieId === movieId
    );

    if (!movieItem) {
      throw new Error("MovieItem not found in the user's watchlist");
    }

    await prisma.movieItem.update({
      where: { id: movieItem.id },
      data: { status: status },
    });

    return res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// REMOVE MOVIE
export const removeMovieController = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { id: userId } = req.user;
    const watchlist = await prisma.watchlist.findFirst({
      where: {
        userId,
      },
      include: {
        movieItems: true,
      },
    });

    const movieItem = watchlist.movieItems.find(m => m.movieId === movieId);

    await prisma.movieItem.delete({
      where: {
        id: movieItem.id,
      },
    });

    return res.status(200).json({ message: "Successfully removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
