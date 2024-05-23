import React from 'react';

const SearchList = ({ movies, onMovieSelect, show }) => {
    return (
        <div className={`search-list ${show ? '' : 'hide-search-list'}`} id="search-list">
            {movies.map(movie => (
                <div key={movie.imdbID} className="search-list-item" onClick={() => onMovieSelect(movie)}>
                    <div className="search-item-thumbnail">
                        <img src={movie.Poster !== "N/A" ? movie.Poster : "../img/image_not_found.png"} alt="movie poster" />
                    </div>
                    <div className="search-item-info">
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchList;
