import React from 'react'
import Logo from '../components/Logo'
import LogInBox from '../components/LogInBox'

const LogIn = () => {
  return (
    <div className="wrapper">
      <div className="container-top">
        <div className="search-container">
          <Logo/>
        </div>
      </div>
      <LogInBox/>
    </div>
  )
}

export default LogIn