import React from 'react';
import Logo from '../components/header/Logo';
import NavigationBar from '../components/header/NavigationBar';
import MemberSearch from '../components/community/MemberSearch';

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
