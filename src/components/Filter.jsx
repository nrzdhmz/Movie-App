import React from 'react';

const Filter = ({ onSortChange }) => {
  return (
    <div className="filter-container">
      <div className='filter'>
        <button className='filterBtn'>All</button>
        <button className='filterBtn'>Watching</button>
        <button className='filterBtn'>On-Hold</button>
        <button className='filterBtn'>Plan to watch</button>
        <button className='filterBtn'>Dropped</button>
        <button className='filterBtn'>Completed</button>
      </div>
      <select className="filterBy" onChange={e => onSortChange(e.target.value)}>
        <option value="Default">Default</option>
        <option value="IMDB">IMDB</option>
        <option value="Name">Name A-Z</option>
        <option value="Released Date">Released Date</option>
      </select>
    </div>
  );
};

export default Filter;
