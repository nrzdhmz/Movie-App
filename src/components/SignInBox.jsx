import React from 'react'
import { Link } from 'react-router-dom'

const SignInBox = () => {
  return (
    <div className="container">
      <div className="sign-in-container">
        <div className="sign-in">
            <div className="sign-top">
              sign up
            </div>
            <div className="sign-inputs">
              <input placeholder='name' required type='text' className="sign-name"/>
              <input placeholder='email' required type='email' className="sign-email"/>
              <input placeholder='text' required type='text' className="sign-password"/>
            </div>
            <div className="logSign">
              <button><Link to='/SignUp'>Sign Up</Link></button>
              <button><Link to='/LogIn'>Log In</Link></button>
            </div>
        </div>
      </div>
  </div>
  )
}

export default SignInBox