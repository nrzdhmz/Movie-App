import React from 'react';
import UserList from './UserList';

const Overlay = ({ overlayType, userData, closeOverlay }) => (
  <div className="blackBg">
    <div className="overlay">
      <div className="follow-box-top">
        <p>{overlayType === "followers" ? "Followers" : "Following"}</p>
        <i className="fa-solid fa-xmark " onClick={closeOverlay}></i>
      </div>
      <div className="overlay-content">
        {overlayType === "followers" ? (
          <UserList 
            users={userData?.following?.map(f => f.followerUser) || []} 
            type="followers" 
            closeOverlay={closeOverlay} 
          />
        ) : (
          <UserList 
            users={userData?.followers?.map(f => f.followingUser) || []} 
            type="following" 
            closeOverlay={closeOverlay}
          />
        )}
      </div>
    </div>
  </div>
);

export default Overlay;
