const parseRequest = movieData => {
  return {
    actors: movieData.Actors,
    awards: movieData.Awards,
    country: movieData.Country,
    genre: movieData.Genre,
    imdbId: movieData.imdbID,
    imdbRating: Number(movieData.imdbRating),
    language: movieData.Language,
    plot: movieData.Plot,
    poster: movieData.Poster,
    released: new Date(movieData.Released),
    runtime: Number(movieData.Runtime.split(" ")[0]),
    title: movieData.Title,
    type: movieData.Type,
    year: movieData.Year,
  };
};

export default parseRequest;
