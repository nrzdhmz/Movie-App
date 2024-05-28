import React from 'react';
import Logo from '../components/header/Logo';
import NavigationBar from '../components/header/NavigationBar';
import  WatchList  from '../components/watchlist/WatchList';

const WatchListPage = () => {

  return (
    <div className="wrapper">
      <div className="container-top">
        <div className="search-container">
          <Logo/>
          <NavigationBar/>
        </div>
      </div>
      <WatchList/>
    </div>
  );
}


export default WatchListPage;
