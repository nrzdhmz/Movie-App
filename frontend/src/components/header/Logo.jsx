import React from 'react'
import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <div className="logo">
      <p><Link to="/Home">Your<span>List</span></Link></p>
    </div>
  )
}

export default Logo