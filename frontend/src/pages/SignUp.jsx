import React from 'react'
import Logo from '../components/Logo'
import SignInBox from '../components/SignInBox'

const SignUp = () => {
  return (
    <div className="wrapper">
    <div className="container-top">
      <div className="search-container">
        <Logo/>
      </div>
    </div>
    <SignInBox/>
  </div>
  )
}

export default SignUp