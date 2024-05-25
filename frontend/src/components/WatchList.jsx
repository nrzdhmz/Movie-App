import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [showChangeType, setShowChangeType] = useState([]);
  const [coverVisible, setCoverVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/watchlist/get', { withCredentials: true });
        setMovies(response.data.movies.movieItems);
        setShowChangeType(Array(response.data.movies.movieItems.length).fill(false));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const toggleChangeType = (index) => {
    const newShowChangeType = Array(movies.length).fill(false);
    newShowChangeType[index] = !showChangeType[index];
    setCoverVisible(!showChangeType[index]);
    setShowChangeType(newShowChangeType);
  };

  const hideChangeType = () => {
    setShowChangeType(Array(movies.length).fill(false));
    setCoverVisible(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const getSortedData = () => {
    let sortedData = [...movies];
    if (sortOption === 'Name') {
      sortedData.sort((a, b) => a.movie.title.localeCompare(b.movie.title));
    } else if (sortOption === 'Released Date') {
      sortedData.sort((a, b) => {
        const yearA = parseInt(a.movie.Year.substring(0, 4), 10);
        const yearB = parseInt(b.movie.Year.substring(0, 4), 10);
        return yearA - yearB;
      });
    } else if (sortOption === 'IMDB') {
      sortedData.sort((a, b) => b.movie.imdbRating - a.movie.imdbRating);
    }
    return sortedData;
  };

  const sortedData = movies.length > 0 ? getSortedData() : [];

  return (
    <>
      <div className="cover" style={{ display: coverVisible ? 'block' : 'none' }} onClick={hideChangeType}></div>
      <div className="container">
        <Filter onSortChange={handleSortChange} />
        <div className="watch-list-container">
          {sortedData.map((item, index) => (
            <div key={index} className="watch-list-item">
              <button className="movieTypeBtn" onClick={() => toggleChangeType(index)}>
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <div className='changeType' style={{ display: showChangeType[index] ? 'block' : 'none'}}>
                <div className="type">Watching</div>
                <div className="type">On-Hold</div>
                <div className="type">Plan to watch</div>
                <div className="type">Dropped</div>
                <div className="type">Completed</div>
                <div className="type remove">Remove</div>
              </div>
              <div className="movie-item-img">
                <img src={item.movie.poster} alt={item.movie.title} />
                <p className='imdb-img'><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</p>
                <div className='movie-info' > 
                  <div className='info-text'><div className="lighter movie-info-title">{item.movie.title}</div></div>
                  <div className='info-text'><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</div>
                  <div className='info-text'>{item.movie.plot}</div>
                  <div className='info-text'><div className="lighter">Language:</div>{item.movie.language}</div>
                  <div className='info-text'><div className="lighter">Aired:</div>{item.movie.released}</div>
                  <div className='info-text'><div className="lighter">Genres:</div>{item.movie.genre}</div>
                </div>
              </div>
              <p>{item.movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchList;
