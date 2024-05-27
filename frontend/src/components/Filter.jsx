import React from 'react';

const Filter = ({ onSortChange, onStatusFilterChange }) => {
  return (
    <div className="filter-container">
      <div className='filter'>
        <button className='filterBtn' onClick={() => onStatusFilterChange('All')}>All</button>
        <button className='filterBtn' onClick={() => onStatusFilterChange('Watching')}>Watching</button>
        <button className='filterBtn' onClick={() => onStatusFilterChange('OnHold')}>On-Hold</button>
        <button className='filterBtn' onClick={() => onStatusFilterChange('PlanToWatch')}>Plan to watch</button>
        <button className='filterBtn' onClick={() => onStatusFilterChange('Dropped')}>Dropped</button>
        <button className='filterBtn' onClick={() => onStatusFilterChange('Completed')}>Completed</button>
      </div>
      <select className="filterBy" onChange={e => onSortChange(e.target.value)}>
        <option className='option' value="Default">Default</option>
        <option className='option' value="IMDB">IMDb Rating</option>
        <option className='option' value="Name">Name A-Z</option>
        <option className='option' value="Released Date">Released Date</option>
      </select>
    </div>
  );
};

export default Filter;
