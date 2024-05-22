import React, { useState } from 'react';
import Logo from '../components/Logo';
import NavigationBar from '../components/NavigationBar';
import data from '../data.json'; 
import Filter from '../components/Filter';

const WatchList = () => {
  const [showChangeType, setShowChangeType] = useState(Array(data.length).fill(false));

  const toggleChangeType = (index) => {
    const newShowChangeType = [...showChangeType];
    newShowChangeType[index] = !newShowChangeType[index];
    setShowChangeType(newShowChangeType);
  };

  return (
    <div className="wrapper">
      <div className="container-top">
        <div className="search-container">
          <Logo/>
          <NavigationBar/>
        </div>
      </div>
      <div className="container">
        <Filter/>
        <div className="watch-list-container">  
            {data.map((item, index) => (
              <div key={index} className="watch-list-item">
                <div className="movie-item-img">
                  <img src={item.Poster} alt={item.Title} />
                  <button className="movieTypeBtn" onClick={() => toggleChangeType(index)}>
                    <i className='fas fa-ellipsis-v'></i>
                    <div className={`changeType ${showChangeType[index] ? 'visible' : ''}`}>
                      <div className='type'>Watching</div>
                      <div className='type'>On-Hold</div>
                      <div className='type'>Plan to watch</div>
                      <div className='type'>Dropped</div>
                      <div className='type'>Completed</div>
                      <div className='type remove'>Remove</div>
                    </div>
                  </button>
                </div>
                <p>{item.Title}</p>
              </div>  
            ))}
        </div>
      </div>
    </div>
  );
}

export default WatchList;
