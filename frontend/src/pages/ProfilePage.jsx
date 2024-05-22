import React from 'react'
import Logo from '../components/Logo'
import NavigationBar from '../components/NavigationBar'
import { Link } from 'react-router-dom'
import { dataLength } from '../components/WatchList';

const ProfilePage = () => {
  return (
    <div className="wrapper">
    <div className="container-top">
      <div className="search-container">
        <Logo/>
        <NavigationBar/>
      </div>
    </div>
    <div className="container">
      <div className="profile-section">
        <div className="profile-summary">
          <div className="profile-summary-left">
            <div className="profile-pic-container">
              <img src="https://www.gravatar.com/avatar/?d=mp&s=55" alt="user profile pic" />
            </div>
            <div className="username">username</div>
            <button>EDIT PROFILE
            <i id='pen' className="fas fa-pen"></i>
            </button>
          </div>
          <div className="profile-summary-right">
            <div className="profile-stats">
              <Link>
              <span className='value'>{dataLength}</span>
              <span className='definition'>Films</span>
              </Link>
            </div>
            <div className="profile-stats border-left">
              <Link>
              <span className='value'>0</span>
              <span className='definition'>Following</span> 
              </Link>
            </div>
            <div className="profile-stats border-left">
              <Link>
              <span className='value'>0</span>
              <span className='definition'>Followers</span>
              </Link>
            </div>
          </div>
        </div>
        <nav className='profile-nav'>
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
  )
}

export default ProfilePage