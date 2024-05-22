import React from 'react';
import Logo from '../components/Logo';
import NavigationBar from '../components/NavigationBar';
import { WatchList } from '../components/WatchList';

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
