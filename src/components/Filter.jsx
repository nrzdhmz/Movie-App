import React from 'react'

const Filter = () => {
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
      <select className="filterBy">
        <option value="Default">Default</option>
        <option value="Recently Added">Recently Added</option>
        <option value="Name A-Z">Name A-Z</option>
        <option value="Released Date">Released Date</option>
      </select>
    </div>
  )
}

export default Filter