import React, { useState } from 'react';
import '../CSS/Dashboard.css';
// import '../CSS/table.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


import BookingPage from './BookingPage';
import AdminList from '../Admin/AdminList';
import UserList from '../User/UserList';
import PaymentSuccessful from './PaymentSuccessful';
import WasherList from '../CarWasher/WasherList';
import SubscriptionList from '../User/SubscriptionList';
import UserPdf from '../User/UserPdf';
import PaymentPdf from '../User/PaymentPdf';
import UserPayments from '../User/UserPayments';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserManagement = () => {
    setUserManagementOpen(!userManagementOpen);
  };

  return (
    <>
            <div id="main">
              {/* <header>
                <label htmlFor="check">
                  <i className="fas fa-bars" id="sidebar_btn" onClick={toggleSidebar}></i>
                </label>
                <div className="left_area">
                  <h3>
                    <span>Cleen</span>
                  </h3>
                </div>
                
              </header> */}

              <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="profile_info">
                  <img
                    src="https://i.pinimg.com/474x/fc/83/a2/fc83a2f5d2da79875b9c00351638ac5e.jpg"
                    className="profile_image"
                    alt=""
                  />
                  <h4>Cristiano Ronaldo</h4>
                </div>
                <Link to="/AfterLogin/Dashboard/Profile" onClick={toggleUserManagement}>
                  <i lassName="fas fa-users"></i>
                  <span>Profile</span>
                  <i className={`fas fa-chevron-right dropdown-icon ${userManagementOpen ? 'open' : ''}`}></i>
                </Link>

                <Link to="/AfterLogin/Dashboard/BookingDetails">
                  <i className="fas fa-car"></i>
                  <span>Booking Details</span>
                </Link>
                
                <Link to="/AfterLogin/Dashboard/SubscriptionDetails">
                  <i className="fas fa-plus"></i>
                  <span>Subscription Details</span>
                </Link>
                <Link to="/AfterLogin/Dashboard/PaymentDetails">
                  <i className="fas fa-clipboard"></i>
                  <span>Payment Details</span>
                </Link>
                
              </div>
            </div>

        <Routes>
          <Route path="/Profile" element={<UserList />} />
          <Route path="/BookingDetails" element={<UserPdf />} />
          <Route path="/SubscriptionDetails" element={<SubscriptionList/>} />
          <Route path="/PaymentDetails" element={<PaymentPdf/>} />
         
        </Routes>
    </>
  );
};

export default Dashboard;
