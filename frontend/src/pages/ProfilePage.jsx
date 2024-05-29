import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Logo from "../components/header/Logo";
import NavigationBar from "../components/header/NavigationBar";
import ProfileSummary from "../components/profile/ProfileSummary";
import ProfileNav from "../components/profile/ProfileNav";
import WatchList from "../components/profile/WatchList";
import Overlay from "../components/profile/Overlay";

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

  useEffect(() => {
    fetchUserData();
  }, [userid]);

  const handleFollow = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/follow/following`,
        { followingId: Number(userid) },
        { withCredentials: true }
      );
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/follow/following/${userid}`,
        { withCredentials: true }
      );
      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const isMainProfile = localData == userid;

  return (
    <div className="wrapper">
      {showOverlay && (
        <Overlay
          overlayType={overlayType}
          userData={userData}
          closeOverlay={() => setShowOverlay(false)}
        />
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
            <ProfileSummary
              userData={userData}
              isMainProfile={isMainProfile}
              handleFollow={handleFollow}
              handleUnFollow={handleUnFollow}
              toggleOverlay={toggleOverlay}
            />
          ) : (
            <div>Loading...</div>
          )}
          <ProfileNav />
          {userData && userData.watchlist && (
            <WatchList watchlist={userData.watchlist} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
