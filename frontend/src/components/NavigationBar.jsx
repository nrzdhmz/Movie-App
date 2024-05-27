import React from 'react'
import { Link } from "react-router-dom"
import Profile from '../components/Profile';

const NavigationBar = () => {
  return (
    <nav className='navBar'>
      <ul>
        <li><Link to="/Mylists">WatchList</Link></li>
        <Profile/>
      </ul>
    </nav>

  )
}

export default NavigationBar