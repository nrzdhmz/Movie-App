import React from 'react'
import { Link } from 'react-router-dom'

const LogInBox = () => {
  return (
    <div className="container justify">
      <div className="sign-in-container">
            <div className="sign-top">
              Log in
            </div>
            <div className="sign-inputs">
              <input placeholder='Username'  type='text' className="sign-email"/>
              <input placeholder='Password'  type='text' className="sign-password"/>
              <div className="logSign">
                <button><Link to='/LogIn'>Log in</Link></button>
                <Link
                  to="/">
                  Don't have an account?
                </Link>
                <Link
                  to="/HomePage">
                    HomePage
                </Link>
              </div>
            </div>
      </div>
  </div>
  )
}

export default LogInBox