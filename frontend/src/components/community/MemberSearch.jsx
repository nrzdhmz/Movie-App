import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleInputChange = (change) => {
    setSearchTerm(change.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get('http://localhost:5000/api/users', {
            params: {
              query: searchTerm
            },
            withCredentials: true
          });
          console.log(response.data);
          setUsers(response.data.users); 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      } else {
        setUsers([]); 
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      <input 
        className='form-control' 
        type="text" 
        placeholder='Search Members ...' 
        value={searchTerm} 
        onChange={handleInputChange} 
      />
      <div className="search-list">
        {users.map((user, index) => (
          <div key={index} className="search-list-item">
            <div className="user-info">
              <h3>{user.username}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberSearch;
