import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Main/Home';
import Login from './login/Login';
import Salesreport from './Main/Salesreport';
import Winning from './Main/Winning';
import More from './Admin/More';
import Netpay from './Main/Netpay';
import Pnl from './Main/Pnl';
import Countreport from './Main/Countreport';
import InUserManager from './Admin/InUserManager';
import CreateUser from './Admin/CreateUser';
import Usercommission from './Main/Usercommission';
import ResultEntry from './Admin/ResultEntry';
import Reporter from './Main/Reporter';

// Create the router with createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Login Page Route
  },
  {
    path: "/home",
    element: <Home />, // Home Page Route
  },
  {
    path: "/sales",
    element: <Salesreport />, // Sales Report Route
  },
  
  {
    path: "/winning",
    element: <Winning />, // Winner's Report Route
  },
  {
    path: "/more",
    element: <More />, // More Route
  },
  {
    path: "/reporter",
    element: <Reporter />, // More Route
  },
  {
    path: "/netpay",
    element: <Netpay />, // Net Pay Route
  },
  {
    path: "/pnl",
    element: <Pnl />, // PnL Route
  },
  {
    path: "/countreport",
    element: <Countreport />, // Count Report Route
  },

  {
    path: "/newuser",
    element: <InUserManager />, // Net Pay Route
  },

  
  {
    path: "/comssission",
    element: <Usercommission />, // Net Pay Route
  },
  {
    path: "/createuser",
    element: <CreateUser />, // Net Pay Route
  },
  {
    path: "/resulentry",
    element: <ResultEntry />, // Net Pay Route
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} /> // Using the router constant here
  );
};

export default App;
