import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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

  const handleUserClick = (username) => {
    navigate(`/Profile/${username}`);
  };

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
          <div 
            key={index} 
            className="search-list-item" 
            onClick={() => handleUserClick(user.username)}
          >
            <div className="user-info">
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt="user profile picture"
              />
              <div className='usersearch'>{user.username}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberSearch;
