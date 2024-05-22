import React, { useState } from 'react';
import data from '../data.json';
import Filter from './Filter';

const WatchList = () => {
  const [showChangeType, setShowChangeType] = useState(Array(data.length).fill(false));
  const [coverVisible, setCoverVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Default');

  const toggleChangeType = (index) => {
    const newShowChangeType = Array(data.length).fill(false);
    newShowChangeType[index] = !showChangeType[index];
    setShowChangeType(newShowChangeType);
    setCoverVisible(!showChangeType[index]);
  };

  const hideChangeType = () => {
    setShowChangeType(Array(data.length).fill(false));
    setCoverVisible(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const getSortedData = () => {
    let sortedData = [...data];
    if (sortOption === 'Name') {
      sortedData.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortOption === 'Released Date') {
      sortedData.sort((a, b) => {
        const yearA = parseInt(a.Year.substring(0, 4), 10);
        const yearB = parseInt(b.Year.substring(0, 4), 10);
        return yearA - yearB;
      });
    } else if (sortOption === 'IMDB') {
      sortedData.sort((a, b) => b.imdbRating - a.imdbRating);
    }
    return sortedData;
  };
  

  const sortedData = getSortedData();

  return (
    <div className="container">
      <div className="cover" style={{ display: coverVisible ? 'block' : 'none' }} onClick={hideChangeType}></div>
      <Filter onSortChange={handleSortChange} />
      <div className="watch-list-container">
        {sortedData.map((item, index) => (
          <div key={index} className="watch-list-item">
            <div className="movie-item-img">
              <img src={item.Poster} alt={item.Title} />
              {/* <div className='movie-info' >
                <p>{item.Title}</p>
                <p>{item.imdbRating}</p>
                <p>{item.Plot}</p>
                <p>{item.Language}</p>
                <p>{item.Released}</p>
                <p>{item.Genre}</p>
              </div> */}
              <button className="movieTypeBtn" onClick={() => toggleChangeType(index)}>
                <i className="fas fa-ellipsis-v"></i>
                <div className={`changeType ${showChangeType[index] ? 'visible' : ''}`}>
                  <div className="type">Watching</div>
                  <div className="type">On-Hold</div>
                  <div className="type">Plan to watch</div>
                  <div className="type">Dropped</div>
                  <div className="type">Completed</div>
                  <div className="type remove">Remove</div>
                </div>
              </button>
            </div>
            <p>{item.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const dataLength = data.length;

export { WatchList, dataLength };
