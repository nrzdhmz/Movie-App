import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/main.css';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import ProfilePage from './pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchListPage from './pages/WatchListPage';
import Register from './pages/RegisterPage';


const router = createBrowserRouter([
  {
    path: '/' ,
    element: <Register/>
  },  
  {
    path: '/HomePage' ,
    element: <HomePage/>
  }, 
  {
    path: '/WatchListPage' ,
    element: <WatchListPage/>
  },  
  {
    path: '/LogIn' ,
    element: <LogIn/>
  },  
  {
    path: '/ProfilePage' ,
    element: <ProfilePage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
