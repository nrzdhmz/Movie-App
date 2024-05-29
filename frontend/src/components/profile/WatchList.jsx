import React from 'react';

const WatchList = ({ watchlist }) => (
  <div className="watch-list-container">
    {watchlist.movieItems.map((item, index) => (
      <div key={index} className="watch-list-item">
        <div className="movie-item-img">
          <img src={item.movie.poster} alt={item.movie.title} />
          <p className="imdb-img"><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</p>
          <div className="movie-info">
            <div className="info-text">
              <div className="lighter movie-info-title">{item.movie.title}</div>
            </div>
            <div className="info-text"><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</div>
            <div className="info-text">{item.movie.plot}</div>
            <div className="info-text"><div className="lighter">Language:</div>{item.movie.language}</div>
            <div className="info-text"><div className="lighter">Aired:</div>{item.movie.released}</div>
            <div className="info-text"><div className="lighter">Genres:</div>{item.movie.genre}</div>
          </div>
        </div>
        <p>{item.movie.title}</p>
      </div>
    ))}
  </div>
);

export default WatchList;
