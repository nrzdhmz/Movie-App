import axios from "axios";
import prisma from "./../prismaClient/index.js";

// ADD MOVIE TO WATCHLIST
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
        },
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
            actors: movie.Actors,
            awards: movie.Awards,
            country: movie.Country,
            genre: movie.Genre,
            imdbId: movie.imdbID,
            imdbRating: Number(movie.imdbRating),
            language: movie.Language,
            plot: movie.Plot,
            poster: movie.Poster,
            released: new Date(movie.Released),
            runtime: Number(movie.Runtime.split(" ")[0]),
            title: movie.Title,
            type: movie.Type,
            year: movie.Year,
          },
        });
      } catch (err) {
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
