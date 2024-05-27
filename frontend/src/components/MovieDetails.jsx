import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = ({ movie }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const loadMovieDetails = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/movies/get/${movie.imdbID}` ,{withCredentials : true});
                setDetails(result.data.movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        loadMovieDetails();
    }, [movie]);

    const addToWatchlist = async () => {
        try {
            await axios.post('http://localhost:5000/api/watchlist',{movieId: movie.imdbID}, {withCredentials : true});
            alert('Movie added');
        } catch (error) {
            console.error('Error adding movie to watchlist:', error);
        }
    };

    return (
        details && (
            <div className="movie-details">
                <div className="movie-poster">
                    <img src={details.poster !== "N/A" ? details.poster : "./assets/img/image_not_found.png"} alt="movie poster" />
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{details.title}</h3>
                    <ul className="movie-misc-info">
                        <li className="year">Year: {details.year}</li>
                        <li className="rated">Ratings: {details.rated}</li>
                        <li className="released">Released: {details.released}</li>
                    </ul>
                    <p className="genre"><b>Genre:</b> {details.genre}</p>
                    <p className="writer"><b>Writer:</b> {details.writer}</p>
                    <p className="actors"><b>Actors: </b>{details.actors}</p>
                    <p className="plot"><b>Plot:</b> {details.plot}</p>
                    <p className="language"><b>Language:</b> {details.language}</p>
                    <p className="awards"><b><i className="fas fa-award"></i></b> {details.awards}</p>
                    <button className='addToList' onClick={addToWatchlist}><i className="fa-solid fa-plus"></i> Add to Watchlist</button>
                </div>
            </div>
        )
    );
};

export default MovieDetails;