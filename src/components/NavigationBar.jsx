import React from 'react'
import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <nav className='navBar'>
      <ul>
        <li><Link to="/LogIn">LOG IN</Link></li>
        <li><Link to="/SignUp">SIGN UP</Link></li>
        <li><Link to="/WatchList">WatchList</Link></li>
      </ul>
    </nav>

  )
}

export default NavigationBar