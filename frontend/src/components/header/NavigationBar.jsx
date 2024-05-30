import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";

const NavigationBar = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  const hoverNav = ({ isActive }) => isActive ? 'activeLink' : undefined;

  return (
    <nav className='navBar'>
      <ul>
        <li>
          <NavLink to="/home" className={hoverNav}>
            <div className='icon'><i className="fa-solid fa-house"></i></div><p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages" className={hoverNav}>
            <div className='icon'><i className="fa-brands fa-facebook-messenger"></i></div><p>Messages</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" className={hoverNav}>
            <div className='icon'><i className="fa-regular fa-heart"></i></div><p>Notifications</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" className={hoverNav}>
            <div className='icon'><i className="fa-solid fa-users"></i></div><p>Community</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/mylists" className={hoverNav}>
            <div className='icon'><i className="fa-solid fa-list-check"></i></div><p>WatchList</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/Profile/${userData.id}`} className={hoverNav}>
            <div className='profileBtn'>
              <img
                src={`http://localhost:5000${userData.profilePicture}`}
                alt="user profile pic"
              />
            </div>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
