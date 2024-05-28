import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../components/header/Logo';
import NavigationBar from '../components/header/NavigationBar';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        console.log(response.data);
        setUserData(response.data); 

      } catch (error) {
        console.error('Error backendden data gelmir');
      }
    };

    fetchUserData();
  }, [id]); 

  return (
    <div className="wrapper">
      <header className="container-top">
        <div className="search-container">
          <Logo />
          <NavigationBar />
        </div>
      </header>
      <div className="container">
        <div className="profile-section">
          {userData ? (
            <div className="profile-summary">
              <div className="profile-summary-left">
                <div className="profile-pic-container">
                  <img
                    src={`http://localhost:5000${userData.profilePicture}`}
                    alt="user profile pic"
                  />
                </div>
                <div className="username">{userData.username}</div>
                <button>
                  EDIT PROFILE
                  <i id="pen" className="fas fa-pen"></i>
                </button>
              </div>
              <div className="profile-summary-right">
                <div className="profile-stats">
                  <span className="value">0</span>
                  <span className="definition">Films</span>
                </div>
                <div id="following" className="profile-stats border-left">
                  <span className="value">0</span>
                  <span className="definition">Following</span>
                </div>
                <div id="followers" className="profile-stats border-left">
                  <span className="value">0</span>
                  <span className="definition">Followers</span>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <nav className="profile-nav">
            <ul>
              <li>Profile</li>
              <li>Watchlist</li>
              <li>Lists</li>
              <li>Likes</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
