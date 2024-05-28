import React from 'react';
import Logo from '../header/Logo';
import NavigationBar from '../header/NavigationBar';
import MemberSearch from './MemberSearch';

const Community = () => {
  return (
    <div className="wrapper">
      <header className="container-top">
        <div className="search-container">
          <Logo />
          <div className="search-element">
            <MemberSearch/>
          </div>
          <NavigationBar />
        </div>
      </header>
      <div className="container">
      </div>
    </div>
  );
}

export default Community;
