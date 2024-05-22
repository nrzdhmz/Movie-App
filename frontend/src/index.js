import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.css';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ProfilePage from './pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchListPage from './pages/WatchListPage';

const router = createBrowserRouter([
  {
    path: '/' ,
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
    path: '/SignUp' ,
    element: <SignUp/>
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
