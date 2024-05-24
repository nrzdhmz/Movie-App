import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = ({ onMoviesLoaded }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const findMovies = async (searchTerm) => {
        if (searchTerm.length > 0) {
            const URL = `http://localhost:5000/api/movies/${searchTerm}`;
            try {
                const res = await axios.get(URL);
                if (res.data.Response === "True") {
                    onMoviesLoaded(res.data.Search);
                } else {
                    onMoviesLoaded([]);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                onMoviesLoaded([]);
            }
        } else {
            onMoviesLoaded([]);
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
