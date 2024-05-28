import React, { useState } from 'react';

const Filter = ({ onSortChange, onStatusFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleStatusFilterChange = (status) => {
    setSelectedStatus(status);
    onStatusFilterChange(status);
  };

  return (
    <div className="filter-container">
      <div className='filter'>
        {['All', 'Watching', 'OnHold', 'PlanToWatch', 'Dropped', 'Completed'].map(status => (
          <button
            key={status}
            className={`filterBtn ${selectedStatus === status ? 'selected' : ''}`}
            onClick={() => handleStatusFilterChange(status)}
          >
          {status}
          </button>
        ))}
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
