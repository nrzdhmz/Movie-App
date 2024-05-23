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
    setCoverVisible(!showChangeType[index]);
    setShowChangeType(newShowChangeType);
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
    <>
      <div className="cover" style={{ display: coverVisible ? 'block' : 'none' }} onClick={hideChangeType}></div>
      <div className="container">
      <Filter onSortChange={handleSortChange} />
      <div className="watch-list-container">
        {sortedData.map((item, index) => (
          <div key={index} className="watch-list-item">
            <button className="movieTypeBtn" onClick={() => toggleChangeType(index)}>
              <i className="fas fa-ellipsis-v"></i>
              <div className='changeType' style={{ display: showChangeType[index] ? 'block' : 'none'}}>
                <div className="type">Watching</div>
                <div className="type">On-Hold</div>
                <div className="type">Plan to watch</div>
                <div className="type">Dropped</div>
                <div className="type">Completed</div>
                <div className="type remove">Remove</div>
              </div>
            </button>
            <div className="movie-item-img">
              <img src={item.Poster} alt={item.Title} />
              <p className='imdb-img'><i className="fa-solid fa-star"></i>{item.imdbRating}</p>
              <div className='movie-info' >
                <div className='info-text'><div className="lighter movie-info-title">{item.Title}</div></div>
                <div className='info-text'><i className="fa-solid fa-star"></i>{item.imdbRating}</div>
                <div className='info-text'>{item.Plot}</div>
                <div className='info-text'><div className="lighter">Language:</div>{item.Language}</div>
                <div className='info-text'><div className="lighter">Aired:</div>{item.Released}</div>
                <div className='info-text'><div className="lighter">Genres:</div>{item.Genre}</div>
              </div>
            </div>
            <p>{item.Title}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

const dataLength = data.length;

export { WatchList, dataLength };
