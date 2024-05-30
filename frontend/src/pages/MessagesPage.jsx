import React from 'react'
import Logo from '../components/header/Logo'
import NavigationBar from '../components/header/NavigationBar'

const MessagesPage = () => {
  return (
    <div className="wrapper">
      <header className="container-top">
        <div className="search-container">
          <Logo />
          <NavigationBar />
        </div>
      </header>
      <div className="container">
      </div>
    </div>  )
}

export default MessagesPage