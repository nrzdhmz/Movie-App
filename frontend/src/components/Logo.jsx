import React from 'react'
import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <div className="logo">
      <p><Link to="/">Codex<span>claim</span></Link></p>
    </div>
  )
}

export default Logo