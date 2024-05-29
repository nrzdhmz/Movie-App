import React from 'react'
import { Link } from "react-router-dom"
import Profile from './Profile';

const NavigationBar = () => {
  return (
    <nav className='navBar'>
      <ul>
        <li><Link to="/home"><i className="fa-solid fa-house"></i>Home</Link></li>
        <li><Link to="/home"><i className="fa-brands fa-facebook-messenger"></i>Messages</Link></li>
        <li><Link to="/home"><i className="fa-regular fa-heart"></i>Notifications</Link></li>
        <li><Link to="/Community"><i className="fa-solid fa-users"></i>Community</Link></li>
        <li><Link to="/Mylists"><i className="fa-solid fa-list-check"></i>WatchList</Link></li>
        <li><Profile/></li>
      </ul>
    </nav>

  )
}

export default NavigationBar