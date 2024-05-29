import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../components/header/Logo";
import NavigationBar from "../components/header/NavigationBar";
import { useParams } from "react-router-dom";
import UserList from "../components/profile/UserList";

const ProfilePage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState("following");
  const [userData, setUserData] = useState(null);
  const { userid } = useParams();

  const [localData, setLocalData] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLocalData(parsedData.id);
    }
  }, []);


  const toggleOverlay = (type) => {
    setOverlayType(type);
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userid}`,
          { withCredentials: true }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data from backend", error);
      }
    };

    fetchUserData();
  }, [userid]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/follow/following`,
        { followingId: Number(userid) },
        { withCredentials: true }
      );
      console.log(response.data);
      console.log("Follow button clicked");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/follow/following/${userid}`,
        { withCredentials: true }
      );
      console.log(response.data);
      console.log("Unfollow button clicked");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      {showOverlay && (
        <div className="blackBg">
          <div className="overlay">
            <div className="follow-box-top">
              <p>{overlayType === "followers" ? "Followers" : "Following"}</p>
              <i className="fa-solid fa-xmark" onClick={() => setShowOverlay(false)}></i>
            </div>
            <div className="overlay-content">
              {overlayType === "followers" ? (
                <UserList 
                  users={userData?.following?.map(f => f.followerUser) || []} 
                  type="followers" 
                  closeOverlay={() => setShowOverlay(false)} 
                />
              ) : (
                <UserList 
                  users={userData?.followers?.map(f => f.followingUser) || []} 
                  type="following" 
                  closeOverlay={() => setShowOverlay(false)}
                />
              )}
            </div>
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
                {localData == userid && (
                  <button>
                    EDIT PROFILE
                    <i id="pen" className="fas fa-pen"></i>
                  </button>
                )}
                {userData.isFollowing ? (
                  <button onClick={handleUnFollow}>Unfollow</button>
                ) : (
                  <button onClick={handleFollow}>Follow</button>
                )}
              </div>
              <div className="profile-summary-right">
                <div className="profile-stats">
                  <span className="value">
                    {userData.watchlist.movieItems.length}
                  </span>
                  <span className="definition">Films</span>
                </div>
                <div
                  onClick={() => toggleOverlay("followers")}
                  id="followers"
                  className="profile-stats border-left">
                  <span className="value">{userData._count.following}</span>
                  <span className="definition">Followers</span>
                </div>
                <div
                  onClick={() => toggleOverlay("following")}
                  id="following"
                  className="profile-stats border-left">
                  <span className="value">{userData._count.followers}</span>
                  <span className="definition">Following</span>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div className="profile-nav">
            <button>Profile</button>
            <button>Watchlist</button>
            <button>Lists</button>
            <button>Likes</button>
          </div>
          {userData && userData.watchlist && (
            <div className="watch-list-container">
              {userData.watchlist.movieItems.map((item, index) => (
                <div key={index} className="watch-list-item">
                  <div className="movie-item-img">
                    <img src={item.movie.poster} alt={item.movie.title} />
                    <p className="imdb-img"><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</p>
                    <div className="movie-info">
                      <div className="info-text">
                        <div className="lighter movie-info-title">{item.movie.title}</div>
                      </div>
                      <div className="info-text"><i className="fa-solid fa-star"></i>{item.movie.imdbRating}</div>
                      <div className="info-text">{item.movie.plot}</div>
                      <div className="info-text"><div className="lighter">Language:</div>{item.movie.language}</div>
                      <div className="info-text"><div className="lighter">Aired:</div>{item.movie.released}</div>
                      <div className="info-text"><div className="lighter">Genres:</div>{item.movie.genre}</div>
                    </div>
                  </div>
                  <p>{item.movie.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
