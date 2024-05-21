import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import SearchList from './components/SearchList';
import MovieDetails from './components/MovieDetails';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showSearchList, setShowSearchList] = useState(false);

    const handleMovies = (movies) => {
        setMovies(movies);
        setShowSearchList(true);
    };

    const handleMovieSelection = (movie) => {
        setSelectedMovie(movie);
        setShowSearchList(false);
    };

    return (
        <div className="wrapper">
            <div className="logo">
                <div className="container">
                    <p>Codex<span>claim</span></p>
                </div>
            </div>
            <div className="search-container">
                <div className="search-element">
                    <h3>Search Movie:</h3>
                    <SearchBox onMoviesLoaded={handleMovies} />
                    <SearchList
                        movies={movies}
                        onMovieSelect={handleMovieSelection}
                        show={showSearchList}
                    />
                </div>
            </div>
            <div className="container">
                <div className="result-container">
                    <div className="result-grid">
                        {selectedMovie && <MovieDetails movie={selectedMovie} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
