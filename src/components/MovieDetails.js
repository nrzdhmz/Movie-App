import React, { useEffect, useState } from 'react';

const MovieDetails = ({ movie }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const loadMovieDetails = async () => {
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=fc1fef96`);
            const data = await result.json();
            setDetails(data);
        };
        loadMovieDetails();
    }, [movie]);

    return (
        details && (
            <div className="movie-details">
                <div className="movie-poster">
                    <img src={details.Poster !== "N/A" ? details.Poster : "image_not_found.png"} alt="movie poster" />
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{details.Title}</h3>
                    <ul className="movie-misc-info">
                        <li className="year">Year: {details.Year}</li>
                        <li className="rated">Ratings: {details.Rated}</li>
                        <li className="released">Released: {details.Released}</li>
                    </ul>
                    <p className="genre"><b>Genre:</b> {details.Genre}</p>
                    <p className="writer"><b>Writer:</b> {details.Writer}</p>
                    <p className="actors"><b>Actors: </b>{details.Actors}</p>
                    <p className="plot"><b>Plot:</b> {details.Plot}</p>
                    <p className="language"><b>Language:</b> {details.Language}</p>
                    <p className="awards"><b><i className="fas fa-award"></i></b> {details.Awards}</p>
                </div>
            </div>
        )
    );
};

export default MovieDetails;
