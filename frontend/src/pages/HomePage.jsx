import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';
import NavigationBar from '../components/NavigationBar';
import SearchList from '../components/SearchList';
import MovieDetails from '../components/MovieDetails';
import Logo from '../components/Logo';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
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
            <div className="container-top">
                <div className="search-container">
                    <Logo />
                    <div className="search-element">
                        <SearchBox onMoviesLoaded={handleMovies} />
                        <SearchList
                            movies={movies}
                            onMovieSelect={handleMovieSelection}
                            show={showSearchList}
                        />
                    </div>
                    <NavigationBar />
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

export default HomePage;
