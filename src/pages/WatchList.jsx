import React from 'react';
import Logo from '../components/Logo';
import NavigationBar from '../components/NavigationBar';
import data from '../data.json'; // Import the JSON data

const WatchList = () => {
  return (
    <div className="wrapper">
      <div className="container-top">
        <div className="search-container">
          <Logo/>
          <NavigationBar/>
        </div>
      </div>
      <div className="container">
        <div className="watch-list-container">
          {data.map((item, index) => (
            <div key={index} className="movie-item">
              <img src={item.Poster} alt={item.Title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchList;
