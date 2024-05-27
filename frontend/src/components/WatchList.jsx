import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [showChangeType, setShowChangeType] = useState([]);
  const [coverVisible, setCoverVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Default');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/watchlist', { withCredentials: true });
        setMovies(response.data.movies.movieItems);
        setShowChangeType(Array(response.data.movies.movieItems.length).fill(false));
      } catch (error) {
        console.error('Error fetching movies:', error.response || error.message);
      }
    };

    fetchMovies();
  }, []);

  const toggleChangeType = async (index, status) => {
    try {
      await axios.patch(
        'http://localhost:5000/api/watchlist',
        {
          movieId: movies[index].movie.imdbId,
          status: status
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const response = await axios.get('http://localhost:5000/api/watchlist', { withCredentials: true });
      setMovies(response.data.movies.movieItems);

      console.log(response.data.movies.movieItems);

      setShowChangeType(Array(movies.length).fill(false));
      setCoverVisible(false);
    } catch (error) {
      console.error('Error updating status:', error.response || error.message);
    }
  };

  const handleToggleChangeType = (index) => {
    const newShowChangeType = showChangeType.map((value, i) => (i === index ? !value : false));
    setShowChangeType(newShowChangeType);
    setCoverVisible(newShowChangeType.some(value => value));
  };

  const hideChangeType = () => {
    setShowChangeType(Array(movies.length).fill(false));
    setCoverVisible(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const getFilteredData = () => {
    if (statusFilter === 'All') return movies;
    return movies.filter(movie => movie.status === statusFilter);
  };

  const getSortedData = (filteredData) => {
    let sortedData = [...filteredData];
    if (sortOption === 'Name') {
      sortedData.sort((a, b) => a.movie.title.localeCompare(b.movie.title));
    } else if (sortOption === 'Released Date') {
      sortedData.sort((a, b) => {
        const dateA = new Date(b.movie.released);
        const dateB = new Date(a.movie.released);
        return dateA - dateB;
      });
    } else if (sortOption === 'IMDB') {
      sortedData.sort((a, b) => b.movie.imdbRating - a.movie.imdbRating);
    }
    return sortedData;
  };

  const filteredData = getFilteredData();
  const sortedData = filteredData.length > 0 ? getSortedData(filteredData) : [];



  const handleRemoveMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5000/api/watchlist`,
      {
        movieId: movieId,
        status: 'remove'
      }, 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const response = await axios.get('http://localhost:5000/api/watchlist', { withCredentials: true });
      setMovies(response.data.movies.movieItems);
    } catch (error) {
      console.error('Error removing movie:');
    }
  };
  

  return (
    <>
      <div className="cover" style={{ display: coverVisible ? 'block' : 'none' }} onClick={hideChangeType}></div>
      <div className="container">
        <Filter onSortChange={handleSortChange} onStatusFilterChange={handleStatusFilterChange} />
        <div className="watch-list-container">
          {sortedData.map((item, index) => (
            <div key={index} className="watch-list-item">
              <button className="movieTypeBtn" onClick={() => handleToggleChangeType(index)}>
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <div className='changeType' style={{ display: showChangeType[index] ? 'block' : 'none' }}>
                <div className="type" onClick={() => toggleChangeType(index, 'Watching')}>Watching</div>
                <div className="type" onClick={() => toggleChangeType(index, 'OnHold')}>On-Hold</div>
                <div className="type" onClick={() => toggleChangeType(index, 'PlanToWatch')}>Plan to watch</div>
                <div className="type" onClick={() => toggleChangeType(index, 'Dropped')}>Dropped</div>
                <div className="type" onClick={() => toggleChangeType(index, 'Completed')}>Completed</div>
                <div className="type remove" onClick={() => handleRemoveMovie(item.movie.imdbId)}>Remove</div>
              </div>
              <div className="movie-item-img">
                <img src={item.movie.poster} alt={item.movie.title} />
                <p className='imdb-img'><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</p>
                <div className='movie-info'>
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