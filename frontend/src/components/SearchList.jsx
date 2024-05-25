import React from 'react';

const SearchList = ({ movies, onMovieSelect, show }) => {
    console.log('Movies:', movies);
    return (
        <div className={`search-list ${show ? '' : 'hide-search-list'}`} id="search-list">
            {movies.map(movie => (
                <div key={movie.imdbId} className="search-list-item" onClick={() => onMovieSelect(movie)}>
                    <div className="search-item-thumbnail">
                        <img src={movie.poster !== "N/A" ? movie.poster : "./assets/img/image_not_found.png"} alt="movie poster" />
                    </div>
                    <div className="search-item-info">
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default SearchList;
