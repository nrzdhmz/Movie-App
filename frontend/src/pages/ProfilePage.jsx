import React, { useState } from "react";
import Logo from "../components/Logo";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="wrapper">
      {showOverlay && (
        <div className="blackBg">
          <div className="overlay">
            <div className="follow-box-top">
              <p>Following</p>
              <i className="fa-solid fa-xmark" onClick={toggleOverlay}></i>
            </div>
            <div className="overlay-content"></div>
          </div>
        </div>
      )}
      <header className="container-top">
        <div className="search-container">
          <Logo />
          <NavigationBar />
        </div>
      </header>
      <div className="container">
        <div className="profile-section">
          <div className="profile-summary">
            <div className="profile-summary-left">
              <div className="profile-pic-container">
                <img
                  src="https://www.gravatar.com/avatar/?d=mp&s=55"
                  alt="user profile pic"
                />
              </div>
              <div className="username">username</div>
              <button>
                EDIT PROFILE
                <i id="pen" className="fas fa-pen"></i>
              </button>
            </div>
            <div className="profile-summary-right">
              <div className="profile-stats">
                <Link onClick={toggleOverlay}>
                  <span className="value">0</span>
                  <span className="definition">Films</span>
                </Link>
              </div>
              <div id="following" className="profile-stats border-left">
                <Link onClick={toggleOverlay}>
                  <span className="value">0</span>
                  <span className="definition">Following</span>
                </Link>
              </div>
              <div id="followers" className="profile-stats border-left">
                <Link>
                  <span className="value">0</span>
                  <span className="definition">Followers</span>
                </Link>
              </div>
            </div>
          </div>
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
