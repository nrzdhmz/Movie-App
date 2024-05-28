import React, { useState } from 'react';
import SearchBox from '../components/home/SearchBox';
import NavigationBar from '../components/header/NavigationBar';
import SearchList from '../components/home/SearchList';
import MovieDetails from '../components/home/MovieDetails';
import Logo from '../components/header/Logo';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showSearchList, setShowSearchList] = useState(false);

    const handleMovies = (movies) => {
        setMovies(movies);
        setShowSearchList(movies.length > 0);
    };

    const handleMovieSelection = (movie) => {
        setSelectedMovie(movie);
        setShowSearchList(false);
    };

    return (
        <div className="wrapper">
            <header className="container-top">
                <div className="search-container">
                    <Logo />
                    <div className="search-element">
                        <SearchBox onMoviesLoaded={handleMovies} placeholder={'Movie Title'} />
                        <SearchList
                            movies={movies}
                            onMovieSelect={handleMovieSelection}
                            show={showSearchList}
                        />
                    </div>
                    <NavigationBar />
                </div>
            </header>
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
