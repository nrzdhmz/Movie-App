import React from 'react'
import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <div className="logo">
      <p><Link to="/HomePage">Codex<span>claim</span></Link></p>
    </div>
  )
}

export default Logo