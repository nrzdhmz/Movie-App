import axios from "axios";
import prisma from "../prismaClient/index.js";
import parseRequest from "../utils/parseRequest.js";

// Get Movie by Id
export const getMovieController = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Check if the database has the requested movie
    const existingMovie = await prisma.movie.findFirst({
      where: {
        imdbId: movieId,
      },
    });

    // If movie does not exist in the database then fetch it from the API and create it in the database
    if (!existingMovie) {
      const { data: movie } = await axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`
      );

      await prisma.movie.create({
        data: { ...parseRequest(movie) },
      });
    }

    // Get the movie from database
    const movie = await prisma.movie.findFirst({
      where: {
        imdbId: movieId,
      },
    });

    return res.status(200).json({ movie });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server errors" });
  }
};

export const filterMoviesController = async (req, res) => {
  const { movieQuery } = req.params;

  const {
    data: { Search: movies },
  } = await axios.get(
    `https://omdbapi.com/?s=${movieQuery}&page=1&apikey=${process.env.OMDB_API_KEY}`
  );

  return res.status(200).json({ movies });
};
