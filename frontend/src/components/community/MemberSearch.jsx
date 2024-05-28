import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (change) => {
    setSearchTerm(change.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get('http://localhost:5000/users', {
            params: {
              query: searchTerm
            },
            withCredentials: true
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error Data gelmir');
        }
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <input 
      className='form-control' 
      type="text" 
      placeholder='Search Members ...' 
      value={searchTerm} 
      onChange={handleInputChange} 
    />
  );
}

export default MemberSearch;
