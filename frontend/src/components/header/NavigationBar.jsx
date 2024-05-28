import React from 'react'
import { Link } from "react-router-dom"
import Profile from '../profile/Profile';

const NavigationBar = () => {
  return (
    <nav className='navBar'>
      <ul>
        <li><Link to="/Community">Community</Link></li>
        <li><Link to="/Mylists">WatchList</Link></li>
        <Profile/>
      </ul>
    </nav>

  )
}

export default NavigationBar