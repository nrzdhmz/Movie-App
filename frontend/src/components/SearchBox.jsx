import React, { useState } from "react";
import axios from "axios";

const SearchBox = ({ onMoviesLoaded }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const findMovies = async searchTerm => {
    if (searchTerm.length > 0) {
      const URL = `http://localhost:5000/api/movies/${searchTerm}`;
      try {
        const res = await axios.get(URL, { withCredentials: true });
        console.log("API Response:", res.data);
        if (res.data.movies) {
          onMoviesLoaded(res.data.movies);
        } else {
          onMoviesLoaded([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        onMoviesLoaded([]);
      }
    } else {
      onMoviesLoaded([]);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("Search Term:", value);
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
