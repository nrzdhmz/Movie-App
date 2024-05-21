import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.css';
import HomePage from './pages/HomePage';
import WatchList from './pages/WatchList';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/' ,
    element: <HomePage/>
  },  
  {
    path: '/WatchList' ,
    element: <WatchList/>
  },  
  {
    path: '/LogIn' ,
    element: <LogIn/>
  },  
  {
    path: '/SignUp' ,
    element: <SignUp/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
