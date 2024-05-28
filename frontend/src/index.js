import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/main.scss';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchListPage from './pages/WatchListPage';
import RegisterPage from './pages/RegisterPage';
import Community from './components/community/Community';


const router = createBrowserRouter([
  {
    path: '/' ,
    element: <RegisterPage/>
  },  
  {
    path: '/Home' ,
    element: <HomePage/>
  }, 
  {
    path: '/MyLists' ,
    element: <WatchListPage/>
  },
  {
    path: '/Community' ,
    element: <Community/>
  },  
  {
    path: '/Login' ,
    element: <LogInPage/>
  },  
  {
    path: '/Profile' ,
    element: <ProfilePage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);