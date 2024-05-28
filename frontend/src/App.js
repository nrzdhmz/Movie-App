import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/scss/main.scss';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import WatchListPage from './pages/WatchListPage';
import RegisterPage from './pages/RegisterPage';
import CommunityPage from './pages/CommunityPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegisterPage/>
  },
  {
    path: '/Home',
    element: <HomePage/>
  },
  {
    path: '/MyLists',
    element: <WatchListPage/>
  },
  {
    path: '/Community',
    element: <CommunityPage/>
  },
  {
    path: '/Login',
    element: <LogInPage/>
  },
  {
    path: '/Profile/:username',
    element: <ProfilePage/>
  }
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
