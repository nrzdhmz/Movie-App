import React from 'react';

const ProfileSummary = ({
  userData,
  isMainProfile,
  handleFollow,
  handleUnFollow,
  toggleOverlay
}) => (
  <div className="profile-summary">
    <div className="profile-summary-left">
      <div className="profile-pic-container">
        <img
          src={`http://localhost:5000${userData.profilePicture}`}
          alt="user profile pic"
        />
      </div>
      <div className="username">{userData.username}</div>
      {isMainProfile && (
        <button>
          EDIT PROFILE
          <i id="pen" className="fas fa-pen"></i>
        </button>
      )}
      {!isMainProfile && (
        userData.isFollowing ? (
          <button className='profile-btn' onClick={handleUnFollow}>Unfollow</button>
        ) : (
          <button className='profile-btn' onClick={handleFollow}>Follow</button>
        )
      )}
    </div>
    <div className="profile-summary-right">
      <div className="profile-stats">
        <span className="value">{userData.watchlist.movieItems.length}</span>
        <span className="definition">Films</span>
      </div>
      <div
        onClick={() => toggleOverlay("followers")}
        id="followers"
        className="profile-stats border-left"
      >
        <span className="value">{userData._count.following}</span>
        <span className="definition">Followers</span>
      </div>
      <div
        onClick={() => toggleOverlay("following")}
        id="following"
        className="profile-stats border-left"
      >
        <span className="value">{userData._count.followers}</span>
        <span className="definition">Following</span>
      </div>
    </div>
  </div>
);

export default ProfileSummary;
