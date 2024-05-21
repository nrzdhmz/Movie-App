import React, { useState } from 'react';

const SearchBox = ({ onMoviesLoaded }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const findMovies = async (searchTerm) => {
        if (searchTerm.length > 0) {
            const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
            const res = await fetch(URL);
            const data = await res.json();
            if (data.Response === "True") {
                onMoviesLoaded(data.Search);
            } else {
                onMoviesLoaded([]);
            }
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        findMovies(value);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search Movie Title ..."
            value={searchTerm}
            onChange={handleChange}
        />
    );
};

export default SearchBox;
