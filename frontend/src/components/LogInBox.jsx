import React from 'react'
import { Link } from 'react-router-dom'

const LogInBox = () => {
  return (
    <div className="container">
      <div className="sign-in-container">
        <div className="sign-in">
            <div className="sign-top">
              log in
            </div>
            <div className="sign-inputs">
              <input placeholder='email' required type='email' className="sign-email"/>
              <input placeholder='text' required type='text' className="sign-password"/>
            </div>
            <div className="logSign">
              <button><Link to='/LogIn'>Log In</Link></button>
              <button><Link to='/SignUp'>Sign Up</Link></button>
            </div>
        </div>
      </div>
  </div>
  )
}

export default LogInBox