import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  return (
    <Link to={`/Profile/${userData.id}`}>
      <div className='profileBtn'>
        <img
          src={`http://localhost:5000${userData.profilePicture}`}
          alt="user profile pic"
        />
        <p>Profile</p>
      </div>
    </Link>
  );
};  

export default Profile;
